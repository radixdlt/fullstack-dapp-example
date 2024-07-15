use scrypto::prelude::Url;
use scrypto_test::prelude::*;

use radquest::morph_card_forge::morph_card_forge_test::*;
use radquest::morph_card_forge::MorphEnergyCardData;
use radquest::quest_rewards::UserId;

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    morph_card_forge: MorphCardForge,
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

    let morph_card_forge = MorphCardForge::new(
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
        morph_card_forge,
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
fn can_mint_morph_card() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge.mint_card(
        UserId("<test_123>".to_string()),
        Url::of("https://www.example.com"),
        "Molten Lava Morph Card {42} Limited".to_string(),
        "Use this limited-edition Morph Energy Card to fuse 2 RadGems using the fiery flow of molten lava! The rare shape defined by this card is rated at a quality level of 42 out of a possible 50.".to_string(),
        "molten lava".to_string(),
        "the fiery flow of molten lava".to_string(),
        "ultra-rare".to_string(),
        dec!(42),
        true,
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
        mut morph_card_forge,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    //Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.disable(&mut env)?;

    //Assert
    env.with_component_state(
        morph_card_forge,
        |card_forge_state: &mut MorphCardForgeState, _| {
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
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.disable(&mut env)?;

    //Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge.mint_card(
        UserId("<test_123>".to_string()),
        Url::of("https://www.example.com"),
        "Molten Lava Morph Card {42} Limited".to_string(),
        "Use this limited-edition Morph Energy Card to fuse 2 RadGems using the fiery flow of molten lava! The rare shape defined by this card is rated at a quality level of 42 out of a possible 50.".to_string(),
        "molten lava".to_string(),
        "the fiery flow of molten lava".to_string(),
        "rare".to_string(),
        dec!(42),
        true,
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
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.disable(&mut env)?;

    //Act
    morph_card_forge.enable(&mut env)?;
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge.mint_card(
        UserId("<test_123>".to_string()),
        Url::of("https://www.example.com"),
        "Molten Lava Morph Card {42} Limited".to_string(),
        "Use this limited-edition Morph Energy Card to fuse 2 RadGems using the fiery flow of molten lava! The rare shape defined by this card is rated at a quality level of 42 out of a possible 50.".to_string(),
        "molten lava".to_string(),
        "the fiery flow of molten lava".to_string(),
        "rare".to_string(),
        dec!(42),
        true,
        &mut env
    );

    //Assert
    assert!(result.is_ok());

    Ok(())
}
