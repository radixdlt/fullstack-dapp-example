use babylon_gateway_client::models::public_key;
use bip39::{Language, Mnemonic, Seed};
use ed25519_dalek::{PublicKey, SecretKey, Keypair};
use hex::encode;
use rand::RngCore;

fn secure_random(byte_count: usize) -> String {
    let mut rng = rand::thread_rng();
    let mut bytes = vec![0u8; byte_count];
    rng.fill_bytes(&mut bytes);
    encode(bytes)
}

fn mnemonic_to_keypair(mnemonic: &str, derivation_path: &str) -> (String, String) {
    let seed = Seed::new(
        &Mnemonic::from_phrase(mnemonic, Language::English).unwrap(),
        "",
    );
    let seed_bytes = seed.as_bytes();
    let secret_key = SecretKey::from_bytes(&seed_bytes[0..32]).unwrap();
    let public_key = PublicKey::from(&secret_key);
    let private_key_hex = encode(secret_key.to_bytes());
    let public_key_hex = encode(public_key.to_bytes());
    (private_key_hex, public_key_hex)
}

pub async fn create_keypair(name: &str) -> Result<(), Box<dyn std::error::Error>> {
    let mnemonic = Mnemonic::new(bip39::MnemonicType::Words24,Language::English)
        .phrase()
        .to_string();

    println!("Mnemonic={}", mnemonic);
    const KEY_TYPE_TRANSACTION_SIGNING: u32 = 1460;
    const ENTITY_TYPE_ACCOUNT: u32 = 525;
    const KEY_TYPE: &str = r#"
    {
        "TRANSACTION_SIGNING": 1460,
        "AUTHENTICATION_SIGNING": 1678,
        "MESSAGE_ENCRYPTION": 1391
    }
    "#;

    let key_type_json: serde_json::Value = serde_json::from_str(KEY_TYPE).unwrap();
    let transaction_signing_value = key_type_json["TRANSACTION_SIGNING"].as_u64().unwrap();

    let network_id: u32 = std::env::var("NETWORK_ID")
        .unwrap_or_else(|_| "1".to_string())
        .parse()
        .unwrap_or(1);

    println!("NetworkId={}", network_id);
    let derivation_path =
        format!("m/44'/1022'/{network_id}'/{ENTITY_TYPE_ACCOUNT}'/{transaction_signing_value}'/0'");
    println!("DerivationPath={}", derivation_path);

    let (private_key, public_key) = mnemonic_to_keypair(&mnemonic, &derivation_path);

    // // Assuming RadixEngineToolkit::Derive::virtual_account_address_from_public_key is implemented
    // let address = RadixEngineToolkit::Derive::virtual_account_address_from_public_key(
    //     &public_key,
    //     network_id,
    // )
    // .await?;

    // println!("Account Address: {}", address);
    println!("Private Key Hex: {}", private_key);
    println!("Public Key Hex: {}", public_key);
    println!("Mnemonic: {}", mnemonic);
    println!("Name: {}", name);

    Ok(())
}
