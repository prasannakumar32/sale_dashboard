import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to calculate date range
const getDateRange = (days) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0]
  };
};

// Get KPI Summary
app.get('/api/dashboard/kpi', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const { start, end } = getDateRange(parseInt(days));

    const totalLeads = await pool.query(
      'SELECT COUNT(*) as count FROM leads WHERE created_at >= $1 AND created_at <= $2',
      [start, end]
    );

    const contactedLeads = await pool.query(
      "SELECT COUNT(*) as count FROM leads WHERE status != 'New' AND created_at >= $1 AND created_at <= $2",
      [start, end]
    );

    const salesClosed = await pool.query(
      "SELECT COUNT(*) as count FROM leads WHERE status = 'Converted' AND created_at >= $1 AND created_at <= $2",
      [start, end]
    );

    const totalRevenue = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total FROM leads WHERE status = 'Converted' AND created_at >= $1 AND created_at <= $2",
      [start, end]
    );

    res.json({
      totalLeads: parseInt(totalLeads.rows[0].count),
      contactedLeads: parseInt(contactedLeads.rows[0].count),
      salesClosed: parseInt(salesClosed.rows[0].count),
      totalRevenue: parseFloat(totalRevenue.rows[0].total) || 0
    });
  } catch (err) {
    console.error('KPI Error:', err);
    res.status(500).json({ error: 'Failed to fetch KPI data' });
  }
});

// Get Lead Status Summary
app.get('/api/dashboard/lead-status', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const { start, end } = getDateRange(parseInt(days));

    const result = await pool.query(
      `SELECT status, COUNT(*) as count FROM leads 
       WHERE created_at >= $1 AND created_at <= $2
       GROUP BY status
       ORDER BY count DESC`,
      [start, end]
    );

    const statuses = ['New', 'Contacted', 'Follow Up', 'Appointment Booked', 'Converted', 'Lost'];
    const statusMap = {};

    // Initialize all statuses with 0
    statuses.forEach(status => {
      statusMap[status] = 0;
    });

    // Populate with actual counts
    result.rows.forEach(row => {
      statusMap[row.status] = parseInt(row.count);
    });

    const responseData = statuses.map(status => ({
      status,
      count: statusMap[status]
    }));

    res.json(responseData);
  } catch (err) {
    console.error('Lead Status Error:', err);
    res.status(500).json({ error: 'Failed to fetch lead status data' });
  }
});

// Get Sales Trend (Revenue by Date)
app.get('/api/dashboard/sales-trend', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const { start, end } = getDateRange(parseInt(days));

    const result = await pool.query(
      `SELECT converted_date as date, COALESCE(SUM(amount), 0) as revenue
       FROM leads
       WHERE status = 'Converted' AND converted_date >= $1 AND converted_date <= $2
       GROUP BY converted_date
       ORDER BY date ASC`,
      [start, end]
    );

    // Fill in missing dates with 0 revenue
    const dateMap = {};
    const currentDate = new Date(start);
    const endDateObj = new Date(end);

    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dateMap[dateStr] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    result.rows.forEach(row => {
      if (row.date) {
        dateMap[row.date] = parseFloat(row.revenue);
      }
    });

    const responseData = Object.entries(dateMap).map(([date, revenue]) => ({
      date,
      revenue: parseFloat(revenue)
    }));

    res.json(responseData);
  } catch (err) {
    console.error('Sales Trend Error:', err);
    res.status(500).json({ error: 'Failed to fetch sales trend data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
