# Sales Dashboard Deployment Guide

## 🚀 Quick Deployment with Render.com

### Prerequisites
- GitHub repository with your code
- Render.com account (free tier available)
- Supabase project already set up

### Step 1: Deploy Backend to Render

1. **Push to GitHub** (if not already done):
```bash
git add .
git commit -m "feat: complete sales dashboard with Supabase integration"
git push origin main
```

2. **Create Backend Service on Render**:
   - Go to https://render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     ```
     Name: sales-dashboard-api
     Environment: Node
     Build Command: cd backend && npm install
     Start Command: cd backend && npm start
     Root Directory: (leave empty)
     ```

3. **Add Environment Variables**:
   ```
   PORT=5000
   SUPABASE_URL=https://edzwdxzdogttgrurgnwx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkendkeHpkb2d0dGdydXJnbnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NDAxOTAsImV4cCI6MjA4NzMxNjE5MH0.GTznRRptYxmU-qSYdKfWMDOgkA90LolNZ1GSx6RQUwI
   NODE_ENV=production
   ```

### Step 2: Deploy Frontend to Render

1. **Create Frontend Service**:
   - Click "New +" → "Web Service"
   - Connect same GitHub repository
   - Configure:
     ```
     Name: sales-dashboard-frontend
     Environment: Node
     Build Command: cd frontend && npm install && npm run build
     Start Command: cd frontend && npm install -g serve && serve -s build -l 3000
     Root Directory: (leave empty)
     ```

2. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

### Step 3: Initialize Production Database

After backend deploys, initialize production data:
1. Go to your backend URL + `/init-data`
2. Or run locally with production Supabase credentials

### Alternative: Vercel Deployment (Frontend Only)

For frontend deployment to Vercel:
1. Go to https://vercel.com/
2. Import GitHub repository
3. Configure:
   ```
   Framework: Create React App
   Build Command: cd frontend && npm run build
   Output Directory: frontend/build
   Install Command: cd frontend && npm install
   ```
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

### Alternative: Railway Deployment

1. Go to https://railway.app/
2. Deploy backend and frontend as separate services
3. Configure environment variables for each

### Production URLs Structure

Once deployed:
- Backend: https://sales-dashboard-api.onrender.com
- Frontend: https://sales-dashboard-frontend.onrender.com
- API endpoints: https://sales-dashboard-api.onrender.com/api/dashboard/kpi

### Troubleshooting

**Common Issues:**
1. **CORS Errors**: Ensure frontend URL is in backend CORS
2. **Database Connection**: Verify Supabase credentials in production
3. **Build Failures**: Check package.json scripts and dependencies
4. **API Timeouts**: Render free tier has startup delays

**Health Check:**
- Backend: https://your-backend-url.onrender.com/api/health
- Frontend: Should load dashboard with data

### Cost

**Free Tier Limits:**
- Render: 750 hours/month per service
- Vercel: 100GB bandwidth/month
- Railway: $5 credit/month
- Supabase: 500MB database, 2GB bandwidth

This setup provides a fully functional, deployed sales dashboard at no cost!
