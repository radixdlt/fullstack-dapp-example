use radquest::{
    radgem_forge::{radgem_forge_test::*, RadgemData, MATERIAL, RARE_COLOR},
    refinery::RARITY,
};
use scrypto_test::prelude::*;

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    radgem_forge: RadgemForge,
    radgem_address: ResourceAddress,
    _radgem: Bucket,
    radgem_local_id: NonFungibleLocalId,
    admin_badge_proof: Proof,
    super_admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(2, &mut env)?;
    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let _radgem = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
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
                key_image_url: UncheckedUrl("".to_string()),
                name: "Crystalline Coral Radgem".to_string(),
                material: MATERIAL[0].to_string(), // Crystalline,
                color: RARE_COLOR[0].to_string(),  // Coral,
                rarity: RARITY[0].to_string(),     // Common
            }],
            &mut env,
        )?;
    let radgem_forge = RadgemForge::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::None,
        admin_badge.take(dec!(1), &mut env)?,
        _radgem.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let radgem_address = _radgem.resource_address(&mut env)?;
    let radgem_local_id = _radgem.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let admin_badge_proof = admin_badge.create_proof_of_amount(dec!(1), &mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        radgem_forge,
        radgem_address,
        _radgem,
        radgem_local_id,
        admin_badge_proof,
        super_admin_badge_proof,
    })
}

#[test]
fn instantiate_radgem_forge() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        radgem_forge,
        ..
    } = arrange_test_environment()?;

    env.with_component_state(
        radgem_forge,
        |radgem_forge_state: &mut RadgemForgeState, env| {
            let amount = radgem_forge_state.admin_badge.0.amount(env).unwrap();
            assert_eq!(amount, dec!(1));
        },
    )?;

    Ok(())
}

#[test]
fn can_mint_radgem() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut radgem_forge,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;

    let radgem = radgem_forge.mint_radgem(dec!(0.5), dec!(0.5), &mut env)?;

    assert_eq!(radgem.amount(&mut env)?, dec!(1));

    Ok(())
}

#[test]
fn cannot_mint_radgem_without_admin_badge() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut radgem_forge,
        ..
    } = arrange_test_environment()?;

    let result = radgem_forge.mint_radgem(dec!(0.5), dec!(0.5), &mut env);

    assert!(result.is_err(),);

    Ok(())
}

#[test]
fn can_mint_common_radgem() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut radgem_forge,
        radgem_address,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    // both seed numbers below 2/3 to ensure a common radgem
    let radgem = radgem_forge.mint_radgem(dec!(0.65), dec!(0.59), &mut env)?;

    let radgem_id = radgem.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let radgem_data: RadgemData =
        ResourceManager(radgem_address).get_non_fungible_data(radgem_id, &mut env)?;
    assert_eq!(radgem_data.rarity, RARITY[0].to_string(),);

    Ok(())
}

#[test]
fn can_mint_uncommon_radgem() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut radgem_forge,
        radgem_address,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    // one seed numbers above and one bellow 2/3 to ensure a rare radgem
    let radgem = radgem_forge.mint_radgem(dec!(0.65), dec!(0.75), &mut env)?;

    let radgem_id = radgem.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let radgem_data: RadgemData =
        ResourceManager(radgem_address).get_non_fungible_data(radgem_id, &mut env)?;
    assert_eq!(radgem_data.rarity, RARITY[1].to_string());

    Ok(())
}

#[test]
fn can_mint_rare_radgem() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut radgem_forge,
        radgem_address,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    // both seed numbers above 2/3 to ensure an rare radgem
    let radgem = radgem_forge.mint_radgem(dec!(0.75), dec!(0.88), &mut env)?;

    let radgem_id = radgem.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let radgem_data: RadgemData =
        ResourceManager(radgem_address).get_non_fungible_data(radgem_id, &mut env)?;
    assert_eq!(radgem_data.rarity, RARITY[2].to_string());

    Ok(())
}

#[test]
fn can_update_key_image() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut radgem_forge,
        radgem_address,
        radgem_local_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    radgem_forge.update_key_image(
        radgem_local_id.clone(),
        UncheckedUrl("https://example.com".to_string()),
        &mut env,
    )?;

    let radgem_data: RadgemData =
        ResourceManager(radgem_address).get_non_fungible_data(radgem_local_id, &mut env)?;
    assert_eq!(
        radgem_data.key_image_url,
        UncheckedUrl("https://example.com".to_string()),
    );

    Ok(())
}

#[test]
pub fn can_disable_radgem_forge() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radgem_forge.disable(&mut env)?;

    // Assert
    env.with_component_state(
        radgem_forge,
        |radgem_forge_state: &mut RadgemForgeState, _| {
            assert!(!radgem_forge_state.enabled);
        },
    )?;

    Ok(())
}

#[test]
pub fn can_not_mint_radgems_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radgem_forge,
        admin_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radgem_forge.disable(&mut env)?;

    // Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = radgem_forge.mint_radgem(dec!(0.5), dec!(0.5), &mut env);

    // Assert
    println!("{:?}", result);
    assert!(result.is_err());

    Ok(())
}
