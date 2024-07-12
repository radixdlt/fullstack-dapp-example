use clam_dex::clam_dex::clam_dex_test::*;
use scrypto_test::prelude::*;

struct Test {
    env: TestEnvironment<InMemorySubstateDatabase>,
    clam_dex: ClamDex,
    clams: Bucket,
    ottercoin_address: ResourceAddress,
}

fn arrange_test_environment(stable_price: bool) -> Result<Test, RuntimeError> {
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

    let ottercoin_address = ResourceBuilder::new_fungible(OwnerRole::None)
        .mint_roles(mint_roles! {
            minter => rule!(require(admin_badge.resource_address(&mut env)?));
            minter_updater => rule!(deny_all);
        })
        .mint_initial_supply(0, &mut env)?
        .resource_address(&mut env)?;

    let clam_dex = ClamDex::new(
        OwnerRole::Fixed(rule!(require(
            super_admin_badge.resource_address(&mut env)?
        ))),
        FAUCET, // Used as a placeholder for the dapp definition
        "ClamDex".to_string(),
        admin_badge.take(dec!(1), &mut env)?,
        clams.resource_address(&mut env)?,
        ottercoin_address,
        stable_price,
        package_address,
        &mut env,
    )?;

    Ok(Test {
        env,
        clam_dex,
        clams,
        ottercoin_address: ottercoin_address,
    })
}

#[test]
fn can_instantiate_clam_dex() -> Result<(), RuntimeError> {
    _ = arrange_test_environment(true)?;
    Ok(())
}

#[test]
fn can_instantiate_unstable_clam_dex() -> Result<(), RuntimeError> {
    _ = arrange_test_environment(false)?;
    Ok(())
}

#[test]
fn can_swap_clams_with_dex() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut clam_dex,
        clams,
        ottercoin_address,
        ..
    } = arrange_test_environment(true)?;

    // Act
    let result = clam_dex.swap(clams, &mut env)?;

    // Assert
    assert_eq!(result.resource_address(&mut env)?, ottercoin_address);

    Ok(())
}

#[test]
fn can_swap_clams_with_unstable_dex() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env,
        mut clam_dex,
        clams,
        ottercoin_address,
        ..
    } = arrange_test_environment(false)?;

    // Act
    let result = clam_dex.swap(clams, &mut env)?;

    // Assert
    assert_eq!(result.resource_address(&mut env)?, ottercoin_address);

    Ok(())
}

#[test]
fn can_get_clam_price() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env, clam_dex, ..
    } = arrange_test_environment(true)?;

    // Act
    let price = clam_dex.get_price(&mut env)?;

    // Assert
    assert_eq!(price, dec!(10));

    Ok(())
}

#[test]
fn can_get_unstable_clam_price() -> Result<(), RuntimeError> {
    // Arrange
    let Test {
        mut env, clam_dex, ..
    } = arrange_test_environment(false)?;

    // Act
    let price = clam_dex.get_price(&mut env)?;

    // Assert
    assert!(price >= dec!(5));

    Ok(())
}

#[test]
fn test_oracle_price_fluctuation() {
    fn fluctuation(t: i32) -> Decimal {
        (dec!(0.258) * (t % 2)) // 0.258
            + (dec!(0.11) * (t % 3)) // 0.22
            + (dec!(0.095) * (t % 5)) // 0.38
            + (dec!(0.022) * (t % 7)) // 0.132
            + (dec!(0.001) * (t % 11)) // 0.01
    }

    for t in 999_999_060..999_999_120 {
        println!("{:?}", fluctuation(t))
    }

    assert_eq!(fluctuation(2 * 3 * 5 * 7 * 11), dec!(0));
    assert_eq!(fluctuation(2 * 3 * 5 * 7 * 11 - 1), dec!(1));
}
