use scrypto_test::prelude::*;

use radquest::radmorph_forge::{radmorph_forge_test::*, RadmorphData, MorphEnergyCardData, RadgemData};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    radmorph_forge: RadmorphForge,
    radmorph_address: ResourceAddress,
    card_data: MorphEnergyCardData,
    radgems_data: Vec<RadgemData>,
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
    let radmorph = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_roles(mint_roles!(
            minter => rule!(require(admin_badge.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        ))
        .mint_initial_supply([
            RadmorphData{
                key_image_url: UncheckedUrl::of(""),
                name: "".to_string(),
                description: "".to_string(),
                quality: dec!(0),
                material: "".to_string(),
                card_type: "".to_string(),
                card_rarity: "".to_string(),
                card_quality: dec!(0),
                card_limited_edition: false,
                radgem_1_color: "".to_string(),
                radgem_1_material: "".to_string(),
                radgem_1_rarity: "".to_string(),
                radgem_1_quality: dec!(0),
                radgem_2_color: "".to_string(),
                radgem_2_material: "".to_string(),
                radgem_2_rarity: "".to_string(),
                radgem_2_quality: dec!(0),
            }
        ],&mut env)?;
    let card_data = 
        MorphEnergyCardData {
            key_image_url: UncheckedUrl("".to_string()),
            name: "Molten Lava Morph Energy Card {42} Limited".to_string(),
            description: "".to_string(),
            quality: dec!(42),
            energy_type: "molten lava".to_string(),
            energy_description: "the fiery flow of molten lava".to_string(),
            rarity: "ultra-rare".to_string(),
            limited_edition: true,
        };
    let radgems_data = 
            vec![
            RadgemData {
                key_image_url: UncheckedUrl("".to_string()),
                name: "Metallic Smoke Radgem {10/25}".to_string(),
                description: "The Rare Metallic material of this Smoke Radgem is graded at a quality of 10 out of a possible 25.".to_string(),
                material: "metallic".to_string(), 
                color: "smoke".to_string(),            
                rarity: "rare".to_string(),
                quality: dec!(10),
            },
            RadgemData {
                key_image_url: UncheckedUrl("".to_string()),
                name: "Crystalline Blood Radgem {5/25}".to_string(),
                description: "The Common Crystalline material of this Blood Radgem is graded at a quality of 5 out of a possible 25.".to_string(),
                material: "crystalline".to_string(), // crystalline,
                color: "blood".to_string(),
                rarity: "common".to_string(),
                quality: dec!(5),
            },
        ];

    let radmorph_address = radmorph
        .resource_address(&mut env)?;
    let admin_badge_proof = admin_badge.create_proof_of_amount(dec!(1), &mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;

    let radmorph_forge = RadmorphForge::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        admin_badge.take(dec!(1), &mut env)?,
        radmorph_address,
        package_address,
        &mut env,
    )?;

    Ok(Test {
        env,
        radmorph_forge,
        radmorph_address,
        card_data,
        radgems_data,
        admin_badge_proof,
        super_admin_badge_proof,
    })
}

#[test]
fn instantiate_radmorph_forge() -> Result<(), RuntimeError> {
    // Arrange & Act
    let Test {
        mut env,
        radmorph_forge,
        ..
    } = arrange_test_environment()?;

    // Assert
    env.with_component_state(
        radmorph_forge,
        |radmorph_forge_state: &mut RadmorphForgeState, env| {
            let amount = radmorph_forge_state.admin_badge.0.amount(env).unwrap();
            assert_eq!(amount, dec!(1));
        },
    )?;

    Ok(())
}

#[test]
fn can_mint_radmorph() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radmorph_forge,
        card_data,
        mut radgems_data,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;

    // Act
    let radmorph = radmorph_forge.mint_radmorph(
        UncheckedUrl::of("https://www.example.url"),
        card_data,
        radgems_data.pop().unwrap(),
        radgems_data.pop().unwrap(),
        &mut env,
    )?;

    // Assert
    assert_eq!(radmorph.amount(&mut env)?, dec!(1));

    Ok(())
}

#[test]
fn can_mint_radmorph_with_correct_data() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radmorph_forge,
        card_data,
        mut radgems_data,
        admin_badge_proof,
        radmorph_address,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;

    // Act
    let radmorph = radmorph_forge.mint_radmorph(
        UncheckedUrl::of("https://www.example.url"),
        card_data,
        radgems_data.pop().unwrap(),
        radgems_data.pop().unwrap(),
        &mut env,
    )?;

    // Assert
    let radmorph_id = radmorph.non_fungible_local_ids(&mut env)?.pop().unwrap();
    let radmorph_data: RadmorphData =
        ResourceManager(radmorph_address).get_non_fungible_data(radmorph_id, &mut env)?;

    assert_eq!(radmorph_data,
        RadmorphData {
            key_image_url: UncheckedUrl::of("https://www.example.url"),
            name: "Excellent Metallic Blood and Smoke Molten Lava RadMorph {57} Limited".to_string(),
            description: "A Crystalline Blood RadGem and Metallic Smoke RadGem were fused in the fiery flow of molten lava to produce this Metallic Molten Lava RadMorph. Its overall quality is rated as Excellent – 57 out of a possible 100.".to_string(),
            quality: dec!(57),
            material: "metallic".to_string(),
            card_type: "molten lava".to_string(),
            card_rarity: "ultra-rare".to_string(),
            card_quality: dec!(42),
            card_limited_edition: true,
            radgem_1_color: "blood".to_string(),
            radgem_1_material: "crystalline".to_string(),
            radgem_1_rarity: "common".to_string(),
            radgem_1_quality: dec!(5),
            radgem_2_color: "smoke".to_string(),
            radgem_2_material: "metallic".to_string(),
            radgem_2_rarity: "rare".to_string(),
            radgem_2_quality: dec!(10),
        }
    );

    Ok(())
}

#[test]
fn cannot_mint_radmorph_without_admin_badge() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radmorph_forge,
        card_data,
        mut radgems_data,
        ..
    } = arrange_test_environment()?;

     // Act
     let result = radmorph_forge.mint_radmorph(
      UncheckedUrl::of("https://www.example.url"),
      card_data,
      radgems_data.pop().unwrap(),
      radgems_data.pop().unwrap(),
      &mut env,
    );

    // Assert
    assert!(result.is_err());

    Ok(())
}

#[test]
pub fn can_disable_radmorph_forge() -> Result<(), RuntimeError> {
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

#[test]
pub fn cannot_mint_radmorphs_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radmorph_forge,
        card_data,
        mut radgems_data,
        admin_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radmorph_forge.disable(&mut env)?;

    // Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = radmorph_forge.mint_radmorph(
      UncheckedUrl::of("https://www.example.url"),
      card_data,
      radgems_data.pop().unwrap(),
      radgems_data.pop().unwrap(),
      &mut env,
    );

    // Assert
    println!("{:?}", result);
    assert!(result.is_err());

    Ok(())
}

#[test]
pub fn can_enable_then_mint_radmorphs_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut radmorph_forge,
        card_data,
        mut radgems_data,
        admin_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    radmorph_forge.disable(&mut env)?;

    // Act
    radmorph_forge.enable(&mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = radmorph_forge.mint_radmorph(
      UncheckedUrl::of("https://www.example.url"),
      card_data,
      radgems_data.pop().unwrap(),
      radgems_data.pop().unwrap(),
      &mut env,
    );

    // Assert
    println!("{:?}", result);
    assert!(result.is_ok());

    Ok(())
}
