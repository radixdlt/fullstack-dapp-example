use radix_engine_interface::prelude::*;
use radquest::morph_card_forge::{
    test_bindings::*, Energy, MorphCardData, MorphCardDataInput, Rarity,
};
use scrypto::this_package;
use scrypto_test::prelude::*;

fn arrange_test_environment(
) -> Result<(TestEnvironment, MorphCardForge, Bucket, Bucket, Bucket), RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env)?;

    let owner_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let super_admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(1, &mut env)?;
    let admin_badges =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(2, &mut env)?;

    let morph_card = ResourceBuilder::new_ruid_non_fungible::<MorphCardData>(OwnerRole::None)
        .mint_roles(mint_roles! {
            minter => rule!(require(admin_badges.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        })
        .mint_initial_supply([], &mut env)?;

    let morph_card_forge = MorphCardForge::new(
        OwnerRole::Fixed(rule!(require(owner_badge.resource_address(&mut env)?))),
        super_admin_badge.resource_address(&mut env)?,
        admin_badges.take(1.into(), &mut env)?,
        morph_card.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    Ok((
        env,
        morph_card_forge,
        owner_badge,
        super_admin_badge,
        admin_badges,
    ))
}

#[test]
fn can_instantiate_morph_card_forge() -> Result<(), RuntimeError> {
    let _ = arrange_test_environment()?;

    Ok(())
}

#[test]
fn can_set_morph_energy_cards() -> Result<(), RuntimeError> {
    let (mut env, mut morph_card_forge, _owner_badge, _super_admin_badge, _admin_badges) =
        arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    env.disable_auth_module();
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    Ok(())
}

#[test]
fn can_mint_morph_energy_card() -> Result<(), RuntimeError> {
    let (mut env, mut morph_card_forge, _owner_badge, _super_admin_badge, _admin_badges) =
        arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    env.disable_auth_module();
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    let card_id = "Molten Lava Morph Card".to_owned();

    let morph_card = morph_card_forge.mint_fixed_card(card_id, None, &mut env)?;

    assert_eq!(morph_card.amount(&mut env)?, dec!(1));

    Ok(())
}

#[test]
fn can_remove_morph_energy_cards() -> Result<(), RuntimeError> {
    let (mut env, mut morph_card_forge, _owner_badge, _super_admin_badge, _admin_badges) =
        arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    env.disable_auth_module();
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    let card_id = "Molten Lava Morph Card".to_owned();

    morph_card_forge.remove_fixed_cards(vec![card_id], &mut env)?;

    Ok(())
}

#[test]
fn can_set_random_morph_energy_cards() -> Result<(), RuntimeError> {
    let (mut env, mut morph_card_forge, _owner_badge, _super_admin_badge, _admin_badges) =
        arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    env.disable_auth_module();
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    Ok(())
}

#[test]
fn can_mint_random_morph_energy_card() -> Result<(), RuntimeError> {
    let (mut env, mut morph_card_forge, _owner_badge, _super_admin_badge, _admin_badges) =
        arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    env.disable_auth_module();
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    let rand_num = dec!(0.5);

    let morph_card = morph_card_forge.mint_random_card(rand_num, None, &mut env)?;

    assert_eq!(morph_card.amount(&mut env)?, dec!(1));

    Ok(())
}

#[test]
fn can_remove_random_morph_energy_cards() -> Result<(), RuntimeError> {
    let (mut env, mut morph_card_forge, _owner_badge, _super_admin_badge, _admin_badges) =
        arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    env.disable_auth_module();
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    let card_id = "Molten Lava Morph Card".to_owned();

    morph_card_forge.remove_random_cards(vec![card_id], &mut env)?;

    Ok(())
}
