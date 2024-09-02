use scrypto_test::prelude::*;

use ticket_machine::ticket_machine::ticket_machine_test::*;

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    ticket_machine: TicketMachine,
    hero_badge_proof: Proof,
    super_admin_badge_proof: Proof,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let user_id_string = "test_user_id_12345".to_string();

    let hero_badge = ResourceBuilder::new_string_non_fungible(OwnerRole::None)
        .mint_initial_supply(
            [(
                StringNonFungibleLocalId::new(user_id_string.clone()).unwrap(),
                EmptyNonFungibleData {},
            )],
            &mut env,
        )?;

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let ticket_machine = TicketMachine::new(
        super_admin_badge.resource_address(&mut env)?,
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // used as dapp_definition for testing
        dec!(50),
        hero_badge.resource_address(&mut env)?,
        package_address,
        &mut env,
    )?;

    let hero_badge_proof = hero_badge.create_proof_of_all(&mut env)?;
    let super_admin_badge_proof = super_admin_badge.create_proof_of_all(&mut env)?;

    Ok(Test {
        env,
        ticket_machine,
        hero_badge_proof,
        super_admin_badge_proof,
    })
}

#[test]
fn can_instantiate_gift_box_opener() -> Result<(), RuntimeError> {
    let _ = arrange_test_environment()?;

    Ok(())
}

#[test]
fn can_purchase_tickets() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut ticket_machine,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    let xrd = BucketFactory::create_fungible_bucket(XRD, 111.into(), Mock, &mut env)?;

    // Act
    let change = ticket_machine.purchase_tickets(hero_badge_proof, xrd, &mut env)?;

    // Assert
    let xrd_balance = ticket_machine.get_xrd_balance(&mut env)?;
    assert_eq!(xrd_balance, 100.into());
    assert_eq!(change.amount(&mut env)?, 11.into());

    Ok(())
}

#[test]
fn cannot_purchase_tickets_when_disabled() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut ticket_machine,
        hero_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    ticket_machine.disable(&mut env)?;

    let xrd = BucketFactory::create_fungible_bucket(XRD, 111.into(), Mock, &mut env)?;

    // Act
    let result = ticket_machine.purchase_tickets(hero_badge_proof, xrd, &mut env);

    // Assert
    assert!(result
        .err()
        .unwrap()
        .to_string()
        .contains("TicketMachine is disabled"));

    Ok(())
}

#[test]
fn cannot_purchase_tickets_when_not_enough_xrd() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut ticket_machine,
        hero_badge_proof,
        ..
    } = arrange_test_environment()?;

    let xrd = BucketFactory::create_fungible_bucket(XRD, 49.into(), Mock, &mut env)?;

    // Act
    let change = ticket_machine.purchase_tickets(hero_badge_proof, xrd, &mut env)?;

    // Assert
    assert_eq!(change.amount(&mut env)?, 49.into());

    Ok(())
}

#[test]
fn can_withdraw_all_xrd() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut ticket_machine,
        hero_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let xrd = BucketFactory::create_fungible_bucket(XRD, 1111.into(), Mock, &mut env)?;

    let _ = ticket_machine.purchase_tickets(hero_badge_proof, xrd, &mut env)?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    let withdrawn_xrd = ticket_machine.withdraw_all_xrd(&mut env)?;

    // Assert
    assert_eq!(withdrawn_xrd.amount(&mut env)?, 1100.into());

    let xrd_balance = ticket_machine.get_xrd_balance(&mut env)?;
    assert_eq!(xrd_balance, 0.into());

    Ok(())
}

#[test]
fn can_withdraw_xrd_amount() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut ticket_machine,
        hero_badge_proof,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    let xrd = BucketFactory::create_fungible_bucket(XRD, 1111.into(), Mock, &mut env)?;

    let _ = ticket_machine.purchase_tickets(hero_badge_proof, xrd, &mut env)?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    let withdrawn_xrd = ticket_machine.withdraw_xrd_amount(dec!(100), &mut env)?;

    // Assert
    assert_eq!(withdrawn_xrd.amount(&mut env)?, 100.into());

    let xrd_balance = ticket_machine.get_xrd_balance(&mut env)?;
    assert_eq!(xrd_balance, 1000.into());

    Ok(())
}

#[test]
fn can_set_ticket_price() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut ticket_machine,
        super_admin_badge_proof,
        ..
    } = arrange_test_environment()?;

    // Act
    LocalAuthZone::push(super_admin_badge_proof, &mut env)?;
    ticket_machine.set_ticket_price(dec!(100), &mut env)?;

    // Assert
    let ticket_price = ticket_machine.get_ticket_price(&mut env)?;
    assert_eq!(ticket_price, 100.into());

    Ok(())
}
