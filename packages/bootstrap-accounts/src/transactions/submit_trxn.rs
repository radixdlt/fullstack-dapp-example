use crate::{
    crypto::key_parser,
    utils::{get_network_id, network_definition},
};
use radix_fullstack_bootstrap_accounts::gateway_api;
use radix_transactions::prelude::*;
use scrypto::prelude::*;

pub async fn prepare_submit_gateway_txn(
    manifest: TransactionManifestV1,
) -> Result<String, Box<dyn std::error::Error>> {
    let network_definition = network_definition(get_network_id());
    let get_epoch = gateway_api::status::get_epoch().await?;
    let notarized_txn = {
        println!("Private key signing block");
        let private_key_string = std::env::var("SIGNER_PRIVATE_KEY")
            .expect("SIGNER_PRIVATE_KEY env variable is missing");
        let second_key = std::env::var("SECOND_SIGNER_PRIVATE_KEY").unwrap_or("UNKNOWN".to_owned());
        let third_key = std::env::var("THIRD_SIGNER_PRIVATE_KEY").unwrap_or("UNKNOWN".to_owned());

        let mut private_keys = Vec::new();
        private_keys.push(key_parser::parse_private_key(&private_key_string).unwrap());
        // Conditionally parse and push the second key
        if second_key != "UNKNOWN" {
            private_keys.push(key_parser::parse_private_key(&second_key).unwrap());
        }
        // Conditionally parse and push the third key
        if third_key != "UNKNOWN" {
            private_keys.push(key_parser::parse_private_key(&third_key).unwrap());
        }

        get_signed_notarized_transaction(manifest, get_epoch, private_keys)
    };

    let compiled_notarized_transaction = notarized_txn.to_payload_bytes().unwrap();
    let compiled_notarized_transaction_hex = hex::encode(compiled_notarized_transaction);

    let transaction_hash_encoder = TransactionHashBech32Encoder::new(&network_definition);
    let intent_hash = notarized_txn.signed_intent.prepare().unwrap().intent_hash();
    let bech32m_intent_hash = transaction_hash_encoder.encode(&intent_hash).unwrap();

    println!("About to submit transaction {}", bech32m_intent_hash);

    let result = gateway_api::transaction::submit_gateway_txn(
        &bech32m_intent_hash,
        &compiled_notarized_transaction_hex,
    )
    .await;

    match result {
        Ok(_) => {
            println!("Transaction submitted successfully");
            Ok(bech32m_intent_hash)
        }
        Err(e) => {
            println!("Transaction submission failed: {:?}", e);
            Err(e.into())
        }
    }
}

fn get_signed_notarized_transaction(
    manifest: TransactionManifestV1,
    current_epoch: u64,
    pk: Vec<PrivateKey>,
) -> NotarizedTransactionV1 {
    // let pk = Secp256k1PrivateKey::from_u64(1).unwrap();
    let notary_key = pk.iter().nth(0);
    let header = get_header(current_epoch, notary_key.unwrap().public_key());
    let mut transaction = TransactionBuilder::new().manifest(manifest).header(header);

    for key in pk.iter() {
        transaction = transaction.sign(key);
    }

    transaction.notarize(notary_key.unwrap()).build()
}

fn get_header(
    current_epoch: u64,
    notary_public_key: scrypto::prelude::PublicKey,
) -> TransactionHeaderV1 {
    TransactionHeaderV1 {
        network_id: get_network_id(),
        start_epoch_inclusive: Epoch::of(current_epoch),
        end_epoch_exclusive: Epoch::of(current_epoch + 10),
        nonce: 10,
        notary_is_signatory: false,
        notary_public_key,
        tip_percentage: 0,
    }
}
