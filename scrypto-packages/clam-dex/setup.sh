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

export super_admin_badge=`resim new-badge-fixed 1 | grep "Resource:" | grep -o "resource_.*"`
export admin_badge=`resim run manifests/mint_admin_badges.rtm | grep "Resource:" | grep -o "resource_.*"`
export clam=`resim new-token-mutable $admin_badge | grep "Resource:" | grep -o "resource_.*"`
export ottercoin=`resim run manifests/create_ottercoin.rtm | grep "Resource:" | grep -o "resource_.*"`

resim mint 100 $clam --proofs $admin_badge:1

export jetty_swap=`resim run manifests/new_jetty_swap.rtm | grep "Component:" | tail -n1 | grep -o "component_.*"`
export letty_swap=`resim run manifests/new_letty_swap.rtm | grep "Component:" | tail -n1 | grep -o "component_.*"`

echo "\nSetup Complete & Environment Variables Set"
echo "------------------------------------------"

echo "\nAccount Addresses:"
echo "account = $account"
echo "privatekey = $privatekey"
echo "account_badge = $account_badge"
echo "dapp_definition (set to match \$account) = $user_account"

echo "\nResource Addresses:"
echo "xrd = $xrd"
echo "package = $package"
echo "super_admin_badge = $super_admin_badge"
echo "admin_badge = $admin_badge"
echo "clam = $clam"
echo "ottercoin = $ottercoin"

echo "\nComponent Addresses:"
echo "jetty_swap = $jetty_swap"
echo "letty_swap = $letty_swap"

export amount=1

echo "\nAdditional Environment Variables Set:"
echo "amount = $amount"