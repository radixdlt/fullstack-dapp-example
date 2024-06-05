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

echo "\nPublishing package..."
export package=`resim publish . | sed "s/Success! New Package: //"`

export user_badge=`resim new-simple-badge | grep -o "resource_.\S*" | sed -e "s/:#1#//"`
export kyc_badge=`resim new-simple-badge | grep -o "resource_.\S*" | sed -e "s/:#1#//"`

export super_admin_badge=`resim new-badge-fixed 1 | grep "Resource:" | grep -o "resource_.*"`
export admin_badge=`resim run manifests/mint_admin_badges.rtm | grep "Resource:" | grep -o "resource_.*"`
export element=`resim new-token-mutable $admin_badge | grep "Resource:" | grep -o "resource_.*"`
export radgem=`resim run manifests/create_radgem.rtm  | grep "Resource:" | grep -o "resource_.*"`
export morph_card=`resim run manifests/create_morph_card.rtm  | grep "Resource:" | grep -o "resource_.*"`
export radmorph=`resim run manifests/create_radmorph.rtm  | grep "Resource:" | grep -o "resource_.*"`

export quest_rewards=`resim run manifests/new_quest_rewards.rtm | grep "Component:" | tail -n1 | grep -o "component_.*"`

refinery_components=`resim run manifests/new_refinery.rtm | grep "Component:"`
export refinery=`echo $refinery_components | tail -n1 | grep -o "component_.*"`
export image_oracle=`echo $refinery_components | tail -n2 | head -n1 | grep -o "component_.*"`

export morph_card_forge=`resim run manifests/new_card_forge.rtm | grep "Component:" | grep -o "component_.*"`

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
echo "user_badge = $user_badge"
echo "kyc_badge = $kyc_badge"
echo "element = $element"
echo "radgem = $radgem"
echo "morph_card = $morph_card"
echo "radmorph = $radmorph"

echo "\nComponent Addresses:"
echo "quest_rewards = $quest_rewards"
echo "refinery = $refinery"
echo "image_oracle = $image_oracle"
echo "morph_card_forge = $morph_card_forge"
