use scrypto::prelude::*;

#[derive(ScryptoSbor, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone)]
#[sbor(transparent)]
pub struct UserId(pub String);

#[blueprint]
#[events(PurchaseTicketsEvent)]
mod ticket_machine {
    enable_method_auth! {
        roles {
            super_admin => updatable_by: [OWNER];
        },
        methods {
            disable => restrict_to: [super_admin];
            enable => restrict_to: [super_admin];
            set_ticket_price => restrict_to: [super_admin];
            get_ticket_price => PUBLIC;
            withdraw_all_xrd => restrict_to: [super_admin];
            get_xrd_balance => PUBLIC;
            purchase_tickets => PUBLIC;
        }
    }

    struct TicketMachine {
        enabled: bool,
        ticket_price: Decimal,
        xrd_vault: Vault,
        hero_badge_address: ResourceAddress,
    }

    impl TicketMachine {
        pub fn new(
            super_admin_badge_address: ResourceAddress,
            owner_role: OwnerRole,
            dapp_definition: ComponentAddress,
            ticket_price: Decimal,
            hero_badge_address: ResourceAddress,
        ) -> Global<TicketMachine> {
            Self {
                enabled: true,
                xrd_vault: Vault::new(XRD),
                ticket_price,
                hero_badge_address,
            }
            .instantiate()
            .prepare_to_globalize(owner_role)
            .roles(roles! {
                super_admin => rule!(require(super_admin_badge_address));
            })
            .metadata(metadata!(
                init {
                    "dapp_definition" => dapp_definition, updatable;
                }
            ))
            .globalize()
        }

        pub fn disable(&mut self) {
            assert!(self.enabled, "TicketMachine already disabled");
            self.enabled = false;
        }
        pub fn enable(&mut self) {
            assert!(!self.enabled, "TicketMachine already enabled");
            self.enabled = true;
        }

        fn get_user_id_from_badge_proof(&self, hero_badge: Proof) -> UserId {
            let local_id_string = match hero_badge
                .check(self.hero_badge_address)
                .as_non_fungible()
                .non_fungible_local_id()
            {
                NonFungibleLocalId::String(local_id) => local_id.value().to_owned(),
                _ => unreachable!("All hero badges have String local IDs"),
            };

            UserId(local_id_string)
        }

        pub fn purchase_tickets(&mut self, user_badge_proof: Proof, mut xrd: Bucket) -> Bucket {
            assert!(self.enabled, "TicketMachine is disabled");
            assert!(xrd.amount() >= self.ticket_price, "Insufficient XRD");

            let user_id = self.get_user_id_from_badge_proof(user_badge_proof);

            let ticket_amount = xrd
                .amount()
                .checked_div(self.ticket_price)
                .unwrap()
                .checked_floor()
                .unwrap();
            let deposit = xrd.take(ticket_amount * self.ticket_price);
            self.xrd_vault.put(deposit);

            Runtime::emit_event(PurchaseTicketsEvent {
                user_id,
                ticket_amount,
            });

            xrd
        }

        pub fn set_ticket_price(&mut self, new_price: Decimal) {
            self.ticket_price = new_price;
        }

        pub fn get_ticket_price(&self) -> Decimal {
            self.ticket_price
        }

        pub fn withdraw_all_xrd(&mut self) -> Bucket {
            self.xrd_vault.take_all()
        }

        pub fn get_xrd_balance(&self) -> Decimal {
            self.xrd_vault.amount()
        }
    }
}

#[derive(Debug, ScryptoSbor, ScryptoEvent)]
struct PurchaseTicketsEvent {
    user_id: UserId,
    ticket_amount: Decimal,
}
