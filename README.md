<h1 style="text-align: center;">Fullstack dApp Example</h1>

## Description
This repository contains source code for a stripped down version of [RadQuest](https://radquest.io), an interactive onboarding platform for the Radix DeFi ecosystem. This codebase serves as a comprehensive example of building a full-stack decentralized application on Radix, featuring:
- Multiple Scrypto components for on-chain functionality
- A Svelte-based frontend application
- Backend services for transaction monitoring and notifications
- Database integration and worker processes
- Docker-based development environment
Whether you’re studying the implementation, or learning how to build on Radix, this repository demonstrates real-world patterns and practices for dApp development.

The architecture consists of several key components:
1. **Frontend**
   - Svelte-based dApp interface
   - Connects to backend API and Radix network
2. **Backend Services**
   - Public API for frontend interactions
   - Transaction Stream service for monitoring blockchain events
   - Notification service for user alerts
   - Worker processes for async task processing
3. **Storage**
   - PostgreSQL database for application data
   - Redis for message queuing
4. **Radix Components**
   - Multiple Scrypto packages for different functionalities
   - Image Oracle for verifying NFT images
   - Various forge components for badge and item creation
Each application is containerized using Docker for consistent development and deployment environments.

```mermaid
graph TB
    subgraph "Frontend"
        dapp[dApp - Sveltekit Application]
    end

    subgraph "Backend Services"
        api[Public API]
        ts[Transaction Stream Service]
        notif[Notification Service]
        workers[Worker Processes]
    end

    subgraph "Database"
        db[(PostgreSQL)]
    end

    subgraph "Scrypto Components"
        hero[Hero Badge Forge]
        quest[Quest Rewards]
        card[Card Forge]
        gift[Gift Box Opener]
        rad[RadGem Forge]
        oracle[Image Oracle]
    end

    subgraph "Message Queue"
        queue[(Redis Queue)]
    end

    %% Frontend connections
    dapp --> api
    dapp --> Radix_Ledger

    %% Backend service connections
    ts --> queue
    ts --> db
    api --> db
    api --> queue
    workers --> queue
    workers --> db
    workers --> Radix_Ledger
    notif --> dapp
    workers --> notif

    %% Radix connections
    Radix_Ledger --> hero
    Radix_Ledger --> quest
    Radix_Ledger --> card
    Radix_Ledger --> gift
    Radix_Ledger --> rad
    Radix_Ledger --> oracle

    %% Transaction monitoring
    ts --> Radix_Ledger
```

## Development

### Pre-requisites

- node >=18
- npm@9.6.7
- [docker client](https://www.docker.com/get-started/)

```bash
# Install dependencies in project root folder
npm install
```

### Build scrypto packages

```bash
 ./setup.sh
```

Above script iterates over all scrypto packages inside this repository and build them


- Follow the steps in [packages/bootstrap-accounts/Readme.md](packages/bootstrap-accounts/Readme.md)

  You should have generated a `secrets-accounts.json` and a `controller-accounts.json` file.

- Copy the `access_controller_account` addresses of `owner`, `dAppDefinition`, `payer` and `system` from the resulting `controller-accounts.json` into the `packages/common/src/constants.ts` file, to the `address` fields.

- Then, copy the `access_controller` values from `controller-accounts.json` and put them in the respective `accessController` fields in `packages/common/src/constants.ts`.

- Then copy the mnemonics from the `secrets-accounts.json` file into the `.env` file.

### Add testnet XRD to Payer account

```bash
npm run wallet:faucet
```

### Create all resources on-ledger

```bash
npm run wallet:create:resources
```

#### Replace the following resources in the `constants.ts` file
```json
badges: {
  adminBadgeAddress: 'resource_tdx_2_1t...,
  superAdminBadgeAddress: 'resource_tdx_2_1t...,
  heroBadgeAddress: 'resource_tdx_2_1n...,
},
resources: {
  elementAddress: 'resource_tdx_2_1t...,
  clamAddress: 'resource_tdx_2_1t...,
  radgemAddress: 'resource_tdx_2_1n...,
  morphEnergyCardAddress:
    'resource_tdx_2_1n...,
  radmorphAddress: 'resource_tdx_2_1n...,
  ottercoinAddress:
    'resource_tdx_2_1t...,
  giftBox: {
    Starter: 'resource_tdx_2_1t...,
    Simple: 'resource_tdx_2_1t...,
    Fancy: 'resource_tdx_2_1t...,
    Elite: 'resource_tdx_2_1...'
  }
}
```

### Deploy packages and instantiate components from blueprints

```bash
npm run wallet:deploy-new:all
```

#### Replace the following items in the `constants.ts` file
```json
{
  radquestPackage: 'package_tdx_2_1...',
  heroBadgeForgeV2Package: 'package_tdx_2_1...',
  questRewardsV2Package: 'package_tdx_2_1...',
  cardForgeV2Package: 'package_tdx_2_1...',
  giftBoxOpenerV2Package: 'package_tdx_2_1...',
  radgemForgeV2Package: 'package_tdx_2_1...',
  components: {
    radgemForgeAddress: 'component_tdx_2_1...,
    radmorphForgeAddress: 'component_tdx_2_1...,
    imageOracleAddress: 'component_tdx_2_1...,
    refineryAddress: 'component_tdx_2_1...,
    heroBadgeForgeV2: 'component_tdx_2_1...,
    questRewardsV2: 'component_tdx_2_1...,
    cardForgeV2: 'component_tdx_2_1...,
    giftBoxOpenerV2: 'component_tdx_2_1...,
    radgemForgeV2: 'component_tdx_2_1...'
  }
}

```

### Set dApp definition metadata
```bash
npm run wallet:set:dapp-data
```

### Run the full-stack

```bash
# starts all services (Redis, Postgres, etc.)
docker compose up -d
```

```bash
# creates the required tables and schemas in database
# only needed if there are changes in the schema or in a newly cloned repo
npm run db:push
```

```bash
# builds commonjs version of database client
npm run db:build
```

```bash
# Populate image oracle
npm run db:seed &&\
npm run wallet:populate:oracle
```

```bash
# runs all applications in development mode
npm run dev
```

## User authentication

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant Wallet

    User->>Frontend: Initiate Login
    Frontend->>Backend: Request Auth Challenge
    Backend->>Backend: Generate Challenge
    Backend-->>Frontend: Return Challenge
    Frontend->>Wallet: Request Challenge Signing
    Wallet->>User: Prompt for Approval
    User->>Wallet: Approve Signing
    Wallet-->>Frontend: Return Signed Challenge
    Frontend->>Backend: Submit Signed Challenge
    Backend->>Backend: Verify Signature
    Backend->>Backend: Generate Session Token
    Backend-->>Frontend: Return Session Token
    Frontend->>Frontend: Store Session Token
    Frontend-->>User: Show Logged In State
```
