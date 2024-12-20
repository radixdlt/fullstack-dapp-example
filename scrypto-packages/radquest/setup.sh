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
export gift_box_starter=`resim run manifests/create_gift_box_starter.rtm | grep "Resource:" | grep -o "resource_.*"`
export gift_box_simple=`resim run manifests/create_gift_box_simple.rtm | grep "Resource:" | grep -o "resource_.*"`
export gift_box_fancy=`resim run manifests/create_gift_box_fancy.rtm | grep "Resource:" | grep -o "resource_.*"`
export gift_box_elite=`resim run manifests/create_gift_box_elite.rtm | grep "Resource:" | grep -o "resource_.*"`
export element=`resim new-token-mutable $admin_badge | grep "Resource:" | grep -o "resource_.*"`
export radgem=`resim run manifests/create_radgem.rtm  | grep "Resource:" | grep -o "resource_.*"`
export morph_card=`resim run manifests/create_morph_energy_card.rtm  | grep "Resource:" | grep -o "resource_.*"`
export radmorph=`resim run manifests/create_radmorph.rtm  | grep "Resource:" | grep -o "resource_.*"`
export clam=`resim new-token-mutable $admin_badge | grep "Resource:" | grep -o "resource_.*"`


echo "\nGenerating Components..."
refinery_components=`resim run manifests/refinery/new_refinery.rtm | grep "Component:"`
export image_oracle=`echo $refinery_components | tail -n2 | head -n1 | grep -o "component_.*"`
export refinery=`echo $refinery_components | tail -n1 | grep -o "component_.*"`

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
echo "gift_box_starter = $gift_box_starter"
echo "gift_box_simple = $gift_box_simple"
echo "gift_box_fancy = $gift_box_fancy"
echo "gift_box_elite = $gift_box_elite"
echo "element = $element"
echo "radgem = $radgem"
echo "morph_card = $morph_card"
echo "radmorph = $radmorph"
echo "clam = $clam"

echo "\nComponent Addresses:"
echo "refinery = $refinery"
echo "image_oracle = $image_oracle"

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
