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

struct Test {
    env: TestEnvironment,
    refinery: Refinery,
    elements: Bucket,
    morph_card: Bucket,
    radgems: Bucket,
    user_badge: Bucket,
    radmorph_address: ResourceAddress,
    user_id: UserId,
    admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
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
                    key_image_url: UncheckedUrl("".to_owned()),
                    name: "Crystalline Coral Radgem".to_owned(),
                    material: Material::Crystalline,
                    color: Color::Coral,
                    rarity: RadgemRarity::Rare,
                },
                RadgemData {
                    key_image_url: UncheckedUrl("".to_owned()),
                    name: "Metallic Forest Radgem".to_owned(),
                    material: Material::Metallic,
                    color: Color::Forest,
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

    let radmorph_address = radmorph.resource_address(&mut env)?;
    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        refinery,
        elements,
        morph_card,
        radgems,
        user_badge,
        radmorph_address,
        user_id: UserId(format!("#{user_int}#")),
        admin_badge_proof,
    })
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
    let Test {
        mut env,
        elements,
        refinery,
        user_badge,
        ..
    } = arrange_test_environment()?;

    // Act
    refinery.combine_elements_deposit(
        user_badge.create_proof_of_all(&mut env)?,
        elements.take(dec!(10), &mut env)?,
        &mut env,
    )?;

    // Assert
    Ok(())
}

#[test]
fn can_combine_elements_process() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_process(user_id, dec!(0.318), dec!(0.822), &mut env)?;

    // Assert
    Ok(())
}

#[test]
fn can_combine_elements_claim() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        user_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_process(user_id.clone(), dec!(0.97), dec!(0.89), &mut env)?;

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
    let Test {
        mut env,
        mut refinery,
        user_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_process(user_id.clone(), dec!(0.97), dec!(0.87), &mut env)?;

    // Act
    let result_1 =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    refinery.combine_elements_process(user_id.clone(), dec!(0.16), dec!(0.64), &mut env)?;

    let result_2 =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Assert
    assert_eq!(result_1.amount(&mut env)?, dec!(1));
    assert_eq!(result_2.amount(&mut env)?, dec!(1));
    Ok(())
}

#[test]
fn can_create_radmorph() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        morph_card,
        radgems,
        radmorph_address,
        ..
    } = arrange_test_environment()?;

    // Act
    let result = refinery.create_radmorph(
        radgems.take(dec!(1), &mut env)?,
        radgems.take(dec!(1), &mut env)?,
        morph_card,
        UncheckedUrl("https://www.example.com".to_owned()),
        None,
        &mut env,
    )?;

    // Assert
    assert_eq!(result.amount(&mut env)?, dec!(1));
    assert_eq!(result.resource_address(&mut env)?, radmorph_address);
    // TODO: Check the result's NF data, name is "Fine Crystalline MoltenLava RadMorph",

    Ok(())
}
