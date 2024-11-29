use std::env;

use scrypto::prelude::*;

pub fn network_definition(network_id: u8) -> NetworkDefinition {
    match network_id {
        // Public facing networks
        0x01 => NetworkDefinition::mainnet(),
        0x02 => NetworkDefinition {
            id: network_id,
            logical_name: "stokenet".to_string().into(),
            hrp_suffix: "tdx_2_".to_string().into(),
        },

        // Babylon Temporary Testnets
        0x0A => NetworkDefinition::adapanet(),
        0x0B => NetworkDefinition::nebunet(),
        0x0C => NetworkDefinition {
            id: network_id,
            logical_name: "kisharnet".to_string().into(),
            hrp_suffix: "tdx_c_".to_string().into(),
        },
        0x0D => NetworkDefinition {
            id: network_id,
            logical_name: "ansharnet".to_string().into(),
            hrp_suffix: "tdx_d_".to_string().into(),
        },

        // RDX Works Development
        0x20 => NetworkDefinition {
            id: 0x20,
            logical_name: "gilganet".to_string().into(),
            hrp_suffix: "tdx_20_".to_string().into(),
        },
        0x21 => NetworkDefinition {
            id: 0x21,
            logical_name: "enkinet".to_string().into(),
            hrp_suffix: "tdx_21_".to_string().into(),
        },
        0x22 => NetworkDefinition {
            id: 0x22,
            logical_name: "hammunet".to_string().into(),
            hrp_suffix: "tdx_22_".to_string().into(),
        },
        0x23 => NetworkDefinition {
            id: 0x23,
            logical_name: "nergalnet".to_string().into(),
            hrp_suffix: "tdx_23_".to_string().into(),
        },
        0x24 => NetworkDefinition {
            id: 0x24,
            logical_name: "mardunet".to_string().into(),
            hrp_suffix: "tdx_24_".to_string().into(),
        },
        0x25 => NetworkDefinition {
            id: 0x25,
            logical_name: "dumunet".to_string().into(),
            hrp_suffix: "tdx_25_".to_string().into(),
        },

        // Ephemeral Networks
        0xF0 => NetworkDefinition {
            id: 240,
            logical_name: "localnet".to_string().into(),
            hrp_suffix: "loc".to_string().into(),
        },
        0xF1 => NetworkDefinition {
            id: 241,
            logical_name: "inttestnet".to_string().into(),
            hrp_suffix: "test".to_string().into(),
        },
        0xF2 => NetworkDefinition::simulator(),

        // Unnamed
        network_id => NetworkDefinition {
            id: network_id,
            logical_name: "unnamed".to_string().into(),
            hrp_suffix: format!("tdx_{:x}_", network_id).into(),
        },
    }
}

pub fn get_network_gateway_url(network_id: u8) -> String {
    let url = match network_id {
        0x01 => "https://mainnet.radixdlt.com",
        0x02 => "https://stokenet.radixdlt.com",
        _ => panic!("Network not supported"),
    };
    url.to_owned()
}

pub fn get_network_id() -> u8 {
    match env::var("NETWORK_ID")
        .as_deref()
        .unwrap_or("0x02")
        .to_owned()
        .parse::<u8>()
    {
        Ok(n) => n,
        Err(_) => panic!("Env NETWORK_ID isn't parsable to u8"),
    }
}
