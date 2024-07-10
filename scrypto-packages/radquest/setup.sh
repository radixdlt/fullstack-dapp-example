echo "Setting up Scrypto Environment and Package"

echo "\nResetting radix engine simulator..." 
resim reset

echo "\nCreating new account..."
temp_account=`resim new-account`
echo "$temp_account"
export account=`echo "$temp_account" | grep Account | grep -o "account_.*"`
export privatekey=`echo "$temp_account" | grep Private | sed "s/Private key: //"`
export account_badge=`echo "$temp_account" | grep Owner | grep -o "resource_.*"`
export xrd=`resim show $account | grep XRD | grep -o "resource_.\S*" | sed -e "s/://"`
export dapp_definition=$account

echo "\nPublishing package..."
export package=`resim publish . | sed "s/Success! New Package: //"`

echo "\nGenerating Resources..."
export super_admin_badge=`resim run manifests/create_a_super_admin_badge.rtm | grep "Resource:" | grep -o "resource_.*"`
export admin_badge=`resim run manifests/create_admin_badges.rtm | grep "Resource:" | grep -o "resource_.*"`
export hero_badge=`resim run manifests/create_hero_badge.rtm | grep "Resource:" | grep -o "resource_.*"`
export kyc_badge=`resim new-simple-badge | grep -o "resource_.\S*" | sed -e "s/:#1#//"`
export gift_box=`resim run manifests/gift-box-opener/create_gift_box.rtm | grep "Resource:" | grep -o "resource_.*"`
export element=`resim new-token-mutable $admin_badge | grep "Resource:" | grep -o "resource_.*"`
export radgem=`resim run manifests/create_radgem.rtm  | grep "Resource:" | grep -o "resource_.*"`
export morph_card=`resim run manifests/create_morph_energy_card.rtm  | grep "Resource:" | grep -o "resource_.*"`
export radmorph=`resim run manifests/create_radmorph.rtm  | grep "Resource:" | grep -o "resource_.*"`


echo "\nGenerating Components..."
export hero_badge_forge=`resim run manifests/hero-badge-forge/new_hero_badge_forge.rtm | grep "Component:" | grep -o "component_.*"`

quest_rewards_components=`resim run manifests/quest-rewards/new_quest_rewards.rtm | grep "Component:"`
export kyc_oracle=`echo $quest_rewards_components | tail -n2 | head -n1 | grep -o "component_.*"`
export quest_rewards=`echo $quest_rewards_components | tail -n1 | grep -o "component_.*"`

export gift_box_opener=`resim run manifests/gift-box-opener/new_gift_box_opener.rtm | grep "Component:" | grep -o "component_.*"`

refinery_components=`resim run manifests/refinery/new_refinery.rtm | grep "Component:"`
export image_oracle=`echo $refinery_components | tail -n2 | head -n1 | grep -o "component_.*"`
export refinery=`echo $refinery_components | tail -n1 | grep -o "component_.*"`

export morph_card_forge=`resim run manifests/morph-card-forge/new_card_forge.rtm | grep "Component:" | grep -o "component_.*"`

echo "\nSetup Complete & Environment Variables Set"
echo "------------------------------------------"

echo "\nAccount Addresses:"
echo "account = $account"
echo "privatekey = $privatekey"
echo "account_badge = $account_badge"

echo "\nResource Addresses:"
echo "xrd = $xrd"
echo "package = $package"
echo "super_admin_badge = $super_admin_badge"
echo "admin_badge = $admin_badge"
echo "hero_badge = $hero_badge"
echo "kyc_badge = $kyc_badge"
echo "gift_box = $gift_box"
echo "element = $element"
echo "radgem = $radgem"
echo "morph_card = $morph_card"
echo "radmorph = $radmorph"

echo "\nComponent Addresses:"
echo "hero_badge_forge = $hero_badge_forge"
echo "quest_rewards = $quest_rewards"
echo "kyc_oracle = $kyc_oracle"
echo "gift_box_opener = $gift_box_opener"
echo "refinery = $refinery"
echo "image_oracle = $image_oracle"
echo "morph_card_forge = $morph_card_forge"

export super_admin_badge_id="1"
export user_id="test_user_id_12345"
export quest_id="RadixIntro"
export user_account=$account

echo "\nAdditional Environment Variables Set:"
echo "super_admin_badge_id = $super_admin_badge_id"
echo "user_id = $user_id"
echo "quest_id = $quest_id"
echo "user_account (set to match \$account) = $user_account"
echo "dapp_definition (set to match \$account) = $user_account"
