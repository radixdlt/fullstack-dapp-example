use std::{thread, time};

use babylon_gateway_client::{
    apis::{
        configuration::Configuration,
        transaction_api::{
            self, TransactionStatusParams, TransactionSubmitParams,
        },
    },
    models::{
        TransactionStatus, TransactionStatusRequest, TransactionSubmitRequest,
    },
};

use crate::utils::{self, get_network_id};

pub async fn submit_gateway_txn(
    bech32m_intent_hash: &str,
    notarized_txn_hex: &str,
) -> Result<String, String>  {
    let gateway_config = Configuration {
        base_path: utils::get_network_gateway_url(get_network_id()),
        ..Default::default()
    };
    let txn_submit_params = TransactionSubmitParams {
        transaction_submit_request: TransactionSubmitRequest {
            notarized_transaction_hex: notarized_txn_hex.to_owned(),
        },
    };
    transaction_api::transaction_submit(&gateway_config, txn_submit_params)
        .await
        .unwrap();

    let mut response = transaction_api::transaction_status(
        &gateway_config,
        TransactionStatusParams {
            transaction_status_request: TransactionStatusRequest {
                intent_hash: bech32m_intent_hash.to_owned(),
            },
        },
    )
    .await
    .unwrap();

    let mut n = 1;

    while response.status == TransactionStatus::Pending && n < 30 {
        response = transaction_api::transaction_status(
            &gateway_config,
            TransactionStatusParams {
                transaction_status_request: TransactionStatusRequest {
                    intent_hash: bech32m_intent_hash.to_owned(),
                },
            },
        )
        .await
        .unwrap();
        thread::sleep(time::Duration::from_secs(1));
        n += 1;
    }

    if response.status != TransactionStatus::CommittedSuccess {
        return Err(format!("Transaction Submission failed {}", bech32m_intent_hash))
    } else {
        return Ok(format!("Transaction Successful {}", bech32m_intent_hash))
    }

}
