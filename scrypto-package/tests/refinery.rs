use radix_engine_interface::prelude::*;
use radquest::{
    morph_card_forge::{Energy, MorphCard, Rarity},
    refinery::{test_bindings::*, UserId},
};
use scrypto::*;
use scrypto_test::prelude::*;
use scrypto_unit::*;

fn arrange_test_environment() -> Result<
    (
        TestEnvironment,
        Refinery,
        Bucket,
        Bucket,
        Bucket,
        Bucket,
        Bucket,
        UserId,
    ),
    RuntimeError,
> {
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env)?;

    let user_int = 5u64;

    let owner_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(4, &mut env)?;
    let user_badge = ResourceBuilder::new_integer_non_fungible(OwnerRole::None)
        .mint_initial_supply(
            [(
                IntegerNonFungibleLocalId::new(user_int),
                EmptyNonFungibleData {},
            )],
            &mut env,
        )?;
    let elements = ResourceBuilder::new_fungible(OwnerRole::None)
        .burn_roles(burn_roles!(
            burner => rule!(allow_all);
            burner_updater => rule!(deny_all);
        ))
        .mint_initial_supply(dec!(99), &mut env)?;
    let morph_card = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .burn_roles(burn_roles!(
            burner => rule!(require(admin_badge.resource_address(&mut env)?));
            burner_updater => rule!(deny_all);
        ))
        .mint_initial_supply(
            [MorphCard {
                name: "MoltenLava Morph Card".to_string(),
                rarity: Rarity::Rare,
                energy: Energy::MoltenLava,
            }],
            &mut env,
        )?;

    let refinery = Refinery::new(
        OwnerRole::Fixed(rule!(require(owner_badge.resource_address(&mut env)?))),
        admin_badge.take(dec!(3), &mut env)?,
        elements.resource_address(&mut env)?,
        morph_card.resource_address(&mut env)?,
        user_badge.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    Ok((
        env,
        refinery,
        owner_badge,
        elements,
        morph_card,
        admin_badge,
        user_badge,
        UserId(format!("#{user_int}#")),
    ))
}

#[test]
fn can_instantiate_refinery() -> Result<(), RuntimeError> {
    // Act
    _ = arrange_test_environment()?;
    // Assert
    Ok(())
}

#[test]
fn can_combine_elements_deposit() -> Result<(), RuntimeError> {
    // Arrange
    let (mut env, refinery, _owner_badge, elements, _morph_card, _admin_badge, user_badge, user_id) =
        arrange_test_environment()?;

    // Act
    let result = refinery.combine_elements_deposit(
        user_badge.create_proof_of_all(&mut env)?,
        elements.take(dec!(3), &mut env)?,
        &mut env,
    )?;

    // Assert
    assert_eq!(result, user_id);
    Ok(())
}

#[test]
fn can_combine_elements_process() -> Result<(), RuntimeError> {
    // Arrange
    let (
        mut env,
        mut refinery,
        _owner_badge,
        _elements,
        _morph_card,
        _admin_badge,
        _user_badge,
        user_id,
    ) = arrange_test_environment()?;

    env.disable_auth_module();

    // Act
    refinery.combine_elements_process(user_id, dec!(0.318), &mut env)?;

    // Assert
    Ok(())
}

#[test]
fn can_combine_elements_claim() -> Result<(), RuntimeError> {
    // Arrange
    let (
        mut env,
        mut refinery,
        _owner_badge,
        _elements,
        _morph_card,
        _admin_badge,
        user_badge,
        user_id,
    ) = arrange_test_environment()?;

    env.disable_auth_module();
    refinery.combine_elements_process(user_id.clone(), dec!(0.97), &mut env)?;
    env.enable_auth_module();

    // Act
    let result =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Assert
    assert_eq!(result.amount(&mut env)?, dec!(1));
    Ok(())
}

#[test]
fn can_transform_radgems() -> Result<(), RuntimeError> {
    // Arrange
    let (
        mut env,
        mut refinery,
        _owner_badge,
        _elements,
        morph_card,
        _admin_badge,
        user_badge,
        user_id,
    ) = arrange_test_environment()?;

    env.disable_auth_module();
    for n in [dec!(0.87), dec!(0.18)] {
        refinery.combine_elements_process(user_id.clone(), n, &mut env)?;
    }
    env.enable_auth_module();

    let radgems =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Act
    let result = refinery.transform_radgems(radgems, morph_card, &mut env)?;

    // Assert
    assert_eq!(result.amount(&mut env)?, dec!(1));
    Ok(())
}
