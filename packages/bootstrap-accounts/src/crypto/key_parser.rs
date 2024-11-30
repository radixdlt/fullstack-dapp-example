use scrypto::prelude::*;
use radix_transactions::signing::*;

const SECP256K1_PREFIX: &str = "secp256k1";
const ED25519_PREFIX: &str = "ed25519";

/// Allows for parsing of private keys from strings.
///
/// This function allows for private keys to be parsed from a string that contains a private
/// key curve type prefix, followed by a colon, and then the private key hex. This is useful
/// since there is no way to tell curve the private key is meant for from the raw hex alone
/// which makes the prefix necessary.
///
/// The following are some example strings that can be parsed by this function.
///
/// * `secp256k1:972d4abfd9b447e1a45037f0c84d04c15ee93d430cdf1dd341ed51cc6973f63f`
/// * `ed25519:972d4abfd9b447e1a45037f0c84d04c15ee93d430cdf1dd341ed51cc6973f63f`
pub fn parse_private_key(
    string: &str,
) -> Result<PrivateKey, PrivateKeyParseError> {
    // Split the string at the `:`
    let mut splitted_string = string.split(':');

    // Extract the prefix and the private key hex from the splitted string.
    let prefix = splitted_string
        .next()
        .ok_or(PrivateKeyParseError::NoPrefix)?;
    let hex = splitted_string
        .next()
        .ok_or(PrivateKeyParseError::NoPrivateKeyHex)?;

    // Ensure that there are no more parts in the splitted string
    if splitted_string.next().is_some() {
        return Err(PrivateKeyParseError::UnexpectedCharacters);
    }

    // Based on the prefix parse the private key differently.
    let private_key_bytes = hex::decode(&hex)
        .map_err(|_| PrivateKeyParseError::InvalidPrivateKeyHex)?;
    match prefix {
        SECP256K1_PREFIX => {
            Secp256k1PrivateKey::from_bytes(private_key_bytes.as_slice())
                .map_err(|_| PrivateKeyParseError::InvalidPrivateKeyHex)
                .map(PrivateKey::Secp256k1)
        }

        ED25519_PREFIX => {
            Ed25519PrivateKey::from_bytes(private_key_bytes.as_slice())
                .map_err(|_| PrivateKeyParseError::InvalidPrivateKeyHex)
                .map(PrivateKey::Ed25519)
        }
        _ => Err(PrivateKeyParseError::UnexpectedPrefix),
    }
}

#[derive(Clone, Debug)]
pub enum PrivateKeyParseError {
    NoPrefix,
    NoPrivateKeyHex,
    UnexpectedPrefix,
    UnexpectedCharacters,
    InvalidPrivateKeyHex,
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn parsing_of_secp256k1_private_key_succeeds() {
        // Arrange
        let str = "secp256k1:972d4abfd9b447e1a45037f0c84d04c15ee93d430cdf1dd341ed51cc6973f63f";

        // Act
        let private_key = parse_private_key(str).unwrap();

        // Assert
        match private_key {
            PrivateKey::Secp256k1(private_key) => assert_eq!(
                hex::encode(private_key.to_bytes()),
                "972d4abfd9b447e1a45037f0c84d04c15ee93d430cdf1dd341ed51cc6973f63f"
            ),
            PrivateKey::Ed25519(_) => panic!("test failed!"),
        }
    }

    #[test]
    fn parsing_of_ed25519_private_key_succeeds() {
        // Arrange
        let str = "ed25519:972d4abfd9b447e1a45037f0c84d04c15ee93d430cdf1dd341ed51cc6973f63f";

        // Act
        let private_key = parse_private_key(str).unwrap();

        // Assert
        match private_key {
            PrivateKey::Ed25519(private_key) => assert_eq!(
                hex::encode(private_key.to_bytes()),
                "972d4abfd9b447e1a45037f0c84d04c15ee93d430cdf1dd341ed51cc6973f63f"
            ),
            PrivateKey::Secp256k1(_) => panic!("test failed!"),
        }
    }
}
