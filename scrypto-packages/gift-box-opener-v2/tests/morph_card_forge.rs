use scrypto::prelude::Url;
use scrypto_test::prelude::*;

use gift_box_opener_v2::morph_card_forge_v2::morph_card_forge_v2_test::*;
use gift_box_opener_v2::morph_card_forge_v2::{MorphEnergyCardData, UserId};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    morph_card_forge_v2: MorphCardForgeV2,
    super_admin_badge_proof: Proof,
    admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let super_admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(1, &mut env)?;
    let admin_badges =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(2, &mut env)?;

    let morph_card = ResourceBuilder::new_ruid_non_fungible::<MorphEnergyCardData>(OwnerRole::None)
        .mint_roles(mint_roles! {
            minter => rule!(require(admin_badges.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        })
        .non_fungible_data_update_roles(non_fungible_data_update_roles! {
            non_fungible_data_updater => rule!(require(admin_badges.resource_address(&mut env)?));
            non_fungible_data_updater_updater => rule!(deny_all);
        })
        .mint_initial_supply([], &mut env)?;

    let morph_card_forge_v2 = MorphCardForgeV2::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        admin_badges.take(1.into(), &mut env)?,
        morph_card.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;
    let admin_badge_proof = admin_badges.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        morph_card_forge_v2,
        super_admin_badge_proof,
        admin_badge_proof,
    })
}

#[test]
fn can_instantiate_morph_card_forge() -> Result<(), RuntimeError> {
    let _ = arrange_test_environment()?;

    Ok(())
}

#[test]
fn can_mint_morph_cards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge_v2,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge_v2.mint_cards(
        vec![(
            UserId("<test_123>".to_string()),
            MorphEnergyCardData {
                key_image_url: Url::of("https://www.example.com"),
                name: "Molten Lava Morph Card {42} Limited".to_string(),
                description: "Use this limited-edition Morph Energy Card to fuse 2 RadGems using the fiery flow of molten lava! The rare shape defined by this card is rated at a quality level of 42 out of a possible 50.".to_string(),
                energy_type:"molten lava".to_string(),
                energy_description:"the fiery flow of molten lava".to_string(),
                rarity: "ultra-rare".to_string(),
                quality: dec!(42),
                limited_edition: true
            } 
        ),
        (
            UserId("<test_456>".to_string()),
            MorphEnergyCardData {
                key_image_url: Url::of("https://www.example.com"),
                name: "Molten Lava Morph Card {37} Limited".to_string(),
                description: "Use this limited-edition Morph Energy Card to fuse 2 RadGems using the fiery flow of molten lava! The rare shape defined by this card is rated at a quality level of 37 out of a possible 50.".to_string(),
                energy_type:"molten lava".to_string(),
                energy_description:"the fiery flow of molten lava".to_string(),
                rarity: "rare".to_string(),
                quality: dec!(37),
                limited_edition: true
            } 
        )],
        &mut env
    );

    assert!(result.is_ok());
    Ok(())
}

#[test]
pub fn can_disable_morph_card_forge() -> Result<(), RuntimeError> {
    //Arrange
    let Test {
        mut env,
        mut morph_card_forge_v2,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    //Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge_v2.disable(&mut env)?;

    //Assert
    env.with_component_state(
        morph_card_forge_v2,
        |card_forge_state: &mut MorphCardForgeV2State, _| {
            assert!(!card_forge_state.enabled);
        },
    )?;

    Ok(())
}

#[test]
pub fn cannot_mint_card_when_disabled() -> Result<(), RuntimeError> {
    //Arrange
    let Test {
        mut env,
        mut morph_card_forge_v2,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge_v2.disable(&mut env)?;

    //Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge_v2.mint_cards(
        vec![(
            UserId("<test_123>".to_string()),
            MorphEnergyCardData {
                key_image_url: Url::of("https://www.example.com"),
                name: "Molten Lava Morph Card {42} Limited".to_string(),
                description: "Use this limited-edition Morph Energy Card to fuse 2 RadGems using the fiery flow of molten lava! The rare shape defined by this card is rated at a quality level of 42 out of a possible 50.".to_string(),
                energy_type: "molten lava".to_string(),
                energy_description: "the fiery flow of molten lava".to_string(),
                rarity: "rare".to_string(),
                quality: dec!(42),
                limited_edition: true,
            }
        )],
        &mut env
    );

    //Assert
    assert!(result.is_err());
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("MorphCard component disabled"));

    Ok(())
}

#[test]
pub fn can_enable_then_mint_card_when_disabled() -> Result<(), RuntimeError> {
    //Arrange
    let Test {
        mut env,
        mut morph_card_forge_v2,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge_v2.disable(&mut env)?;

    //Act
    morph_card_forge_v2.enable(&mut env)?;
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge_v2.mint_cards(
        vec![(
            UserId("<test_123>".to_string()),
            MorphEnergyCardData {
                key_image_url: Url::of("https://www.example.com"),
                name: "Molten Lava Morph Card {42} Limited".to_string(),
                description: "Use this limited-edition Morph Energy Card to fuse 2 RadGems using the fiery flow of molten lava! The rare shape defined by this card is rated at a quality level of 42 out of a possible 50.".to_string(),
                energy_type: "molten lava".to_string(),
                energy_description: "the fiery flow of molten lava".to_string(),
                rarity: "rare".to_string(),
                quality: dec!(42),
                limited_edition: true,
            }
        )],
        &mut env
    );

    //Assert
    assert!(result.is_ok());

    Ok(())
}
