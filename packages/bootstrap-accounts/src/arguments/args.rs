use clap::{command, ArgAction, ValueEnum};
use clap::{Args, Parser, Subcommand};
use scrypto::types::ComponentAddress;

use crate::transactions::access_controller::check_component;

#[derive(Debug, Parser)]
#[clap(author, version, about)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Command,

    #[arg(long, short = 'b', default_value_t = false)]
    pub submit: bool,
}

#[derive(Debug, Args)]
pub struct CreateAccessControllerCommand {
    /// Account that is paying fees for creation of access controller
    #[arg(short , long, required=true, value_parser = check_component)]
    pub account_address: ComponentAddress,
}

#[derive(Debug, Args)]
pub struct KeyPairsCommand {
    // Define the fields for KeyPairsCommand here
}

#[derive(Debug, Args)]
pub struct TransactionAffectedEntitiesCommand {
    #[arg(short, long, required = true)]
    pub transaction_id: String,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    KeyPairs(KeyPairsCommand),

    CreateAccessControllers(CreateAccessControllerCommand),

    TransactionAffectedEntities(TransactionAffectedEntitiesCommand),
}
