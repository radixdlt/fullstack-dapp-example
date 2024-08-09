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
export morph_energy_card=`resim run manifests/create_morph_energy_card.rtm  | grep "Resource:" | grep -o "resource_.*"`

echo "\nGenerating Components..."
export card_forge_v2=`resim run manifests/card-forge-v2/new_card_forge_v2.rtm | grep "Component:" | grep -o "component_.*"`

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
echo "morph_energy_card = $morph_energy_card"

echo "\nComponent Addresses:"
echo "card_forge_v2 = $card_forge_v2"

export user_id="test_user_id_12345"
export key_image_url="www.example.com/image.webp"
export name="Name"
export description="Description"
export energy_type="energy"
export energy_description="Energy description"
export rarity="rare"
export quality=5
export limited_edition=false

echo "\nAdditional Environment Variables Set:"
echo "user_id = $user_id"
echo "dapp_definition (set to match \$account) = $dapp_definition"
echo "key_image_url = $key_image_url"
echo "name = $name"
echo "description = $description"
echo "energy_type = $energy_type"
echo "energy_description = $energy_description"
echo "rarity = $rarity"
echo "quality = $quality"
echo "limited_edition = $limited_edition"
