#!/bin/bash

# Script to prevent problematic .js files from being recreated
# Run this if you encounter the useAuth.js file recreation issue

echo "🔧 Fixing file extension issues..."

# Remove problematic files if they exist
if [ -f "src/hooks/useAuth.js" ]; then
    echo "❌ Removing src/hooks/useAuth.js (contains JSX, should be .jsx)"
    rm src/hooks/useAuth.js
fi

if [ -f "postcss.config.js" ]; then
    echo "❌ Removing postcss.config.js (uses CommonJS, should be .cjs)"
    rm postcss.config.js
fi

if [ -f "tailwind.config.js" ]; then
    echo "❌ Removing tailwind.config.js (uses CommonJS, should be .cjs)"
    rm tailwind.config.js
fi

# Clear Vite cache
echo "🗑️ Clearing Vite cache..."
rm -rf node_modules/.vite

# Kill any running Vite processes
echo "🔄 Stopping any running Vite processes..."
pkill -f "vite" || true

echo "✅ File extension issues fixed!"
echo "📡 You can now run: npm run dev"
