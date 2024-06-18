use radquest::{image_oracle::image_oracle_test::*, radgem_forge::MATERIAL};
use scrypto_test::prelude::*;

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    image_oracle: ImageOracle,
    admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(1, &mut env)?;

    let image_oracle = ImageOracle::new(
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        admin_badge.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        image_oracle,
        admin_badge_proof,
    })
}

#[test]
fn can_instantiate_image_oracle() -> Result<(), RuntimeError> {
    let _ = arrange_test_environment()?;

    Ok(())
}

#[test]
fn can_set_key_image_url_hashes() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut image_oracle,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let key_image_url_hashes = vec![
        (
            keccak256_hash("key1".as_bytes()),
            keccak256_hash("image1url".as_bytes()),
        ),
        (
            keccak256_hash("key2".as_bytes()),
            keccak256_hash("image2url".as_bytes()),
        ),
    ];

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    image_oracle.set_key_image_url_hashes(key_image_url_hashes, &mut env)?;

    Ok(())
}

#[test]
fn can_get_key_image_url_hash() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut image_oracle,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let key_image_url_hashes = vec![
        (
            keccak256_hash("key1".as_bytes()),
            keccak256_hash("image1url".as_bytes()),
        ),
        (
            keccak256_hash("key2".as_bytes()),
            keccak256_hash("image2url".as_bytes()),
        ),
    ];

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    image_oracle.set_key_image_url_hashes(key_image_url_hashes, &mut env)?;

    let key_image_url_hash =
        image_oracle.get_key_image_url_hash(keccak256_hash("key1".as_bytes()), &mut env)?;

    assert_eq!(
        key_image_url_hash,
        Some(keccak256_hash("image1url".as_bytes()))
    );

    Ok(())
}

#[test]
fn cannot_get_incorrect_key_image_url_hash() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut image_oracle,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let key_image_url_hashes = vec![
        (
            keccak256_hash("key1".as_bytes()),
            keccak256_hash("image1url".as_bytes()),
        ),
        (
            keccak256_hash("key2".as_bytes()),
            keccak256_hash("image2url".as_bytes()),
        ),
    ];

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    image_oracle.set_key_image_url_hashes(key_image_url_hashes, &mut env)?;

    let key_image_url_hash =
        image_oracle.get_key_image_url_hash(keccak256_hash("key3".as_bytes()), &mut env)?;

    assert_eq!(key_image_url_hash, None);

    Ok(())
}

#[test]
fn can_remove_key_image_url_hashes() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut image_oracle,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let key_image_url_hashes = vec![
        (
            keccak256_hash("key1".as_bytes()),
            keccak256_hash("image1url".as_bytes()),
        ),
        (
            keccak256_hash("key2".as_bytes()),
            keccak256_hash("image2url".as_bytes()),
        ),
    ];

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    image_oracle.set_key_image_url_hashes(key_image_url_hashes, &mut env)?;

    image_oracle.remove_key_image_url_hashes(vec![keccak256_hash("key1".as_bytes())], &mut env)?;

    let key_image_url_hash =
        image_oracle.get_key_image_url_hash(keccak256_hash("key1".as_bytes()), &mut env)?;

    assert_eq!(key_image_url_hash, None);

    Ok(())
}

#[test]
fn hash_value() {
    for i in 1..=3 {
        let nf_data = format!("{}{}{}{}", "Molten Lava", MATERIAL[i - 1], "Dusk", "Forest");
        let nf_data_hash = keccak256_hash(nf_data.as_bytes().to_vec());
        let image_url = format!("https://www.test.com/image{}url", i);
        let image_url_hash = keccak256_hash(image_url.as_bytes().to_vec());
        println!("\nnf_data {i}: {:?}  -  hash: {:?}", nf_data, nf_data_hash);
        println!(
            "image_url {i}: {:?}  -  hash: {:?}",
            image_url, image_url_hash
        );
        assert_eq!(image_url_hash, keccak256_hash(image_url.as_bytes()));
    }
}
