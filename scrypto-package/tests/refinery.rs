use radix_engine_interface::prelude::*;
use radquest::{
    morph_card_forge::{Availability, Energy, MorphCardData, Rarity as MorphCardRarity},
    radgem_forge::{Color, Material, RadgemData, Rarity as RadgemRarity},
    radmorph_forge::RadmorphData,
    refinery::test_bindings::*,
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
    user_badge_proof: Proof,
    radmorph_address: ResourceAddress,
    user_badge_id: NonFungibleGlobalId,
    admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env)?;

    let owner_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(4, &mut env)?;
    let user_badge = ResourceBuilder::new_string_non_fungible(OwnerRole::None)
        .mint_initial_supply(
            [(
                StringNonFungibleLocalId::new("user1234").unwrap(),
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
                energy: Energy::MoltenLava,
                rarity: MorphCardRarity::Rare,
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
        radgems.resource_address(&mut env)?,
        radmorph.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let radmorph_address = radmorph.resource_address(&mut env)?;
    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;
    let user_badge_proof = user_badge.create_proof_of_all(&mut env)?;
    let user_badge_local_id = user_badge.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let user_badge_id =
        NonFungibleGlobalId::new(user_badge.resource_address(&mut env)?, user_badge_local_id);

    Ok(Test {
        env,
        refinery,
        elements,
        morph_card,
        radgems,
        user_badge,
        user_badge_proof,
        radmorph_address,
        user_badge_id,
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
        user_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    refinery.combine_elements_deposit(
        user_badge_proof,
        elements.take(dec!(10), &mut env)?,
        &mut env,
    )?;

    // Assert
    Ok(())
}

#[test]
fn can_combine_elements_deposit_with_other_non_fungible() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        elements,
        refinery,
        ..
    } = arrange_test_environment()?;

    let nf_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([EmptyNonFungibleData {}], &mut env)?;

    // Act
    refinery.combine_elements_deposit(
        nf_badge.create_proof_of_all(&mut env)?,
        elements.take(dec!(10), &mut env)?,
        &mut env,
    )?;

    // Assert
    Ok(())
}

#[test]
fn can_combine_elements_process_1() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        user_badge_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_process_1(user_badge_id, dec!(0.318), dec!(0.822), &mut env)?;

    // Assert
    Ok(())
}

/* TODO: Implement - Awaiting Scrypto method `with_component_state` to be implemented
#[test]
fn can_combine_elements_process_2() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_process_1(user_id.clone(), dec!(0.97), dec!(0.87), &mut env)?;

    let refinery_state: RefineryState = env.read_component_state(refinery).unwrap();
    let radgem_local_id = refinery_state
        .radgem_vault
        .0
        .non_fungible_local_ids(1, &mut env)
        .unwrap()
        .pop()
        .unwrap();

    // Act
    refinery.combine_elements_process_2(
        radgem_local_id,
        UncheckedUrl::of("www.new_url.test"),
        &mut env,
    )?;

    // Assert
    Ok(())
}
*/

#[test]
fn can_combine_elements_claim() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        user_badge_proof,
        user_badge_id: user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_process_1(user_id.clone(), dec!(0.97), dec!(0.89), &mut env)?;

    // Act
    let result = refinery.combine_elements_claim(user_badge_proof, &mut env)?;

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
        user_badge_id: user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_process_1(user_id.clone(), dec!(0.97), dec!(0.87), &mut env)?;

    // Act
    let result_1 =
        refinery.combine_elements_claim(user_badge.create_proof_of_all(&mut env)?, &mut env)?;

    refinery.combine_elements_process_1(user_id.clone(), dec!(0.16), dec!(0.64), &mut env)?;

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
        user_badge_proof,
        ..
    } = arrange_test_environment()?;

    let m = morph_card.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let morph_card_data: MorphCardData = ResourceManager(morph_card.resource_address(&mut env)?)
        .get_non_fungible_data(m, &mut env)?;
    let radgem_ids = radgems.non_fungible_local_ids(&mut env)?;
    let radgem_1_data: RadgemData = ResourceManager(radgems.resource_address(&mut env)?)
        .get_non_fungible_data(radgem_ids[0].clone(), &mut env)?;
    let radgem_2_data: RadgemData = ResourceManager(radgems.resource_address(&mut env)?)
        .get_non_fungible_data(radgem_ids[1].clone(), &mut env)?;
    let key_image_url = UncheckedUrl("https://www.example.com".to_owned());

    let (radgem_a_data, radgem_b_data) = if &radgem_1_data.rarity >= &radgem_2_data.rarity {
        (radgem_1_data, radgem_2_data)
    } else {
        (radgem_2_data, radgem_1_data)
    };

    let data = format!(
        "{}{}{}{}{}",
        morph_card_data.energy.clone() as u64,
        radgem_a_data.material.clone() as u64,
        radgem_a_data.color.clone() as u64,
        radgem_b_data.color.clone() as u64,
        key_image_url.as_str(),
    );

    let key_hash = keccak256_hash(data.as_bytes());
    let value_hash = keccak256_hash(key_image_url.as_str().as_bytes());

    env.disable_auth_module();
    refinery.set_key_image_url_hashes(vec![(key_hash, value_hash)], &mut env)?;
    env.enable_auth_module();

    // Act
    let result = refinery.create_radmorph(
        radgems.take(dec!(1), &mut env)?,
        radgems.take(dec!(1), &mut env)?,
        morph_card,
        key_image_url,
        Some(user_badge_proof),
        &mut env,
    )?;

    // Assert
    assert_eq!(result.amount(&mut env)?, dec!(1));
    assert_eq!(result.resource_address(&mut env)?, radmorph_address);

    let radmorph_id = result.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let radmorph_data: RadmorphData =
        ResourceManager(radmorph_address).get_non_fungible_data(radmorph_id, &mut env)?;
    assert_eq!(
        radmorph_data.name,
        "Precious Crystalline MoltenLava RadMorph".to_owned(),
    );

    Ok(())
}

#[test]
fn cannot_create_radmorph_with_incorrect_image_url() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        morph_card,
        radgems,
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
    );

    // Assert
    assert!(result.is_err());

    Ok(())
}
