use arguments::args;
use clap::Parser;
use radix_fullstack_bootstrap_accounts::gateway_api::committed_details::get_committed_details;
use serde::Serialize;
use transactions::access_controller::manifest_access_controller_creation;
use transactions::submit_trxn;
use utils::get_network_id;
mod arguments;
mod crypto;
mod transactions;
mod utils;
use crate::crypto::keypairs::AccountInfo;
use chrono::Local;
use crypto::keypairs::create_keypair;
use radix_transactions::manifest::decompile;
use serde_json::from_str;
use serde_json::to_string_pretty;
use std::fs;
use std::fs::read_to_string;
use std::fs::File;
use std::io::Write;

#[derive(Debug, Serialize)]
struct ResultStruct {
    recovery_account_public_key: String,
    confirmation_account_public_key: String,
    transaction_id: String,
    access_controller: String,
    access_controller_account: String,
    name: String
}

#[tokio::main]
async fn main() {
    let cli = args::Cli::parse();

    match &cli.command {
        args::Command::KeyPairs(_) => {
            let roles = [
                "recovery",
                "confirmation",
                "owner",
                "payer",
                "system",
                "dapp_definition",
            ];
            let mut accounts = Vec::new();
            for role in roles.iter() {
                let account = create_keypair(role).await.unwrap();
                accounts.push(account);
            }
            let json = to_string_pretty(&accounts).unwrap();
            let path = "secrets-accounts.json";
            if fs::metadata(path).is_ok() {
                let timestamp = Local::now().format("%Y%m%d%H%M").to_string();
                let new_path = format!("{}_{}", timestamp, path);
                fs::rename(path, new_path).unwrap();
            }

            let mut file = File::create(path).unwrap();
            file.write_all(json.as_bytes()).unwrap();
            // Your async code here
        }
        args::Command::CreateAccessControllers(command) => {
            let data = read_to_string("secrets-accounts.json").unwrap();
            let accounts: Vec<AccountInfo> = from_str(&data).unwrap();
            let recovery_account = accounts
                .iter()
                .find(|&account| account.name == "recovery")
                .expect("Recovery account not found");
            let confirmation_account = accounts
                .iter()
                .find(|&account| account.name == "confirmation")
                .expect("Confirmation account not found");

            let filtered_accounts: Vec<&AccountInfo> = accounts
                .iter()
                .filter(|&account| account.name != "recovery" && account.name != "confirmation")
                .collect();

            println!("Filtered Accounts: {:?}", filtered_accounts);

            let mut results = Vec::new();
            for account in filtered_accounts {
                let manifest = manifest_access_controller_creation(
                    recovery_account.public_key.clone(),
                    confirmation_account.public_key.clone(),
                    account.public_key.clone(),
                    command.account_address,
                );
                let manifest_str = decompile(
                    &manifest.to_owned().instructions,
                    &utils::network_definition(get_network_id()),
                );
                println!("----------------------------");
                println!("{}", manifest_str.unwrap());
                let transaction_id = submit_trxn::prepare_submit_gateway_txn(manifest)
                    .await
                    .unwrap();
                let response = get_committed_details(transaction_id.as_str())
                    .await
                    .unwrap();

                let access_controller: Vec<&str> = response
                    .transaction
                    .receipt
                    .state_updates
                    .new_global_entities
                    .iter()
                    .filter(|entity| {
                        entity.entity_type == "GlobalAccessController"
                            && entity.entity_address.starts_with("accesscontroller")
                    })
                    .map(|entity| entity.entity_address.as_str())
                    .collect();

                let affected_accounts: Vec<&str> = response
                    .transaction
                    .receipt
                    .state_updates
                    .new_global_entities
                    .iter()
                    .filter(|entity| {
                        entity.entity_type == "GlobalAccount"
                            && entity.entity_address.starts_with("account_")
                    })
                    .map(|entity| entity.entity_address.as_str())
                    .collect();

                let result_struct = ResultStruct {
                    recovery_account_public_key: recovery_account.public_key.clone(),
                    confirmation_account_public_key: confirmation_account.public_key.clone(),
                    transaction_id,
                    access_controller: access_controller[0].to_string(),
                    access_controller_account: affected_accounts[0].to_string(),
                    name: account.name.clone(),
                };
                results.push(result_struct);
            }
            let json = to_string_pretty(&results).unwrap();
            let path = "controller-accounts.json";
            if fs::metadata(path).is_ok() {
                let timestamp = Local::now().format("%Y%m%d%H%M").to_string();
                let new_path = format!("{}_{}", timestamp, path);
                fs::rename(path, new_path).unwrap();
            }

            let mut file = File::create(path).unwrap();
            file.write_all(json.as_bytes()).unwrap();
        }

        args::Command::TransactionAffectedEntities(command_args) => {
            let response = get_committed_details(&command_args.transaction_id)
                .await
                .unwrap();

            let access_controller: Vec<&str> = response
                .transaction
                .receipt
                .state_updates
                .new_global_entities
                .iter()
                .filter(|entity| {
                    entity.entity_type == "GlobalAccessController"
                        && entity.entity_address.starts_with("accesscontroller")
                })
                .map(|entity| entity.entity_address.as_str())
                .collect();

            let affected_accounts: Vec<&str> = response
                .transaction
                .receipt
                .state_updates
                .new_global_entities
                .iter()
                .filter(|entity| {
                    entity.entity_type == "GlobalAccount"
                        && entity.entity_address.starts_with("account_")
                })
                .map(|entity| entity.entity_address.as_str())
                .collect();

            println!("Affected Entities: {:?}", access_controller);
            println!("Affected Entities: {:?}", affected_accounts);
            // Handle the TransactionAffectedEntities command here
        }
    }
    // Your async code here
}
