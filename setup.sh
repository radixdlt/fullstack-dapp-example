#!/bin/bash

# Array of package directories
packages=(
    "radquest"
    "hero-badge-forge-v2"
    "quest-rewards-v2"
    "card-forge-v2"
    "gift-box-opener-v2"
    "radgem-forge-v2"
)

# Loop through each package and build it
for package in "${packages[@]}"; do
    echo "Building $package..."
    cd "scrypto-packages/$package" || exit 1
    scrypto build || exit 1
    cd ../.. || exit 1
done

echo "All packages built successfully!"