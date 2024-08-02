use scrypto::prelude::FungibleBucket;
use scrypto_test::prelude::*;

use radgem_forge_v2::radgem_forge_v2::{radgem_forge_v2_test::RadgemForgeV2, RadgemData, UserId};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    radgem_forge_v2: RadgemForgeV2,
    _radgem_address: ResourceAddress,
    radgems_data: Vec<RadgemData>,
    elements: Bucket,
    hero_badge: Bucket,
    hero_badge_proof: Proof,
    user_id: UserId,
    admin_badge_proof: Proof,
    super_admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(2, &mut env)?;
    let user_id_string = "user1234".to_string();
    let hero_badge = ResourceBuilder::new_string_non_fungible(OwnerRole::None)
        .mint_initial_supply(
            [(
                StringNonFungibleLocalId::new(user_id_string.clone()).unwrap(),
                EmptyNonFungibleData {},
            )],
            &mut env,
        )?;
    let elements = ResourceBuilder::new_fungible(OwnerRole::None)
        .burn_roles(burn_roles!(
            burner => rule!(require(admin_badge.resource_address(&mut env)?));
            burner_updater => rule!(deny_all);
        ))
        .mint_initial_supply(dec!(200), &mut env)?;

    let radgem = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_roles(mint_roles!(
            minter => rule!(require(admin_badge.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        ))
        .burn_roles(burn_roles!(
            burner => rule!(require(admin_badge.resource_address(&mut env)?));
            burner_updater => rule!(deny_all);
        ))
        .non_fungible_data_update_roles(non_fungible_data_update_roles!(
            non_fungible_data_updater => rule!(require(admin_badge.resource_address(&mut env)?));
            non_fungible_data_updater_updater => rule!(deny_all);
        ))
        .mint_initial_supply(
            [RadgemData {
                key_image_url: UncheckedUrl("https://example.com".to_string()),
                name: "name".to_string(),
                description: "description".to_string(),
                material: "material".to_string(),
                color: "color".to_string(),
                rarity: "rarity".to_string(),
                quality: dec!(20),
            }],
            &mut env,
        )?;

    let radgem_forge_v2 = RadgemForgeV2::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        FungibleBucket(admin_badge.take(dec!(1), &mut env)?),
        hero_badge.resource_address(&mut env)?,
        elements.resource_address(&mut env)?,
        radgem.resource_address(&mut env)?.into(),
        package_address,
        &mut env,
    )?;

    let radgem_address = radgem.resource_address(&mut env)?;
    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;
    let hero_badge_proof = hero_badge.create_proof_of_all(&mut env)?;
    let user_id = UserId(user_id_string);
    let radgems_data = vec![RadgemData {
        key_image_url: UncheckedUrl("https://example.com".to_string()),
        name: "name".to_string(),
        description: "description".to_string(),
        material: "material".to_string(),
        color: "color".to_string(),
        rarity: "rarity".to_string(),
        quality: dec!(20),
    }];

    Ok(Test {
        env,
        radgem_forge_v2,
        _radgem_address: radgem_address,
        radgems_data,
        elements,
        hero_badge,
        hero_badge_proof,
        user_id,
        admin_badge_proof,
        super_admin_badge_proof,
    })
}

#[test]
fn can_instantiate_radgem_forge_v2() -> Result<(), RuntimeError> {
    // Act
    _ = arrange_test_environment()?;
    // Assert
    Ok(())
}

#[test]
fn can_deposit_elements() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        elements,
        radgem_forge_v2,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    radgem_forge_v2.deposit_elements(
        hero_badge_proof,
        elements.take(dec!(5), &mut env)?,
        &mut env,
    )?;

    // Assert
    Ok(())
}

#[test]
fn can_deposit_lots_of_elements() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        elements,
        radgem_forge_v2,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    radgem_forge_v2.deposit_elements(
        hero_badge_proof,
        elements.take(dec!(100), &mut env)?,
        &mut env,
    )?;

    // Assert
    Ok(())
}

#[test]
fn cannot_deposit_to_many_elements() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        elements,
        radgem_forge_v2,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    let result = radgem_forge_v2.deposit_elements(
        hero_badge_proof,
        elements.take(dec!(105), &mut env)?,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    Ok(())
}

#[test]
fn cannot_deposit_elements_with_wrong_badge() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        elements,
        radgem_forge_v2,
        ..
    } = arrange_test_environment()?;

    let nf_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([EmptyNonFungibleData {}], &mut env)?;

    // Act
    let result = radgem_forge_v2.deposit_elements(
        nf_badge.create_proof_of_all(&mut env)?,
        elements.take(dec!(5), &mut env)?,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    assert!(result.unwrap_err().to_string().contains("Invalid proof"));
    Ok(())
}

#[test]
fn can_mint_radgems() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        radgems_data,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    radgem_forge_v2.mint_radgems(user_id, radgems_data, &mut env)?;

    // Assert
    Ok(())
}

#[test]
fn can_claim_radgems() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        hero_badge_proof,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let mut radgem_data = Vec::<RadgemData>::new();
    for _ in 0..40 {
        radgem_data.push(RadgemData {
            key_image_url: UncheckedUrl("https://example.com".to_string()),
            name: "name".to_string(),
            description: "description".to_string(),
            material: "material".to_string(),
            color: "color".to_string(),
            rarity: "rarity".to_string(),
            quality: dec!(20),
        })
    }

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    radgem_forge_v2.mint_radgems(user_id.clone(), radgem_data, &mut env)?;

    // Act
    let result = radgem_forge_v2.claim_radgems(hero_badge_proof, &mut env)?;

    // Assert
    assert_eq!(result.0.amount(&mut env)?, dec!(20));
    Ok(())
}

#[test]
fn can_claim_mint_claim() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        hero_badge,
        user_id,
        admin_badge_proof,
        radgems_data,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    radgem_forge_v2.mint_radgems(user_id.clone(), radgems_data.clone(), &mut env)?;

    // Act
    let result_1 =
        radgem_forge_v2.claim_radgems(hero_badge.create_proof_of_all(&mut env)?, &mut env)?;

    radgem_forge_v2.mint_radgems(user_id, radgems_data, &mut env)?;

    let result_2 =
        radgem_forge_v2.claim_radgems(hero_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Assert
    assert_eq!(result_1.0.amount(&mut env)?, dec!(1));
    assert_eq!(result_2.0.amount(&mut env)?, dec!(1));
    Ok(())
}

#[test]
fn can_mint_mint_claim_radgems() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        radgems_data,
        hero_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    radgem_forge_v2.mint_radgems(user_id.clone(), radgems_data.clone(), &mut env)?;

    radgem_forge_v2.mint_radgems(user_id.clone(), radgems_data, &mut env)?;

    let result =
        radgem_forge_v2.claim_radgems(hero_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Assert
    assert_eq!(result.0.amount(&mut env)?, dec!(2));
    Ok(())
}

#[test]
pub fn can_disable_radgem_forge_v2() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radgem_forge_v2.disable(&mut env)?;

    // Assert
    Ok(())
}

#[test]
pub fn cannot_deposit_elements_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        hero_badge_proof,
        super_admin_badge_proof,
        elements,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radgem_forge_v2.disable(&mut env)?;

    // Act
    let result = radgem_forge_v2.deposit_elements(
        hero_badge_proof,
        elements.take(dec!(10), &mut env)?,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("RadgemForgeV2 disabled"));
    Ok(())
}

#[test]
pub fn can_enable_then_combine_elements_deposit_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        hero_badge_proof,
        super_admin_badge_proof,
        elements,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radgem_forge_v2.disable(&mut env)?;

    // Act
    radgem_forge_v2.enable(&mut env)?;

    let result = radgem_forge_v2.deposit_elements(
        hero_badge_proof,
        elements.take(dec!(5), &mut env)?,
        &mut env,
    );

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn get_user_radgem_claims_count() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge_v2,
        user_id,
        admin_badge_proof,
        radgems_data,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    radgem_forge_v2.mint_radgems(user_id.clone(), radgems_data, &mut env)?;

    // Act
    let result = radgem_forge_v2.get_user_radgem_claims_count(user_id, &mut env)?;

    // Assert
    assert_eq!(result, 1);
    Ok(())
}

#[test]
fn get_empty_user_radgem_claims_count() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        radgem_forge_v2,
        user_id,
        ..
    } = arrange_test_environment()?;

    // Act
    let result = radgem_forge_v2.get_user_radgem_claims_count(user_id, &mut env)?;

    // Assert
    assert_eq!(result, 0);
    Ok(())
}
