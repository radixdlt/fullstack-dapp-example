use scrypto_test::prelude::*;

use gift_box_opener_v2::gift_box_opener_v2::{
    gift_box_opener_v2_test::*, GiftBoxCounts, RewardDeposit, UserId,
};

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    gift_box_opener_v2: GiftBoxOpenerV2,
    simple_gift_boxes: Bucket,
    fancy_gift_boxes: Bucket,
    user_id: UserId,
    hero_badge_proof: Proof,
    hero_badge: Bucket,
    admin_badge_proof: Proof,
    admin_badge: Bucket,
    super_admin_badge_proof: Proof,
    rewards: Vec<Bucket>,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let user_id_string = "test_user_id_12345".to_string();

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(2, &mut env)?;
    let simple_gift_boxes = ResourceBuilder::new_fungible(OwnerRole::Fixed(rule!(require(
        admin_badge.resource_address(&mut env)?
    ))))
    .divisibility(DIVISIBILITY_NONE)
    .burn_roles(burn_roles! {
           burner => OWNER;
           burner_updater => rule!(deny_all);
    })
    .mint_initial_supply(2, &mut env)?;
    let fancy_gift_boxes = ResourceBuilder::new_fungible(OwnerRole::Fixed(rule!(require(
        admin_badge.resource_address(&mut env)?
    ))))
    .divisibility(DIVISIBILITY_NONE)
    .burn_roles(burn_roles! {
           burner => OWNER;
           burner_updater => rule!(deny_all);
    })
    .mint_initial_supply(40, &mut env)?;
    let hero_badge = ResourceBuilder::new_string_non_fungible(OwnerRole::None)
        .mint_initial_supply(
            [(
                StringNonFungibleLocalId::new(user_id_string.clone()).unwrap(),
                EmptyNonFungibleData {},
            )],
            &mut env,
        )?;

    let gift_box_opener_v2 = GiftBoxOpenerV2::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        hero_badge.resource_address(&mut env)?,
        admin_badge.take(dec!(1), &mut env)?,
        package_address,
        &mut env,
    )?;

    let hero_badge_proof = hero_badge.create_proof_of_all(&mut env)?;
    let admin_badge_proof = admin_badge.create_proof_of_all(&mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;

    let fungible =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(10, &mut env)?;
    let non_fungible = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;
    let rewards = vec![fungible, non_fungible];

    Ok(Test {
        env,
        gift_box_opener_v2,
        simple_gift_boxes,
        fancy_gift_boxes,
        user_id: UserId(user_id_string),
        hero_badge_proof,
        hero_badge,
        admin_badge_proof,
        admin_badge,
        super_admin_badge_proof,
        rewards,
    })
}

#[test]
fn can_instantiate_gift_box_opener() -> Result<(), RuntimeError> {
    let _ = arrange_test_environment()?;

    Ok(())
}

#[test]
fn can_add_gift_box_resources() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        fancy_gift_boxes,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    let result = gift_box_opener_v2.add_gift_box_resources(
        vec![
            simple_gift_boxes.resource_address(&mut env)?,
            fancy_gift_boxes.resource_address(&mut env)?,
        ],
        &mut env,
    );

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn can_remove_gift_box_resources() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        fancy_gift_boxes,
        admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![
            simple_gift_boxes.resource_address(&mut env)?,
            fancy_gift_boxes.resource_address(&mut env)?,
        ],
        &mut env,
    )?;

    // Act
    let result = gift_box_opener_v2.remove_gift_box_resources(
        vec![
            simple_gift_boxes.resource_address(&mut env)?,
            fancy_gift_boxes.resource_address(&mut env)?,
        ],
        &mut env,
    );

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn can_open_gift_box() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        admin_badge_proof,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;

    // Act
    let result = gift_box_opener_v2.open_gift_boxes(hero_badge_proof, simple_gift_boxes, &mut env);

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn can_deposit_rewards() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        admin_badge_proof,
        hero_badge_proof,
        user_id,
        rewards,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;

    gift_box_opener_v2.open_gift_boxes(hero_badge_proof, simple_gift_boxes, &mut env)?;

    // Act
    let result = gift_box_opener_v2.deposit_gift_box_rewards(
        vec![RewardDeposit {
            user_id,
            gift_box_count: dec!(2),
            rewards,
        }],
        &mut env,
    );

    // Assert
    println!("{:?}", result);
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn can_claim_rewards() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        admin_badge_proof,
        hero_badge,
        user_id,
        rewards,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;
    gift_box_opener_v2.open_gift_boxes(
        hero_badge.create_proof_of_all(&mut env)?,
        simple_gift_boxes,
        &mut env,
    )?;
    gift_box_opener_v2.deposit_gift_box_rewards(
        vec![RewardDeposit {
            user_id,
            gift_box_count: dec!(2),
            rewards,
        }],
        &mut env,
    )?;

    // Act
    let result = gift_box_opener_v2.claim_gift_box_rewards(
        hero_badge.create_proof_of_all(&mut env)?,
        10,
        &mut env,
    );

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn cannot_claim_rewards_twice() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        admin_badge_proof,
        hero_badge,
        user_id,
        rewards,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;
    gift_box_opener_v2.open_gift_boxes(
        hero_badge.create_proof_of_all(&mut env)?,
        simple_gift_boxes,
        &mut env,
    )?;
    gift_box_opener_v2.deposit_gift_box_rewards(
        vec![RewardDeposit {
            user_id,
            gift_box_count: dec!(2),
            rewards,
        }],
        &mut env,
    )?;
    gift_box_opener_v2.claim_gift_box_rewards(
        hero_badge.create_proof_of_all(&mut env)?,
        10,
        &mut env,
    )?;

    // Act
    let result = gift_box_opener_v2.claim_gift_box_rewards(
        hero_badge.create_proof_of_all(&mut env)?,
        10,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("No rewards to claim"));
    Ok(())
}

#[test]
fn can_disable_gift_box_opener() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;

    // Act
    let result = gift_box_opener_v2.disable(&mut env);

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn cannot_open_gift_box_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        admin_badge_proof,
        super_admin_badge_proof,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    gift_box_opener_v2.disable(&mut env)?;

    // Act
    let result = gift_box_opener_v2.open_gift_boxes(hero_badge_proof, simple_gift_boxes, &mut env);

    // Assert
    assert!(result.is_err());
    Ok(())
}

#[test]
fn can_enable_disabled_gift_box_opener_and_deposit() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        super_admin_badge_proof,
        admin_badge_proof,
        hero_badge_proof,
        simple_gift_boxes,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    gift_box_opener_v2.disable(&mut env)?;

    // Act
    gift_box_opener_v2.enable(&mut env)?;
    let result = gift_box_opener_v2.open_gift_boxes(hero_badge_proof, simple_gift_boxes, &mut env);

    // Assert
    println!("{:?}", result);
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn cannot_open_more_that_max_number_of_gift_boxes() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        admin_badge,
        hero_badge,
        simple_gift_boxes,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge.create_proof_of_all(&mut env)?, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;

    let gift_boxes = BucketFactory::create_fungible_bucket(
        simple_gift_boxes.resource_address(&mut env)?,
        31.into(),
        CreationStrategy::Mock,
        &mut env,
    )?;

    gift_box_opener_v2.open_gift_boxes(
        hero_badge.create_proof_of_all(&mut env)?,
        gift_boxes.take(dec!(30), &mut env)?,
        &mut env,
    )?;

    // Act
    let result = gift_box_opener_v2.open_gift_boxes(
        hero_badge.create_proof_of_all(&mut env)?,
        gift_boxes,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("User has reached the max count of opened but unclaimed gift boxes"));

    Ok(())
}

#[test]
fn cannot_deposit_more_that_max_number_of_rewards() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        admin_badge,
        user_id,
        hero_badge_proof,
        simple_gift_boxes,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge.create_proof_of_all(&mut env)?, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;

    gift_box_opener_v2.open_gift_boxes(hero_badge_proof, simple_gift_boxes, &mut env)?;

    for _ in 0..30 {
        let rewards =
            vec![ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(10, &mut env)?];

        gift_box_opener_v2.deposit_gift_box_rewards(
            vec![RewardDeposit {
                user_id: user_id.clone(),
                gift_box_count: dec!(1),
                rewards,
            }],
            &mut env,
        )?;
    }

    let rewards = vec![ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?];
    LocalAuthZone::push(admin_badge.create_proof_of_all(&mut env)?, &mut env)?;

    // Act
    let result = gift_box_opener_v2.deposit_gift_box_rewards(
        vec![RewardDeposit {
            user_id,
            gift_box_count: dec!(1),
            rewards,
        }],
        &mut env,
    );

    // Assert
    println!("{:?}", result);
    assert!(result.is_err());
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("User has reached the maximum number of rewards records"));

    Ok(())
}

#[test]
fn cannot_open_when_deposited_the_max_number_of_rewards() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        admin_badge,
        user_id,
        hero_badge,
        hero_badge_proof,
        simple_gift_boxes,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge.create_proof_of_all(&mut env)?, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;

    gift_box_opener_v2.open_gift_boxes(
        hero_badge_proof,
        simple_gift_boxes.take(dec!(1), &mut env)?,
        &mut env,
    )?;

    for _ in 0..30 {
        let rewards =
            vec![ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(10, &mut env)?];

        gift_box_opener_v2.deposit_gift_box_rewards(
            vec![RewardDeposit {
                user_id: user_id.clone(),
                gift_box_count: dec!(1),
                rewards,
            }],
            &mut env,
        )?;
    }

    // Act
    let result = gift_box_opener_v2.open_gift_boxes(
        hero_badge.create_proof_of_all(&mut env)?,
        simple_gift_boxes,
        &mut env,
    );

    // Assert
    assert!(result.is_err());
    assert!(result
        .unwrap_err()
        .to_string()
        .contains("User has reached the maximum number of rewards records"));

    Ok(())
}

#[test]
fn can_open_gift_box_after_claiming_rewards_at_max() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        admin_badge,
        user_id,
        hero_badge,
        fancy_gift_boxes,
        rewards,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge.create_proof_of_all(&mut env)?, &mut env)?;
    gift_box_opener_v2
        .add_gift_box_resources(vec![fancy_gift_boxes.resource_address(&mut env)?], &mut env)?;

    for _ in 0..30 {
        let reward =
            vec![ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(10, &mut env)?];

        gift_box_opener_v2.open_gift_boxes(
            hero_badge.create_proof_of_all(&mut env)?,
            fancy_gift_boxes.take(dec!(1), &mut env)?,
            &mut env,
        )?;

        gift_box_opener_v2.deposit_gift_box_rewards(
            vec![RewardDeposit {
                user_id: user_id.clone(),
                gift_box_count: dec!(1),
                rewards: reward,
            }],
            &mut env,
        )?;
    }

    gift_box_opener_v2.claim_gift_box_rewards(
        hero_badge.create_proof_of_all(&mut env)?,
        10,
        &mut env,
    )?;

    // Act
    let result_1 = gift_box_opener_v2.open_gift_boxes(
        hero_badge.create_proof_of_all(&mut env)?,
        fancy_gift_boxes,
        &mut env,
    );
    gift_box_opener_v2.deposit_gift_box_rewards(
        vec![RewardDeposit {
            user_id: user_id.clone(),
            gift_box_count: dec!(1),
            rewards,
        }],
        &mut env,
    )?;
    let result_2 = gift_box_opener_v2.claim_gift_box_rewards(
        hero_badge.create_proof_of_all(&mut env)?,
        30,
        &mut env,
    );

    // Assert
    println!("{:?}", result_1);
    println!("{:?}", result_2);
    assert!(result_1.is_ok());
    assert!(result_2.is_ok());
    Ok(())
}

#[test]
fn can_get_user_reward_records() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        admin_badge_proof,
        hero_badge_proof,
        user_id,
        rewards,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;
    gift_box_opener_v2.open_gift_boxes(hero_badge_proof, simple_gift_boxes, &mut env)?;
    gift_box_opener_v2.deposit_gift_box_rewards(
        vec![RewardDeposit {
            user_id: user_id.clone(),
            gift_box_count: dec!(2),
            rewards,
        }],
        &mut env,
    )?;

    // Act
    let result = gift_box_opener_v2.get_user_reward_records(user_id, &mut env);

    // Assert
    assert!(result.is_ok());
    Ok(())
}

#[test]
fn can_get_user_gift_box_counts() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut gift_box_opener_v2,
        simple_gift_boxes,
        admin_badge_proof,
        hero_badge,
        user_id,
        rewards,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(admin_badge_proof, &mut env)?;
    gift_box_opener_v2.add_gift_box_resources(
        vec![simple_gift_boxes.resource_address(&mut env)?],
        &mut env,
    )?;
    gift_box_opener_v2.open_gift_boxes(
        hero_badge.create_proof_of_all(&mut env)?,
        simple_gift_boxes,
        &mut env,
    )?;
    gift_box_opener_v2.deposit_gift_box_rewards(
        vec![RewardDeposit {
            user_id: user_id.clone(),
            gift_box_count: dec!(2),
            rewards,
        }],
        &mut env,
    )?;
    gift_box_opener_v2.claim_gift_box_rewards(
        hero_badge.create_proof_of_all(&mut env)?,
        10,
        &mut env,
    )?;

    // Act
    let result = gift_box_opener_v2.get_user_gift_box_counts(user_id, &mut env);

    // Assert
    assert!(result.is_ok());
    assert_eq!(
        result.unwrap(),
        GiftBoxCounts {
            opened: dec!(2),
            deposited_rewards: dec!(2),
            claimed_rewards: dec!(2),
            recalled_rewards: dec!(0)
        }
    );
    Ok(())
}

#[test]
fn test_open_deposit_and_claim_in_batch() -> Result<(), RuntimeError> {
    let Test {
        mut env,
        mut gift_box_opener_v2,
        fancy_gift_boxes,
        admin_badge_proof,
        hero_badge_proof,
        user_id,
        rewards,
        ..
    } = arrange_test_environment()?;

    let fancy_gift_boxes1 = fancy_gift_boxes.take(dec!(1), &mut env)?;
    let fancy_gift_boxes2 = fancy_gift_boxes.take(dec!(2), &mut env)?;
    let fancy_gift_boxes3 = fancy_gift_boxes.take(dec!(3), &mut env)?;
    let fancy_gift_boxes4 = fancy_gift_boxes.take(dec!(4), &mut env)?;

    // Add gift box resource manager
    LocalAuthZone::push(admin_badge_proof.clone(&mut env)?, &mut env)?;
    gift_box_opener_v2
        .add_gift_box_resources(vec![fancy_gift_boxes.resource_address(&mut env)?], &mut env)?;
    LocalAuthZone::pop(&mut env)?.unwrap().drop(&mut env)?;

    // User tries to open 6 gift boxes
    gift_box_opener_v2.open_gift_boxes(
        hero_badge_proof.clone(&mut env)?,
        fancy_gift_boxes1,
        &mut env,
    )?;
    gift_box_opener_v2.open_gift_boxes(
        hero_badge_proof.clone(&mut env)?,
        fancy_gift_boxes2,
        &mut env,
    )?;
    gift_box_opener_v2.open_gift_boxes(
        hero_badge_proof.clone(&mut env)?,
        fancy_gift_boxes3,
        &mut env,
    )?;

    // Backend tries to deposit rewards in batch of size 2
    LocalAuthZone::push(admin_badge_proof.clone(&mut env)?, &mut env)?;
    let rewards2 = vec![rewards[0].take(dec!(3), &mut env)?];
    gift_box_opener_v2.deposit_gift_box_rewards(
        vec![
            RewardDeposit {
                user_id: user_id.clone(),
                gift_box_count: dec!(1),
                rewards,
            },
            RewardDeposit {
                user_id: user_id.clone(),
                gift_box_count: dec!(2),
                rewards: rewards2,
            },
        ],
        &mut env,
    )?;
    LocalAuthZone::pop(&mut env)?.unwrap().drop(&mut env)?;

    // Backend recalls 1 reward
    LocalAuthZone::push(admin_badge_proof.clone(&mut env)?, &mut env)?;
    gift_box_opener_v2.retract_gift_box_rewards(vec![user_id.clone()], 1, &mut env)?;
    LocalAuthZone::pop(&mut env)?.unwrap().drop(&mut env)?;

    // User claim in batch of size 2
    gift_box_opener_v2.claim_gift_box_rewards(hero_badge_proof.clone(&mut env)?, 2, &mut env)?;

    // Open the gift boxes in the 4th bucket
    gift_box_opener_v2.open_gift_boxes(
        hero_badge_proof.clone(&mut env)?,
        fancy_gift_boxes4,
        &mut env,
    )?;

    let counts = gift_box_opener_v2.get_user_gift_box_counts(user_id, &mut env)?;
    assert_eq!(counts.opened, dec!(10));
    assert_eq!(counts.deposited_rewards, dec!(3));
    assert_eq!(counts.claimed_rewards, dec!(1));
    assert_eq!(counts.recalled_rewards, dec!(2));

    // Further claim should fail
    gift_box_opener_v2
        .claim_gift_box_rewards(hero_badge_proof.clone(&mut env)?, 1, &mut env)
        .expect_err("There should be nothing to claim");

    Ok(())
}
