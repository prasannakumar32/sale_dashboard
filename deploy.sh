#!/bin/bash

echo "🚀 Deploying Sales Dashboard..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git config user.email "your-email@example.com"
    git config user.name "Your Name"
fi

# Add all files
echo "📝 Staging files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "feat: implement complete full-stack sales dashboard with Supabase integration

- Add React frontend with KPI cards, charts, and date filtering
- Implement Express backend with RESTful API endpoints  
- Integrate Supabase PostgreSQL database with sample data
- Create responsive UI with modern design and error handling
- Add data visualization using Recharts library
- Implement lead status tracking and sales trend analysis"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git branch -M main
git remote add origin https://github.com/yourusername/sales-dashboard.git  # Update this URL
git push -u origin main

echo "✅ Code deployed to GitHub!"
echo ""
echo "🌐 Next Steps:"
echo "1. Go to https://render.com/"
echo "2. Create backend service with: cd backend && npm install && npm start"
echo "3. Create frontend service with: cd frontend && npm install && npm run build"
echo "4. Add environment variables from DEPLOYMENT.md"
echo ""
echo "🎯 Your app will be live at: https://your-app.onrender.com"
