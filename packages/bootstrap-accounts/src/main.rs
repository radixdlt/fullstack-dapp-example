use arguments::args;
use clap::Parser;
mod arguments;
mod utils;
mod crypto;
use crypto::keypairs::create_keypair;
use utils::get_network_id;

#[tokio::main]
async fn main() {

    let cli = args::Cli::parse();    
    let network_definition = utils::network_definition(get_network_id());

    match &cli.command {
        args::Command::KeyPairs(_) => {
            create_keypair("my_account").await.unwrap();
            // Your async code here
        }
        args::Command::CreateAccessControllers(_) => {
            // Your async code here
        }
    }
    // Your async code here
}
