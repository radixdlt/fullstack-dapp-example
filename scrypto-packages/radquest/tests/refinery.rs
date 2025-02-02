use scrypto_test::prelude::*;

use radquest::{
    image_oracle::image_oracle_test::*,
    radmorph_forge::{radmorph_forge_test::*, MorphEnergyCardData, RadgemData, RadmorphData},
    refinery::refinery_test::*,
};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    refinery: Refinery,
    image_oracle: ImageOracle,
    radmorph_forge: RadmorphForge,
    morph_card: Bucket,
    radgems: Bucket,
    radmorph_address: ResourceAddress,
    super_admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(4, &mut env)?;
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
        .non_fungible_data_update_roles(non_fungible_data_update_roles!(
            non_fungible_data_updater => rule!(require(admin_badge.resource_address(&mut env)?));
            non_fungible_data_updater_updater => rule!(deny_all);
        ))
        .mint_initial_supply(
            [
                RadgemData {
                    key_image_url: UncheckedUrl("".to_string()),
                    name: "Crystalline Coral Radgem".to_string(),
                    description: "The Common Crystalline material of this Blood Radgem is graded at a quality of 5 out of a possible 25.".to_string(),
                    material: "crystalline".to_string(),
                    color: "blood".to_string(),
                    rarity: "common".to_string(),
                    quality: dec!(5),
                },
                RadgemData {
                    key_image_url: UncheckedUrl("".to_string()),
                    name: "Metallic Forest Radgem".to_string(),
                    description: "The Rare Metallic material of this Forest Radgem is graded at a quality of 10 out of a possible 25.".to_string(),
                    material: "metallic".to_string(),
                    color: "forest".to_string(),
                    rarity: "rare".to_string(),
                    quality: dec!(10),
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
            [MorphEnergyCardData {
                key_image_url: UncheckedUrl("https://www.example.com".to_string()),
                name: "Molten Lava Morph Card".to_string(),
                description: "".to_string(),
                energy_type: "molten lava".to_string(),
                energy_description: "the fiery flow of molten lava".to_string(),
                rarity: "common".to_string(),
                quality: dec!(5),
                limited_edition: false,
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
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        admin_badge.take(dec!(3), &mut env)?,
        hero_badge.resource_address(&mut env)?,
        elements.resource_address(&mut env)?,
        morph_card.resource_address(&mut env)?,
        radgems.resource_address(&mut env)?,
        radmorph.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let image_oracle =
        env.with_component_state(refinery, |refinery_state: &mut RefineryState, _| {
            ImageOracle(refinery_state.image_oracle.as_node_id().to_owned())
        })?;

    let radmorph_forge =
        env.with_component_state(refinery, |refinery_state: &mut RefineryState, _| {
            RadmorphForge(refinery_state.radmorph_forge.as_node_id().to_owned())
        })?;

    let radmorph_address = radmorph.resource_address(&mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        refinery,
        image_oracle,
        radmorph_forge,
        morph_card,
        radgems,
        radmorph_address,
        super_admin_badge_proof,
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
fn can_create_radmorph() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        mut image_oracle,
        morph_card,
        radgems,
        radmorph_address,
        ..
    } = arrange_test_environment()?;

    let m = morph_card.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let morph_card_data: MorphEnergyCardData =
        ResourceManager(morph_card.resource_address(&mut env)?)
            .get_non_fungible_data(m, &mut env)?;
    let radgem_ids = radgems.non_fungible_local_ids(&mut env)?;
    let radgem_1_data: RadgemData = ResourceManager(radgems.resource_address(&mut env)?)
        .get_non_fungible_data(radgem_ids[0].clone(), &mut env)?;
    let radgem_2_data: RadgemData = ResourceManager(radgems.resource_address(&mut env)?)
        .get_non_fungible_data(radgem_ids[1].clone(), &mut env)?;
    let key_image_url = UncheckedUrl("https://www.example.com".to_string());

    let material = if radgem_1_data.material == "radiant" || radgem_2_data.material == "radiant" {
        "radiant"
    } else if radgem_1_data.material == "metallic" || radgem_2_data.material == "metallic" {
        "metallic"
    } else {
        "crystalline"
    };

    let data = format!(
        "{}{}{}{}",
        morph_card_data.energy_type, material, radgem_1_data.color, radgem_2_data.color,
    );

    let key_hash = keccak256_hash(data.as_bytes());
    let value_hash = keccak256_hash(key_image_url.as_str().as_bytes());

    env.disable_auth_module();
    image_oracle.set_key_image_url_hashes(vec![(key_hash, value_hash)], &mut env)?;
    env.enable_auth_module();

    // Act
    let result = refinery
        .create_radmorph(
            radgems.take(dec!(2), &mut env)?,
            morph_card,
            key_image_url,
            &mut env,
        )
        .unwrap();

    // Assert
    assert_eq!(result.amount(&mut env)?, dec!(1));
    assert_eq!(result.resource_address(&mut env)?, radmorph_address);

    let radmorph_id = result.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let radmorph_data: RadmorphData =
        ResourceManager(radmorph_address).get_non_fungible_data(radmorph_id, &mut env)?;
    assert_eq!(
        radmorph_data.name,
        "Basic Metallic Blood and Forest Molten Lava RadMorph {20}".to_string(),
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
        radgems.take(dec!(2), &mut env)?,
        morph_card,
        UncheckedUrl("https://www.example.com".to_string()),
        &mut env,
    );

    // Assert
    assert!(result.is_err());

    Ok(())
}

#[test]
pub fn can_disable_refinery() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    refinery.disable(&mut env)?;

    // Assert
    Ok(())
}

#[test]
pub fn cannot_create_radmorph_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        morph_card,
        radgems,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    refinery.disable(&mut env)?;
    let result = refinery.create_radmorph(
        radgems.take(dec!(2), &mut env)?,
        morph_card,
        UncheckedUrl("https://www.example.com".to_string()),
        &mut env,
    );

    // Assert
    println!("{:?}", result);
    assert!(result.is_err());
    Ok(())
}
