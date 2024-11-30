use serde::{Deserialize, Serialize};

use babylon_gateway_client::{apis::configuration::Configuration, models::TransactionStatus};

use crate::utils::{self, get_network_id};

#[derive(Serialize, Deserialize, Debug)]
pub struct LedgerState {
    pub network: String,
    pub state_version: u64,
    pub proposer_round_timestamp: String,
    pub epoch: u64,
    pub round: u64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Receipt {
    pub status: TransactionStatus,
    pub state_updates: StateUpdates,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct StateUpdates {
    pub new_global_entities: Vec<GlobalEntity>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GlobalEntity {
    pub is_global: bool,
    pub entity_type: String,
    pub entity_address: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Transaction {
    pub transaction_status: String,
    pub state_version: u64,
    pub epoch: u64,
    pub round: u64,
    pub round_timestamp: String,
    pub payload_hash: String,
    pub intent_hash: String,
    pub fee_paid: String,
    pub affected_global_entities: Vec<String>,
    pub confirmed_at: String,
    pub receipt: Receipt,
    pub manifest_classes: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CommittedDetailsResponse {
    pub ledger_state: LedgerState,
    pub transaction: Transaction,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OptIns {
    pub affected_global_entities: bool,
    pub receipt_state_changes: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CommittedRequest {
    pub intent_hash: String,
    pub opt_ins: OptIns,
}

pub async fn get_committed_details(
    intent_hash: &str,
) -> Result<CommittedDetailsResponse, reqwest::Error> {
    Ok(reqwest::Client::new()
        .post(format!("{}/transaction/committed-details", utils::get_network_gateway_url(get_network_id())))
            .header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome")
            .json(&CommittedRequest {
                intent_hash: intent_hash.to_owned(),
                opt_ins: OptIns {
                    affected_global_entities: true,
                    receipt_state_changes :true
                },
            }).
            send().await.unwrap().json::<CommittedDetailsResponse>().await?)
}
