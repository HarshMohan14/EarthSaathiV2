#!/bin/bash

# Deployment script for GoDaddy
# This script builds the app and prepares files for upload

echo "🚀 Starting deployment preparation..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your Supabase credentials."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed! dist folder not found."
    exit 1
fi

# Copy .htaccess to dist folder
if [ -f ".htaccess" ]; then
    echo "📄 Copying .htaccess to dist folder..."
    cp .htaccess dist/.htaccess
else
    echo "⚠️  Warning: .htaccess file not found. Creating default one..."
    cat > dist/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF
fi

echo "✅ Build completed successfully!"
echo ""
echo "📁 Files ready for upload in the 'dist' folder"
echo ""
echo "📋 Next steps:"
echo "1. Upload all contents of the 'dist' folder to your GoDaddy public_html directory"
echo "2. Ensure .htaccess is uploaded (it may be hidden)"
echo "3. Test your website"
echo ""
echo "💡 Tip: You can use cPanel File Manager or FTP to upload files"

