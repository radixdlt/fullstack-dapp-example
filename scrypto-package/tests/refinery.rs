use radix_engine_interface::prelude::*;
use radquest::{
    morph_card_forge::{Availability, Energy, MorphCardData, Rarity as MorphCardRarity},
    radgem_forge::{Color, Material, RadgemData, Rarity as RadgemRarity},
    radmorph_forge::RadmorphData,
    refinery::{test_bindings::*, UserId},
};
use scrypto::this_package;
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
            burner => rule!(require(admin_badge.resource_address(&mut env)?));
            burner_updater => rule!(deny_all);
        ))
        .mint_initial_supply(dec!(99), &mut env)?;
    let radgems = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_roles(mint_roles!(
            minter => rule!(require(admin_badge.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        ))
        .burn_roles(burn_roles!(
            burner => rule!(require(admin_badge.resource_address(&mut env)?));
            burner_updater => rule!(deny_all);
        ))
        .mint_initial_supply(
            [
                RadgemData {
                    name: "Crystalline Coral Radgem".to_owned(),
                    key_image_url: UncheckedUrl("https://www.example.com".to_owned()),
                    color: Color::Coral,
                    material: Material::Crystalline,
                    rarity: RadgemRarity::Rare,
                },
                RadgemData {
                    name: "Metallic Forest Radgem".to_owned(),
                    key_image_url: UncheckedUrl("https://www.example.com".to_owned()),
                    color: Color::Forest,
                    material: Material::Metallic,
                    rarity: RadgemRarity::Common,
                },
            ],
            &mut env,
        )?;
    let morph_card = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .burn_roles(burn_roles!(
            burner => rule!(require(admin_badge.resource_address(&mut env)?));
            burner_updater => rule!(deny_all);
        ))
        .mint_initial_supply(
            [MorphCardData {
                name: "MoltenLava Morph Card".to_string(),
                rarity: MorphCardRarity::Rare,
                energy: Energy::MoltenLava,
                availability: Availability::Random,
            }],
            &mut env,
        )?;
    let radmorph = ResourceBuilder::new_ruid_non_fungible::<RadmorphData>(OwnerRole::None)
        .mint_roles(mint_roles!(
            minter => rule!(require(admin_badge.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        ))
        .mint_initial_supply([], &mut env)?;

    let refinery = Refinery::new(
        OwnerRole::Fixed(rule!(require(owner_badge.resource_address(&mut env)?))),
        admin_badge.take(dec!(3), &mut env)?,
        elements.resource_address(&mut env)?,
        morph_card.resource_address(&mut env)?,
        user_badge.resource_address(&mut env)?,
        radgems.resource_address(&mut env)?,
        radmorph.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    Ok((
        env,
        refinery,
        owner_badge,
        elements,
        morph_card,
        radgems,
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
    let (
        mut env,
        refinery,
        _owner_badge,
        elements,
        _morph_card,
        _radgems,
        _admin_badge,
        user_badge,
        user_id,
    ) = arrange_test_environment()?;

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
        _radgems,
        _admin_badge,
        _user_badge,
        user_id,
    ) = arrange_test_environment()?;

    env.disable_auth_module();

    // Act
    refinery.combine_elements_process(user_id, dec!(0.318), dec!(0.822), &mut env)?;

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
        _radgems,
        _admin_badge,
        user_badge,
        user_id,
    ) = arrange_test_environment()?;

    env.disable_auth_module();
    refinery.combine_elements_process(user_id.clone(), dec!(0.97), dec!(0.89), &mut env)?;
    env.enable_auth_module();

    // Act
    let result =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Assert
    assert_eq!(result.amount(&mut env)?, dec!(1));
    Ok(())
}

#[test]
fn can_combine_elements_claim_deposit_claim() -> Result<(), RuntimeError> {
    // Arrange
    let (
        mut env,
        mut refinery,
        _owner_badge,
        _elements,
        _morph_card,
        _radgems,
        _admin_badge,
        user_badge,
        user_id,
    ) = arrange_test_environment()?;

    env.disable_auth_module();
    refinery.combine_elements_process(user_id.clone(), dec!(0.97), dec!(0.87), &mut env)?;
    env.enable_auth_module();

    // Act
    let result_1 =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    env.disable_auth_module();
    refinery.combine_elements_process(user_id.clone(), dec!(0.16), dec!(0.64), &mut env)?;
    env.enable_auth_module();

    let result_2 =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Assert
    assert_eq!(result_1.amount(&mut env)?, dec!(1));
    assert_eq!(result_2.amount(&mut env)?, dec!(1));
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
        radgems,
        _admin_badge,
        _user_badge,
        _user_id,
    ) = arrange_test_environment()?;

    // Act
    let result = refinery.transform_radgems(
        radgems,
        morph_card,
        UncheckedUrl("https://www.example.com".to_owned()),
        &mut env,
    )?;

    // Assert
    assert_eq!(result.amount(&mut env)?, dec!(1));
    // TODO: Check the result's NF data, name is "Fine Crystalline MoltenLava RadMorph",
    Ok(())
}
