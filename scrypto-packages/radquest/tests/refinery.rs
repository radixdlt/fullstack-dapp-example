use scrypto_test::prelude::*;

use radquest::{
    image_oracle::image_oracle_test::*,
    morph_card_forge::MorphEnergyCardData,
    quest_rewards::UserId,
    radgem_forge::{RadgemData, COLOR, MATERIAL},
    radmorph_forge::{radmorph_forge_test::*, RadmorphData},
    refinery::{refinery_test::*, RARITY},
};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    refinery: Refinery,
    image_oracle: ImageOracle,
    radmorph_forge: RadmorphForge,
    elements: Bucket,
    morph_card: Bucket,
    radgems: Bucket,
    hero_badge: Bucket,
    hero_badge_proof: Proof,
    radmorph_address: ResourceAddress,
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
                    material: MATERIAL[0].name.to_string(), // Crystalline,
                    color: COLOR[0].to_string(),            // Blood,
                    rarity: MATERIAL[0].rarity.name.to_string(),          // Common,
                    quality: dec!(5),
                },
                RadgemData {
                    key_image_url: UncheckedUrl("".to_string()),
                    name: "Metallic Forest Radgem".to_string(),
                    description: "The Rare Metallic material of this Forest Radgem is graded at a quality of 10 out of a possible 25.".to_string(),
                    material: MATERIAL[1].name.to_string(), // Metallic,
                    color: COLOR[1].to_string(),            // Forest,
                    rarity: MATERIAL[1].rarity.name.to_string(),          // Rare,
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
                energy_type: "Molten Lava".to_string(),
                rarity: RARITY[1].to_string(), // Uncommon,
                availability: "Random".to_string(),
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
    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;
    let hero_badge_proof = hero_badge.create_proof_of_all(&mut env)?;
    let user_id = UserId(user_id_string);

    Ok(Test {
        env,
        refinery,
        image_oracle,
        radmorph_forge,
        elements,
        morph_card,
        radgems,
        hero_badge,
        hero_badge_proof,
        radmorph_address,
        user_id,
        admin_badge_proof,
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
fn can_combine_elements_deposit() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        elements,
        refinery,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    refinery.combine_elements_deposit(
        hero_badge_proof,
        elements.take(dec!(10), &mut env)?,
        &mut env,
    )?;

    // Assert
    Ok(())
}

#[test]
fn cannot_combine_elements_deposit_with_other_non_fungible() -> Result<(), RuntimeError> {
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
    let result = refinery.combine_elements_deposit(
        nf_badge.create_proof_of_all(&mut env)?,
        elements.take(dec!(10), &mut env)?,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    Ok(())
}

#[test]
fn can_combine_elements_mint_radgem() -> Result<(), RuntimeError> {
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
    refinery.combine_elements_mint_radgem(
        user_id,
        dec!(0.318),
        dec!(0.822),
        dec!(0.517),
        &mut env,
    )?;

    // Assert
    Ok(())
}

#[test]
fn can_combine_elements_add_radgem_image() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        user_id,
        admin_badge_proof,
        radgems,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_mint_radgem(
        user_id.clone(),
        dec!(0.97),
        dec!(0.87),
        dec!(0.37),
        &mut env,
    )?;

    let mut radgem_local_id: Option<NonFungibleLocalId> = None;
    env.with_component_state(refinery, |refinery_state: &mut RefineryState, env| {
        radgem_local_id = refinery_state
            .radgem_vault
            .0
            .non_fungible_local_ids(1, env)
            .unwrap()
            .pop();
    })?;

    // Act
    refinery
        .combine_elements_add_radgem_image(
            user_id.clone(),
            radgem_local_id.clone().unwrap(),
            UncheckedUrl::of("www.new_url.test"),
            &mut env,
        )
        .unwrap();

    // Assert
    let data: RadgemData = ResourceManager(radgems.resource_address(&mut env).unwrap())
        .get_non_fungible_data(radgem_local_id.unwrap(), &mut env)
        .unwrap();

    assert_eq!(data.name, "Radiant Smoke RadGem");
    assert_eq!(data.key_image_url, UncheckedUrl::of("www.new_url.test"));

    Ok(())
}

#[test]
fn can_combine_elements_claim() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        hero_badge_proof,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_mint_radgem(
        user_id.clone(),
        dec!(0.97),
        dec!(0.89),
        dec!(0.93),
        &mut env,
    )?;

    // Act
    let result = refinery.combine_elements_claim(hero_badge_proof, &mut env)?;

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
        hero_badge,
        user_id,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    refinery.combine_elements_mint_radgem(
        user_id.clone(),
        dec!(0.97),
        dec!(0.87),
        dec!(0.43),
        &mut env,
    )?;

    // Act
    let result_1 =
        refinery.combine_elements_claim(hero_badge.create_proof_of_all(&mut env)?, &mut env)?;

    refinery.combine_elements_mint_radgem(
        user_id.clone(),
        dec!(0.16),
        dec!(0.64),
        dec!(0.29),
        &mut env,
    )?;

    let result_2 =
        refinery.combine_elements_claim(hero_badge.create_proof_of_all(&mut env)?, &mut env)?;

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

    let radgem_1_rarity_weight = RARITY
        .iter()
        .position(|&r| r == &radgem_1_data.rarity)
        .unwrap();
    let radgem_2_rarity_weight = RARITY
        .iter()
        .position(|&r| r == &radgem_2_data.rarity)
        .unwrap();

    let (radgem_a_data, radgem_b_data) = if radgem_1_rarity_weight >= radgem_2_rarity_weight {
        (radgem_1_data, radgem_2_data)
    } else {
        (radgem_2_data, radgem_1_data)
    };

    let data = format!(
        "{}{}{}{}",
        morph_card_data.energy_type,
        radgem_a_data.material,
        radgem_a_data.color,
        radgem_b_data.color,
    );

    let key_hash = keccak256_hash(data.as_bytes());
    let value_hash = keccak256_hash(key_image_url.as_str().as_bytes());

    env.disable_auth_module();
    image_oracle.set_key_image_url_hashes(vec![(key_hash, value_hash)], &mut env)?;
    env.enable_auth_module();

    // Act
    let result = refinery.create_radmorph(
        radgems.take(dec!(2), &mut env)?,
        morph_card,
        key_image_url,
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
        "Precious Crystalline Molten Lava RadMorph".to_string(),
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
pub fn cannot_combine_elements_deposit_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut refinery,
        hero_badge_proof,
        super_admin_badge_proof,
        elements,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    refinery.disable(&mut env)?;

    // Act
    let result = refinery.combine_elements_deposit(
        hero_badge_proof,
        elements.take(dec!(10), &mut env)?,
        &mut env,
    );

    // Assert
    println!("{:?}", result);
    assert!(result.is_err());
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

#[test]
pub fn can_disable_morph_card_forge() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radmorph_forge,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radmorph_forge.disable(&mut env)?;

    // Assert
    env.with_component_state(
        radmorph_forge,
        |radmorph_forge_state: &mut RadmorphForgeState, _| {
            assert!(!radmorph_forge_state.enabled);
        },
    )?;

    Ok(())
}
