use scrypto_test::prelude::*;

use radquest::morph_card_forge::morph_card_forge_test::*;
use radquest::morph_card_forge::{MorphCardData, MorphCardDataInput};
use radquest::quest_rewards::UserId;
use radquest::refinery::RARITY;

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

    let morph_card = ResourceBuilder::new_ruid_non_fungible::<MorphCardData>(OwnerRole::None)
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
fn can_set_fixed_cards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: "Molten Lava Morph Card".to_string(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    Ok(())
}

#[test]
fn can_mint_fixed_card() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let card_name = "Molten Lava Morph Card".to_string();

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: card_name.clone(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let morph_card =
        morph_card_forge.mint_fixed_card(card_name, UserId("<test>".to_string()), &mut env)?;

    assert_eq!(morph_card.amount(&mut env)?, dec!(1));

    Ok(())
}

#[test]
fn cant_mint_fixed_card_with_wrong_name() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: "Molten Lava Morph Card".to_string(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge.mint_fixed_card(
        "Wrong Name".to_string(),
        UserId("<test>".to_string()),
        &mut env,
    );

    assert!(result.is_err());

    Ok(())
}

#[test]
fn can_remove_fixed_cards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: "Molten Lava Morph Card".to_string(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    let card_name = "Molten Lava Morph Card".to_string();

    morph_card_forge.remove_fixed_cards(vec![card_name], &mut env)?;

    Ok(())
}

#[test]
fn can_set_random_cards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: "Molten Lava Morph Card".to_string(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };

    let rarity = morph_card_data.rarity.clone();

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    env.with_component_state(
        morph_card_forge,
        |card_forge_state: &mut MorphCardForgeState, _| {
            assert_eq!(card_forge_state.random_card_names[&rarity].len(), 1);
        },
    )?;
    Ok(())
}

#[test]
fn can_mint_random_card() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: "Molten Lava Morph Card".to_string(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    let rand_num = dec!(0.9); // Random value must be in right range for rarity

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let morph_card =
        morph_card_forge.mint_random_card(rand_num, UserId("<test>".to_string()), &mut env)?;

    assert_eq!(morph_card.amount(&mut env)?, dec!(1));

    Ok(())
}

#[test]
fn can_remove_random_cards() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let card_name = "Molten Lava Morph Card".to_string();

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: card_name.clone(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };

    let rarity = morph_card_data.rarity.clone();

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    morph_card_forge.remove_random_cards(vec![card_name], &mut env)?;

    env.with_component_state(
        morph_card_forge,
        |card_forge_state: &mut MorphCardForgeState, _| {
            assert_eq!(card_forge_state.random_card_names[&rarity].len(), 0);
        },
    )?;
    Ok(())
}

#[test]
fn can_update_card_key_image() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let card_name = "Molten Lava Morph Card".to_string();

    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("".to_string()),
        name: card_name.clone(),
        rarity: RARITY[0].to_string(), // Common
        energy: "Molten Lava".to_string(),
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let morph_card =
        morph_card_forge.mint_fixed_card(card_name, UserId("<test>".to_string()), &mut env)?;
    let admin_badge_proof = LocalAuthZone::pop(&mut env)?.unwrap();

    let key_image_url = UncheckedUrl("https://www.example.com".to_string());
    let morph_card_id = morph_card.non_fungible_local_ids(&mut env)?.pop().unwrap();

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    morph_card_forge.update_key_image_url(
        morph_card_id.clone(),
        key_image_url.clone(),
        &mut env,
    )?;

    let morph_card_data: MorphCardData = ResourceManager(morph_card.resource_address(&mut env)?)
        .get_non_fungible_data(morph_card_id, &mut env)?;
    assert_eq!(morph_card_data.key_image_url, key_image_url);

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
pub fn cannot_mint_random_card_when_disabled() -> Result<(), RuntimeError> {
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
    let rand_num = dec!(0.9);
    let result =
        morph_card_forge.mint_random_card(rand_num, UserId("<test>".to_string()), &mut env);

    //Assert
    println!("{:?}", result);
    assert!(result.is_err());

    Ok(())
}

#[test]
pub fn cannot_mint_fixed_card_when_disabled() -> Result<(), RuntimeError> {
    //Arrange
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    let morph_card_data = MorphCardDataInput {
        key_image_url: UncheckedUrl("https://www.example.com".to_string()),
        name: "Molten Lava Morph Card".to_string(),
        rarity: RARITY[2].to_string(), // Rare
        energy: "Molten Lava".to_string(),
    };
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;
    morph_card_forge.disable(&mut env)?;

    //Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge.mint_fixed_card(
        "Molten Lava Morph Card".to_string(),
        UserId("<test>".to_string()),
        &mut env,
    );

    //Assert
    println!("{:?}", result);
    assert!(result.is_err());

    Ok(())
}
