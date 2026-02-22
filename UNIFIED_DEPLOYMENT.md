# Single Service Deployment Configuration

## Vercel Deployment (Recommended)

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server-unified.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server-unified.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/build/$1"
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase_url",
    "SUPABASE_ANON_KEY": "@supabase_anon_key"
  },
  "functions": {
    "backend/server-unified.js": {
      "maxDuration": 10
    }
  }
}
```

### Netlify Deployment

### netlify.toml
```toml
[build]
  base = ""
  command = "npm run build"
  publish = "frontend/build"

[build.environment]
  NODE_VERSION = "16"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server-unified.js"
  status = 200

[functions]
  directory = "backend"
```

### Render Single Service

### render-unified.yaml
```yaml
services:
  - type: web
    name: sales-dashboard-unified
    env: node
    repo: https://github.com/yourusername/sales-dashboard.git
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: PORT
        value: 10000
      - key: SUPABASE_URL
        value: https://edzwdxzdogttgrurgnwx.supabase.co
      - key: SUPABASE_ANON_KEY
        value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkendkeHpkb2d0dGdydXJnbnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NDAxOTAsImV4cCI6MjA4NzMxNjE5MH0.GTznRRptYxmU-qSYdKfWMDOgkA90LolNZ1GSx6RQUwI
      - key: NODE_ENV
        value: production
```

## Deployment Instructions

### Vercel (Easiest)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Set environment variables in Vercel dashboard

### Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod --dir=frontend/build`
3. Set up serverless functions for API

### Render
1. Use render-unified.yaml configuration
2. Single service handles both frontend and backend
3. API routes work alongside static files

## Benefits of Unified Deployment

✅ Single URL for entire application
✅ No CORS issues (same origin)
✅ Simpler deployment process
✅ Cost-effective (one service instead of two)
✅ Better performance (reduced network hops)
