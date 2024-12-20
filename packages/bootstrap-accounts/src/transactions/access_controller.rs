use crate::utils::{get_network_id, network_definition};
use radix_transactions::model::TransactionManifestV1;
use radix_transactions::prelude::ManifestBuilder;
use scrypto::blueprints::account::{AccountCreateInput, ACCOUNT_BLUEPRINT, ACCOUNT_CREATE_IDENT};
use scrypto::prelude::*;

pub fn manifest_access_controller_creation(
    recovery_role_public_key: String,
    confirmation_role_public_key: String,
    primary_role_public_key: String,
    fee_payer_account: ComponentAddress,
) -> TransactionManifestV1 {
    
    let primary_role_accessrule =
        check_ed25519_public_key_or_badge_resource(&primary_role_public_key).unwrap();
    let recovery_role_accessrule =
        check_ed25519_public_key_or_badge_resource(&recovery_role_public_key).unwrap();
    let confirmation_role_accessrule =
        check_ed25519_public_key_or_badge_resource(&confirmation_role_public_key).unwrap();

    let mut manifest = ManifestBuilder::new();

    manifest = fee_from_faucet(manifest, fee_payer_account, Decimal::from(10));

    manifest = manifest
        .call_function(
            ACCOUNT_PACKAGE,
            ACCOUNT_BLUEPRINT,
            ACCOUNT_CREATE_IDENT,
            AccountCreateInput {},
        )
        .take_all_from_worktop(ACCOUNT_OWNER_BADGE, "bucket_with_badge")
        .create_access_controller(
            "bucket_with_badge",
            primary_role_accessrule,
            recovery_role_accessrule,
            confirmation_role_accessrule,
            None,
        )
        .try_deposit_entire_worktop_or_refund(fee_payer_account, None);
    manifest.build()
}

fn check_ed25519_public_key_or_badge_resource(key_or_resource: &str) -> Result<AccessRule, String> {
    let network_definition = network_definition(get_network_id());
    let address_bech32_decoder: AddressBech32Decoder =
        AddressBech32Decoder::new(&network_definition);

    match Ed25519PublicKey::from_str(key_or_resource) {
        Ok(val) => Ok(rule!(require(NonFungibleGlobalId::from_public_key(&val)))),

        Err(_) => {
            match ResourceAddress::try_from_bech32(&address_bech32_decoder, key_or_resource) {
                Some(val) => Ok(rule!(require(val))),
                None => Err(format!(
                    "Resource or Key provided is invalid: {}",
                    key_or_resource
                )),
            }
        }
    }
}

pub fn fee_from_faucet(
    mut manifest: ManifestBuilder,
    virtual_account: ComponentAddress,
    amount: Decimal,
) -> ManifestBuilder {
    match get_network_id() {
        1 => {
            manifest = manifest.lock_fee(virtual_account, amount);
            manifest
        }
        2 => {
            manifest = manifest.lock_fee_from_faucet();
            manifest
        }
        _ => {
            panic!("We do not support the network with ID {}", get_network_id())
        }
    }
}

pub fn check_component(validator: &str) -> Result<ComponentAddress, String> {
    let network_definition = network_definition(get_network_id());
    let address_bech32_decoder: AddressBech32Decoder =
        AddressBech32Decoder::new(&network_definition);

    match ComponentAddress::try_from_bech32(&address_bech32_decoder, validator) {
        Some(val) => Ok(val),
        None => Err(format!("Component was invalid: {}", validator)),
    }
}
