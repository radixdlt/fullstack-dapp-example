use scrypto::prelude::*;

#[blueprint]
mod image_oracle {
    enable_method_auth! {
      roles {
        admin => updatable_by: [OWNER];
      },
      methods {
        get_key_image_url_hash => restrict_to: [admin];
        set_key_image_url_hashes => restrict_to: [admin];
        remove_key_image_url_hashes => restrict_to: [admin];
      }
    }

    struct ImageOracle {
        key_image_url_hashes: KeyValueStore<Hash, Hash>,
    }

    impl ImageOracle {
        pub fn new(
            owner_role: OwnerRole,
            admin_badge_address: ResourceAddress,
        ) -> Global<ImageOracle> {
            Self {
                key_image_url_hashes: KeyValueStore::new(),
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles!(
                admin => rule!(require(admin_badge_address));
            ))
            .globalize()
        }

        pub fn get_key_image_url_hash(&self, key: Hash) -> Option<Hash> {
            let x = self.key_image_url_hashes.get(&key);

            match x {
                Some(x) => Some(x.clone()),
                None => None,
            }
        }

        pub fn set_key_image_url_hashes(&mut self, key_image_url_hashes: Vec<(Hash, Hash)>) {
            for (key, value) in key_image_url_hashes.iter().cloned() {
                self.key_image_url_hashes.insert(key, value);
            }
        }

        pub fn remove_key_image_url_hashes(&mut self, keys: Vec<Hash>) {
            for key in keys.iter() {
                self.key_image_url_hashes.remove(key);
            }
        }
    }
}
