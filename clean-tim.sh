#!/bin/bash

# Script to remove Creative Tim components and replace with clean components

echo "Starting cleanup of Creative Tim components..."

# 1. Remove Material Tailwind dependency
echo "Removing Material Tailwind dependency..."
npm uninstall @material-tailwind/react

# 2. Install HeadlessUI (alternative to Material Tailwind)
echo "Installing HeadlessUI..."
npm install @headlessui/react

# 3. Remove Creative Tim files from the dist directory
echo "Cleaning dist directory..."
rm -rf dist

# 4. Backup the current index.astro
echo "Backing up index.astro..."
cp src/pages/index.astro src/pages/index.astro.bak

# 5. Replace index.astro with our clean version
echo "Replacing index.astro with clean version..."
cp src/pages/home-clean.astro src/pages/index.astro

# 6. Backup the current Layout.astro
echo "Backing up Layout.astro..."
cp src/layouts/Layout.astro src/layouts/Layout.astro.bak

# 7. Replace Layout.astro with our clean version
echo "Replacing Layout.astro with clean version..."
cp src/layouts/CleanLayout.astro src/layouts/Layout.astro

# 8. Remove presentation components (which likely have Creative Tim dependencies)
echo "Removing presentation components..."
rm -rf src/components/presentation

# 9. Rebuild the project
echo "Rebuilding project..."
npm run build

echo "Cleanup complete! Creative Tim components have been removed."
echo "Check the site to ensure there are no Tim banners or references." 