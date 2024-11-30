use serde::{Deserialize, Serialize};
use wallet_compatible_derivation::prelude::*;
use bip39::{Language, Mnemonic, Seed};
use ed25519_dalek::{PublicKey, SecretKey, Keypair};
use hex::encode;
use rand::RngCore;

fn mnemonic_to_account(mnemonic: &str) -> Account {

    let path = AccountPath::new(
        &NetworkID::Stokenet, // Mainnet or Stokenet (testnet)
        0 // Account Index, 0 is first.
    );
    let account = Account::derive(
        &mnemonic.parse().unwrap(),
        "radix",
        &path,
    );
    account
}

#[derive(Serialize, Deserialize,Debug)]
pub struct AccountInfo {
    pub address: String,
    pub private_key: String,
    pub public_key: String,
    pub mnemonic: String,
    pub name: String
}



pub async fn create_keypair(name: &str) -> Result<AccountInfo, Box<dyn std::error::Error>> {
    let mnemonic = Mnemonic::new(bip39::MnemonicType::Words24,Language::English)
        .phrase()
        .to_string();

    println!("Mnemonic={}", mnemonic);


    let network_id: u32 = std::env::var("NETWORK_ID")
        .unwrap_or_else(|_| "1".to_string())
        .parse()
        .unwrap_or(1);

    println!("NetworkId={}", network_id);

    let account = mnemonic_to_account(&mnemonic);

    println!("Account Address: {}", account.address.to_string());
    println!("Private Key Hex: {}", account.private_key.to_hex());
    println!("Public Key Hex: {}", account.public_key.to_hex());
    println!("Mnemonic: {}", mnemonic);
    println!("Name: {}", name);

    let account_info = AccountInfo {
        address: account.address.to_string(),
        private_key: account.private_key.to_hex(),
        public_key: account.public_key.to_hex(),
        mnemonic: mnemonic,
        name: name.to_string()
    };
    
    return Ok(account_info);
}
