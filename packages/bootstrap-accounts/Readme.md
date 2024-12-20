# Bootstaping Accounts

## Summary

This tooling facilitates the generation and management of keypairs and access controllers essential for the application. It ensures secure handling of sensitive information and streamlines the setup process for deploying a full-stack decentralized application.


## Installation

Follow these steps to install Rust and build the project:

### Install Rust

1. **Download and Install Rust**:
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
    Follow the on-screen instructions to complete the installation.

2. **Verify Installation**:
    ```bash
    rustc --version
    ```

### Build the Project

1. **Navigate to the Project Directory**:
    ```bash
    cd fullstack-dapp-example/packages/bootstrap-accounts
    ```

2. **Run Cargo Build**:
    ```bash
    cargo build
    ```


## Features
This tooling provides the following features:

### Keypair Generation
- **Purpose**: Generates all necessary keypairs required for the application, including `owner`, `system`, `payer`, and `dapp-definition`. It also generates one key pair for confirmation role and one for recovery role.
- **Command**: Execute the following command to generate the keypairs.
- **Environment Variables**: Ensure that the `NETWORK_ID` environment variable is exported before running the command.

```bash
export NETWORK_ID=2
cargo run -- key-pairs
```

- **Output**: Creates a file named `secrets-account.json` containing the private and public keys of all accounts.
    - **Security**: Keep `secrets-account.json` very secure as it holds sensitive information.
- **Secret Storage**: To store the generated keys securely (e.g., using AWS Secrets Manager), use the appropriate command to create a copy of the `secrets-account.json` file.

#### Storing Secrets with AWS CLI

To store the contents of `secrets-account.json` in AWS Secrets Manager, execute the following command:

```bash
aws secretsmanager create-secret --name secrets-account --description "Secrets for Accounts" --secret-string file://secrets-account.json
```

### Access Controllers Generation
- **Purpose**: Creates access controllers for each of the `payer` keys listed in `secrets-account.json`.

- **Command**: Before executing the command, export the following environment variables. `SIGNER_PRIVATE_KEY` is for the fee payer account and should be in the format `ed25519:private_key_here`:  This payer account is not same as payer account generated in keypairs. Instead this account is one of yours that have xrds to pay fees for access controller creation

```bash
export NETWORK_ID=2
export SIGNER_PRIVATE_KEY=ed25519:private_key_here
```

Execute the following command sequentially after keypair generation, as it takes the `secrets-account.json` as it looks for that file

```bash
cargo run -- create-access-controllers -a <payer-account address>
```

**Output**: Generates an output file named `controller-accounts.json` containing the necessary access controller address and the corresponding account address controlled by the access controller.
All access controllers share the same confirmation role.


