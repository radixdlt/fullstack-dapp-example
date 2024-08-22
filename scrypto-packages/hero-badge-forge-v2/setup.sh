echo "Setting up Scrypto Environment and Package"

echo "\nResetting radix engine simulator..." 
resim reset

echo "\nCreating new accounts..."
temp_account=`resim new-account`
echo "$temp_account"
export account_1=`echo "$temp_account" | grep Account | grep -o "account_.*"`
export privatekey=`echo "$temp_account" | grep Private | sed "s/Private key: //"`
export account_badge=`echo "$temp_account" | grep Owner | grep -o "resource_.*"`
export xrd=`resim show $account_1 | grep XRD | grep -o "resource_.\S*" | sed -e "s/://"`
export dapp_definition=$account_1
export account_2=`resim new-account | grep Account | grep -o "account_.*"`

echo "\nPublishing package..."
export package=`resim publish . | sed "s/Success! New Package: //"`

echo "\nGenerating Resources..."
export super_admin_badge=`resim run manifests/create_a_super_admin_badge.rtm | grep "Resource:" | grep -o "resource_.*"`
export admin_badge=`resim run manifests/create_admin_badges.rtm | grep "Resource:" | grep -o "resource_.*"`
export hero_badge=`resim run manifests/create_hero_badge.rtm | grep "Resource:" | grep -o "resource_.*"`

echo "\nGenerating Components..."
export hero_badge_forge_v2=`resim run manifests/hero-badge-forge-v2/new_hero_badge_forge_v2.rtm | grep "Component:" | grep -o "component_.*"`

echo "\nSetup Complete & Environment Variables Set"
echo "------------------------------------------"

echo "\nAccount Addresses:"
echo "account_1 = $account_1"
echo "account_2 = $account_2"
echo "privatekey = $privatekey"
echo "account_badge = $account_badge"

echo "\nResource Addresses:"
echo "xrd = $xrd"
echo "package = $package"
echo "super_admin_badge = $super_admin_badge"
echo "admin_badge = $admin_badge"
echo "hero_badge = $hero_badge"

echo "\nComponent Addresses:"
echo "hero_badge_forge_v2 = $hero_badge_forge_v2"

export user_id_1="test_user_id_12345"
export user_id_2="test_user_id_67890"

echo "\nAdditional Environment Variables Set:"
echo "user_id_1 = $user_id_1"
echo "user_id_2 = $user_id_2"
echo "dapp_definition (set to match \$account_1) = $dapp_definition"
