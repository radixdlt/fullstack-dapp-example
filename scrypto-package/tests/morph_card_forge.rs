use radix_engine_interface::prelude::*;
use radquest::morph_card_forge::{
    test_bindings::*, Energy, MorphCardData, MorphCardDataInput, Rarity, UserId,
};
use scrypto::this_package;
use scrypto_test::prelude::*;

struct Test {
    env: TestEnvironment,
    morph_card_forge: MorphCardForge,
    super_admin_badge_proof: Proof,
    admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
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
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
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

    let card_name = "Molten Lava Morph Card".to_owned();

    let morph_card_data = MorphCardDataInput {
        name: card_name.clone(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let morph_card =
        morph_card_forge.mint_fixed_card(card_name, UserId("<test>".to_owned()), &mut env)?;

    assert_eq!(morph_card.amount(&mut env)?, dec!(1));

    Ok(())
}

#[test]
fn cannot_mint_fixed_card_with_wrong_name() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut morph_card_forge,
        super_admin_badge_proof,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let morph_card_data = MorphCardDataInput {
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = morph_card_forge.mint_fixed_card(
        "Wrong Name".to_owned(),
        UserId("<test>".to_owned()),
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
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_fixed_cards(vec![morph_card_data], &mut env)?;

    let card_name = "Molten Lava Morph Card".to_owned();

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
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

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
        name: "Molten Lava Morph Card".to_owned(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    let rand_num = dec!(0.5);

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let morph_card =
        morph_card_forge.mint_random_card(rand_num, UserId("<test>".to_owned()), &mut env)?;

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

    let card_name = "Molten Lava Morph Card".to_owned();

    let morph_card_data = MorphCardDataInput {
        name: card_name.clone(),
        rarity: Rarity::UltraRare,
        energy: Energy::MoltenLava,
    };

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    morph_card_forge.set_random_cards(vec![morph_card_data], &mut env)?;

    morph_card_forge.remove_random_cards(vec![card_name], &mut env)?;

    Ok(())
}
