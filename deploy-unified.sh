#!/bin/bash

echo "🚀 Deploying Unified Sales Dashboard..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "🎯 Your app is now live at: https://your-app.vercel.app"
echo ""
echo "📊 Dashboard Features:"
echo "   ✅ KPI Summary Cards"
echo "   ✅ Sales Trend Chart"
echo "   ✅ Lead Status Distribution"
echo "   ✅ Date Range Filtering"
echo "   ✅ Responsive Design"
echo ""
echo "🔧 Set up environment variables in Vercel dashboard:"
echo "   - SUPABASE_URL"
echo "   - SUPABASE_ANON_KEY"
