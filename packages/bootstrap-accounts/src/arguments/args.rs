use clap::{command, ArgAction, ValueEnum};
use clap::{Args, Parser, Subcommand};

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
    // Define the fields for CreateAccessControllerCommand here
}

#[derive(Debug, Args)]
pub struct KeyPairsCommand {
    // Define the fields for KeyPairsCommand here
}

#[derive(Debug, Subcommand)]
pub enum Command {
    
    KeyPairs(KeyPairsCommand),

    CreateAccessControllers(CreateAccessControllerCommand),
}