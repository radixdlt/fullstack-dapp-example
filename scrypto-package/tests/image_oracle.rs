use radix_engine_interface::prelude::*;
use radquest::image_oracle::test_bindings::*;
use scrypto::this_package;
use scrypto_test::prelude::*;

fn arrange_test_environment() -> Result<(TestEnvironment, ImageOracle, Bucket, Bucket), RuntimeError>
{
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env)?;

    let owner_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(1, &mut env)?;

    let image_oracle = ImageOracle::new(
        OwnerRole::Fixed(rule!(require(owner_badge.resource_address(&mut env)?))),
        admin_badge.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    Ok((env, image_oracle, owner_badge, admin_badge))
}

#[test]
fn can_instantiate_image_oracle() -> Result<(), RuntimeError> {
    let _ = arrange_test_environment()?;

    Ok(())
}

#[test]
fn can_set_key_image_url_hashes() -> Result<(), RuntimeError> {
    let (mut env, mut image_oracle, _owner_badge, _admin_badge) = arrange_test_environment()?;

    let key_image_url_hashes = vec![
        (
            keccak256_hash("key1".bytes().collect::<Vec<u8>>()),
            keccak256_hash("image1url".bytes().collect::<Vec<u8>>()),
        ),
        (
            keccak256_hash("key2".bytes().collect::<Vec<u8>>()),
            keccak256_hash("image2url".bytes().collect::<Vec<u8>>()),
        ),
    ];

    env.disable_auth_module();
    image_oracle.set_key_image_url_hashes(key_image_url_hashes, &mut env)?;

    Ok(())
}

#[test]
fn can_get_key_image_url_hash() -> Result<(), RuntimeError> {
    let (mut env, mut image_oracle, _owner_badge, _admin_badge) = arrange_test_environment()?;

    let key_image_url_hashes = vec![
        (
            keccak256_hash("key1".bytes().collect::<Vec<u8>>()),
            keccak256_hash("image1url".bytes().collect::<Vec<u8>>()),
        ),
        (
            keccak256_hash("key2".bytes().collect::<Vec<u8>>()),
            keccak256_hash("image2url".bytes().collect::<Vec<u8>>()),
        ),
    ];

    env.disable_auth_module();
    image_oracle.set_key_image_url_hashes(key_image_url_hashes, &mut env)?;

    let key_image_url_hash = image_oracle.get_key_image_url_hash(
        keccak256_hash("key1".bytes().collect::<Vec<u8>>()),
        &mut env,
    )?;

    assert_eq!(
        key_image_url_hash,
        Some(keccak256_hash("image1url".bytes().collect::<Vec<u8>>()))
    );

    Ok(())
}

#[test]
fn can_remove_key_image_url_hashes() -> Result<(), RuntimeError> {
    let (mut env, mut image_oracle, _owner_badge, _admin_badge) = arrange_test_environment()?;

    let key_image_url_hashes = vec![
        (
            keccak256_hash("key1".bytes().collect::<Vec<u8>>()),
            keccak256_hash("image1url".bytes().collect::<Vec<u8>>()),
        ),
        (
            keccak256_hash("key2".bytes().collect::<Vec<u8>>()),
            keccak256_hash("image2url".bytes().collect::<Vec<u8>>()),
        ),
    ];

    env.disable_auth_module();
    image_oracle.set_key_image_url_hashes(key_image_url_hashes, &mut env)?;

    image_oracle.remove_key_image_url_hashes(
        vec![keccak256_hash("key1".bytes().collect::<Vec<u8>>())],
        &mut env,
    )?;

    let key_image_url_hash = image_oracle.get_key_image_url_hash(
        keccak256_hash("key1".bytes().collect::<Vec<u8>>()),
        &mut env,
    )?;

    assert_eq!(key_image_url_hash, None);

    Ok(())
}
