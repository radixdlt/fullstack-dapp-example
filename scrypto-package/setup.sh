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

export owner_badge=`resim new-simple-badge | grep -o "resource_.\S*" | sed -e "s/:#1#//"`
export admin_badge=`resim new-badge-fixed 2 | grep "Resource:" | grep -o "resource_.\S*" | sed -e "s/://"`
export user_badge=`resim new-simple-badge | grep -o "resource_.\S*" | sed -e "s/:#1#//"`
export kyc_badge=`resim new-simple-badge | grep -o "resource_.\S*" | sed -e "s/:#1#//"`

export component=`resim run manifests/new_quest_rewards.rtm | grep "Component" | grep -o "component_.*"`

echo "\nSetup Complete"
echo "--------------------------"
echo "Environment variables set:"
echo "account = $account"
echo "privatekey = $privatekey"
echo "account_badge = $account_badge"
echo "xrd = $xrd"
echo "package = $package"
echo "owner_badge = $owner_badge"
echo "admin_badge = $admin_badge"
echo "user_badge = $user_badge"
echo "kyc_badge = $kyc_badge"
echo "component = $component"
