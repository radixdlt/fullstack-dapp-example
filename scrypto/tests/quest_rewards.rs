use radix_engine_interface::prelude::*;
use scrypto::this_package;
use scrypto_test::prelude::*;
use scrypto_unit::*;

use radquest::quest_rewards::test_bindings::*;

#[test]
fn test_quest_rewards() {}

#[test]
fn test_with_test_environment() {
    // Arrange
    let mut env = TestEnvironment::new();
    let package_address = Package::compile_and_publish(this_package!(), &mut env);
}
