use clam_dex::clam_dex::clam_dex_test::*;
use scrypto_test::prelude::*;

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    clam_dex: ClamDex,
    clams: Bucket,
    otter_coin_address: ResourceAddress,
}

fn arrange_test_environment() -> Result<Test, RuntimeError> {
    let mut env = TestEnvironment::new();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    let super_admin_badge = ResourceBuilder::new_ruid_non_fungible(OwnerRole::None)
        .mint_initial_supply([()], &mut env)?;

    let admin_badge =
        ResourceBuilder::new_fungible(OwnerRole::None).mint_initial_supply(1, &mut env)?;

    let clams = ResourceBuilder::new_fungible(OwnerRole::None)
        .divisibility(DIVISIBILITY_NONE)
        .mint_initial_supply(100, &mut env)?;

    let otter_coin_address = ResourceBuilder::new_fungible(OwnerRole::None)
        .mint_roles(mint_roles! {
            minter => rule!(require(admin_badge.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        })
        .mint_initial_supply(0, &mut env)?
        .resource_address(&mut env)?;

    let clam_dex = ClamDex::new(
        "Clam Dex Component Name".to_string(),
        "Clam dex component description".to_string(),
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        admin_badge.take(dec!(1), &mut env)?,
        clams.resource_address(&mut env)?,
        otter_coin_address,
        Some(dec!(1)),
        package_address,
        &mut env,
    )?;

    let clams_address = clams.resource_address(&mut env)?;

    Ok(Test {
        env,
        clam_dex,
        clams,
        otter_coin_address,
    })
}

#[test]
fn can_instantiate_clam_dex() -> Result<(), RuntimeError> {
    _ = arrange_test_environment()?;
    Ok(())
}

#[test]
fn can_swap_clams() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut clam_dex,
        clams,
        otter_coin_address,
        ..
    } = arrange_test_environment()?;

    // Act
    let result = clam_dex.swap(clams, &mut env)?;

    // Assert
    assert_eq!(result.resource_address(&mut env)?, otter_coin_address);

    Ok(())
}

#[test]
fn can_get_clam_price() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env, clam_dex, ..
    } = arrange_test_environment()?;

    // Act
    let price = clam_dex.get_price(&mut env)?;

    // Assert
    assert!(price > dec!(0));

    Ok(())
}
