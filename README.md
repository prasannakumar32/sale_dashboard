# Sales Dashboard - Full Stack Web Application

A comprehensive full-stack sales dashboard built with React, Node.js, Express, and PostgreSQL. Monitor key performance indicators, visualize sales trends, and track lead distribution in real-time.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Deployment on Render.com](#deployment-on-rendercom)

## ✨ Features

### KPI Summary Section
- **Total Leads**: Count of all leads created in the selected period
- **Contacted Leads**: Number of leads that have been contacted
- **Sales Closed**: Number of successful conversions
- **Total Revenue**: Total revenue generated from closed deals

### Lead Status Tracking
- Display lead counts for all six statuses:
  - New
  - Contacted
  - Follow Up
  - Appointment Booked
  - Converted
  - Lost

### Data Visualization
- **Sales Trend Chart**: Line chart showing revenue trends over the selected period
- **Lead Status Distribution**: Pie chart displaying the distribution of leads across all statuses

### Filtering
- **Date Range Filter**: Switch between "Last 7 Days" and "Last 30 Days" views
- Real-time data updates when filter is changed

### User Experience
- Loading indicators while fetching data
- Error handling with user-friendly messages
- Empty state messages when no data is available
- Responsive design (minimum 1366 × 768 resolution)
- Clean, modern UI with smooth transitions

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI Framework
- **Recharts** 2.10.3 - Data visualization library
- **Axios** 1.6.2 - HTTP client
- **CSS3** - Styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.18.2 - Web framework
- **PostgreSQL** - Relational database
- **pg** 8.11.2 - PostgreSQL client

### DevOps & Deployment
- **Git** - Version control
- **Render.com** - Cloud deployment platform

## 📁 Project Structure

```
sales-dashboard/
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── db.js              # Database connection configuration
│   ├── init-db.js         # Database initialization and seeding
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables (local)
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML entry point
│   ├── src/
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # App styling
│   │   ├── index.js       # React entry point
│   │   ├── index.css      # Global styles
│   │   └── components/
│   │       ├── KPICard.js/css           # KPI card component
│   │       ├── DateRangeFilter.js/css   # Date filter component
│   │       ├── SalesTrendChart.js       # Sales trends chart
│   │       ├── LeadStatusChart.js       # Lead distribution pie chart
│   │       └── LeadStatusSummary.js/css # Lead status table
│   ├── package.json       # Frontend dependencies
│   ├── .env.local         # Environment variables (local)
│   └── .gitignore         # Git ignore rules
├── .gitignore             # Root git ignore rules
└── README.md              # This file
```

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository (or Initialize Git)

```bash
cd sales-dashboard
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### 2. Setup PostgreSQL Database

#### Option A: Using PostgreSQL CLI

```bash
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE sales_dashboard;

# Exit psql
\q
```

#### Option B: Using pgAdmin (GUI)
1. Open pgAdmin
2. Create a new database named `sales_dashboard`

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Initialize database with sample data
node init-db.js

# Start the backend server
npm start
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal window and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will automatically open on `http://localhost:3000`

## 🎮 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Both servers will run simultaneously. The frontend will connect to the backend API and display the dashboard.

### Production Build

**Frontend Build:**
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` directory.

## 📡 API Endpoints

### 1. Health Check
```
GET /api/health
Response: { status: 'ok' }
```

### 2. KPI Summary
```
GET /api/dashboard/kpi?days=30
Parameters:
  - days (optional): Number of days to include (default: 30)

Response:
{
  "totalLeads": 150,
  "contactedLeads": 85,
  "salesClosed": 25,
  "totalRevenue": 375000.00
}
```

### 3. Lead Status Summary
```
GET /api/dashboard/lead-status?days=30
Parameters:
  - days (optional): Number of days to include (default: 30)

Response:
[
  { "status": "New", "count": 45 },
  { "status": "Contacted", "count": 40 },
  { "status": "Follow Up", "count": 30 },
  { "status": "Appointment Booked", "count": 20 },
  { "status": "Converted", "count": 10 },
  { "status": "Lost", "count": 5 }
]
```

### 4. Sales Trend
```
GET /api/dashboard/sales-trend?days=30
Parameters:
  - days (optional): Number of days to include (default: 30)

Response:
[
  { "date": "2026-02-22", "revenue": 15000 },
  { "date": "2026-02-23", "revenue": 22000 },
  ...
]
```

## 🏗️ Architecture & Design Decisions

### Frontend Architecture
- **Component-Based**: Modular React components for reusability
- **State Management**: React hooks (useState, useEffect) for simple state management
- **API Integration**: Axios for clean HTTP requests
- **Styling**: CSS modules for component isolation and maintainability

### Backend Architecture
- **RESTful API**: Standard HTTP methods and URL structure
- **Separation of Concerns**: Database logic separated from API routes
- **Environmental Configuration**: Secrets managed through .env files
- **Data Aggregation**: SQL queries for efficient data grouping and filtering

### Database Design
- **Leads Table**: Single table storing all lead and sales information
- **Indexing Ready**: Structure supports adding indexes on frequently queried columns
- **Data Integrity**: Created_at, contacted_date, and converted_date for audit trail

### Design Principles Applied
1. **Clean Code**: Well-organized, readable code with meaningful names
2. **DRY Principle**: Reusable components and utility functions
3. **Responsive Design**: Mobile-first approach for various screen sizes
4. **Error Handling**: Graceful error messages for better user experience
5. **Performance**: Efficient API calls with data aggregation at the backend

## 🚀 Deployment on Render.com

### Prerequisites
- GitHub repository with your code
- Render.com account (free tier available)

### Step 1: Prepare for Deployment

Create a root `package.json` to manage both frontend and backend:

```bash
cd sales-dashboard
# Files will be added in the final deployment package
```

### Step 2: Deploy Backend to Render

1. Push your code to GitHub
2. Go to [Render.com](https://render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: sales-dashboard-api
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Region**: Choose closest to your location

6. Add environment variables:
   ```
   PORT=5000
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_HOST=your_postgresql_host
   DB_PORT=5432
   DB_NAME=sales_dashboard
   NODE_ENV=production
   ```

7. Click "Create Web Service"

### Step 3: Deploy PostgreSQL Database

Option A: Use Render's PostgreSQL service
1. In Render dashboard, click "New +" > "PostgreSQL"
2. Create a new PostgreSQL instance
3. Copy the connection details for environment variables

Option B: Use an external PostgreSQL provider (e.g., Vercel Postgres, Neon)
1. Sign up and create a database
2. Update .env variables with connection details

### Step 4: Deploy Frontend to Render

1. Create a new Web Service for the frontend
2. Configure:
   - **Name**: sales-dashboard-frontend
   - **Environment**: Node
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `npx serve -s frontend/build`
   - **Region**: Same as backend

3. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

4. Click "Create Web Service"

### Step 5: Test Deployment

1. Wait for both services to deploy (green status)
2. Visit your frontend URL
3. Verify all API calls are working
4. Test date filtering and data visualization

## 📊 Sample Data

The database comes pre-seeded with:
- **60 days** of historical data
- **180-300+ leads** with realistic distribution
- Multiple status transitions (New → Contacted → Converted or Lost)
- Various revenue amounts for closed deals

Data is automatically generated on first backend startup via `init-db.js`.

## 🐛 Troubleshooting

### Issue: Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running and database is created

### Issue: Frontend can't connect to backend
```
Error: Failed to load dashboard data
```
**Solution**: 
- Check if backend is running on port 5000
- Verify CORS is enabled (should be by default)
- Check browser console for exact error

### Issue: Port already in use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill
```

## 📝 Git Commits

Well-structured commits made throughout development:
1. Initial project setup with directory structure
2. Backend API endpoints implementation
3. Database schema and seeding
4. Frontend components development
5. Styling and responsive design
6. API integration and testing
7. Deployment configuration

## 📄 License

This project is provided as-is for educational and evaluation purposes.

## 👨‍💼 Author

Full Stack Sales Dashboard - Intern Assignment

---

**Version**: 1.0.0  
**Last Updated**: February 2026
