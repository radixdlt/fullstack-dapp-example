use std::{thread, time};

use serde::{Deserialize, Serialize};

use crate::utils::{self, get_network_id};

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]

pub struct TransactionSubmitRequest {
    /// Hex-encoded notarized transaction payload which can be submitted.
    #[serde(rename = "notarized_transaction_hex")]
    pub notarized_transaction_hex: String,
}

impl TransactionSubmitRequest {
    pub fn new(notarized_transaction_hex: String) -> TransactionSubmitRequest {
        TransactionSubmitRequest {
            notarized_transaction_hex,
        }
    }
}
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct KnownPayload {
    #[serde(rename = "payload_hash")]
    pub payload_hash: String,
    #[serde(rename = "status")]
    pub status: TransactionStatus,
    #[serde(rename = "payload_status")]
    pub payload_status: String,
    #[serde(rename = "payload_status_description", skip_serializing_if = "Option::is_none")]
    pub payload_status_description: Option<String>,
    #[serde(rename = "error_message", skip_serializing_if = "Option::is_none")]
    pub error_message: Option<Option<String>>,
    #[serde(rename = "latest_error_message", skip_serializing_if = "Option::is_none")]
    pub latest_error_message: Option<Option<String>>,
    #[serde(rename = "handling_status", skip_serializing_if = "Option::is_none")]
    pub handling_status: Option<String>,
    #[serde(rename = "handling_status_reason", skip_serializing_if = "Option::is_none")]
    pub handling_status_reason: Option<Option<String>>,
    #[serde(rename = "submission_error", skip_serializing_if = "Option::is_none")]
    pub submission_error: Option<Option<String>>,
}

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub enum TransactionStatus {
    #[serde(rename = "Unknown")]
    Unknown,
    #[serde(rename = "CommittedSuccess")]
    CommittedSuccess,
    #[serde(rename = "CommittedFailure")]
    CommittedFailure,
    #[serde(rename = "Pending")]
    Pending,
    #[serde(rename = "Rejected")]
    Rejected,
}
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct TransactionStatusResponse {
    #[serde(rename = "status")]
    pub status: TransactionStatus,
    #[serde(rename = "intent_status")]
    pub intent_status: String,
    #[serde(rename = "ledger_state")]
    pub ledger_state: LedgerState,
    #[serde(rename = "intent_status_description")]
    pub intent_status_description: String,
    #[serde(rename = "known_payloads")]
    pub known_payloads: Vec<KnownPayload>,
    #[serde(
        rename = "committed_state_version",
        default,
        skip_serializing_if = "Option::is_none"
    )]
    pub committed_state_version: Option<Option<i64>>,
    #[serde(
        rename = "permanently_rejects_at_epoch",
        default,
        skip_serializing_if = "Option::is_none"
    )]
    pub permanently_rejects_at_epoch: Option<i64>,
}

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct LedgerState {
    #[serde(rename = "network")]
    pub network: String,
    #[serde(rename = "state_version")]
    pub state_version: i64,
    #[serde(rename = "proposer_round_timestamp")]
    pub proposer_round_timestamp: String,
    #[serde(rename = "epoch")]
    pub epoch: i64,
    #[serde(rename = "round")]
    pub round: i64,
}

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct TransactionSubmitResponse {
    /// Is true if the transaction is a duplicate of an existing pending transaction.
    #[serde(rename = "duplicate")]
    pub duplicate: bool,
}

impl TransactionSubmitResponse {
    pub fn new(duplicate: bool) -> TransactionSubmitResponse {
        TransactionSubmitResponse { duplicate }
    }
}

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct TransactionStatusRequest {
    #[serde(rename = "intent_hash")]
    pub intent_hash: String,
}

impl TransactionStatusRequest {
    pub fn new(intent_hash: String) -> TransactionStatusRequest {
        TransactionStatusRequest { intent_hash }
    }
}

pub async fn submit(intent_hash: &str) -> Result<TransactionSubmitResponse, reqwest::Error> {
    let response = reqwest::Client::new()
        .post(format!("{}/transaction/submit", utils::get_network_gateway_url(get_network_id())))
            .header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome")
            .json(&TransactionSubmitRequest{
                notarized_transaction_hex: intent_hash.to_owned(),
            }).
            send().await.unwrap();
    Ok(response.json::<TransactionSubmitResponse>().await?)
}

pub async fn status(intent_hash: &str) -> Result<TransactionStatusResponse, reqwest::Error> {
    let request = reqwest::Client::new()
        .post(format!("{}/transaction/status", utils::get_network_gateway_url(get_network_id())))
            .header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome")
            .json(&TransactionStatusRequest{
                intent_hash: intent_hash.to_owned(),
            });
    let response = request.send().await.unwrap();

    let parsed_response = response.json::<TransactionStatusResponse>().await?;
    Ok(parsed_response)
    // Ok(result)
}

pub async fn submit_gateway_txn(
    bech32m_intent_hash: &str,
    notarized_txn_hex: &str,
) -> Result<String, String> {
    let _transaction_submission_response = submit(notarized_txn_hex).await.unwrap();

    let mut trxn_status = status(bech32m_intent_hash).await.unwrap();

    let mut n = 1;

    while trxn_status.status == TransactionStatus::Pending && n < 30 {
        trxn_status = status(bech32m_intent_hash).await.unwrap();
        thread::sleep(time::Duration::from_secs(1));
        n += 1;
    }

    if trxn_status.status != TransactionStatus::CommittedSuccess {
        return Err(format!(
            "Transaction Submission failed {}",
            bech32m_intent_hash
        ));
    } else {
        return Ok(format!("Transaction Successful {}", bech32m_intent_hash));
    }
}
