import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes
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

    console.log(`📊 KPI Request: ${days} days (${start} to ${end})`);

    const { data: totalLeadsData, error: totalError } = await supabase
      .from('leads')
      .select('id')
      .gte('created_at', start)
      .lte('created_at', end);

    if (totalError) {
      console.error('Total leads error:', totalError);
      return res.status(500).json({ error: 'Failed to fetch total leads' });
    }

    const { data: contactedLeadsData, error: contactedError } = await supabase
      .from('leads')
      .select('id')
      .neq('status', 'New')
      .gte('created_at', start)
      .lte('created_at', end);

    if (contactedError) {
      console.error('Contacted leads error:', contactedError);
      return res.status(500).json({ error: 'Failed to fetch contacted leads' });
    }

    const { data: salesClosedData, error: salesError } = await supabase
      .from('leads')
      .select('id, amount')
      .eq('status', 'Converted')
      .gte('created_at', start)
      .lte('created_at', end);

    if (salesError) {
      console.error('Sales closed error:', salesError);
      return res.status(500).json({ error: 'Failed to fetch sales data' });
    }

    const totalRevenue = salesClosedData?.reduce((sum, lead) => sum + (lead.amount || 0), 0) || 0;

    const result = {
      totalLeads: totalLeadsData?.length || 0,
      contactedLeads: contactedLeadsData?.length || 0,
      salesClosed: salesClosedData?.length || 0,
      totalRevenue: parseFloat(totalRevenue) || 0
    };

    console.log('✅ KPI Response:', result);
    res.json(result);
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

    console.log(`📊 Lead Status Request: ${days} days (${start} to ${end})`);

    const { data: leadsData, error } = await supabase
      .from('leads')
      .select('status')
      .gte('created_at', start)
      .lte('created_at', end);

    if (error) {
      console.error('Lead status error:', error);
      return res.status(500).json({ error: 'Failed to fetch lead status data' });
    }

    const statuses = ['New', 'Contacted', 'Follow Up', 'Appointment Booked', 'Converted', 'Lost'];
    const statusMap = {};

    statuses.forEach(status => {
      statusMap[status] = 0;
    });

    leadsData?.forEach(lead => {
      if (statusMap.hasOwnProperty(lead.status)) {
        statusMap[lead.status]++;
      }
    });

    const responseData = statuses.map(status => ({
      status,
      count: statusMap[status]
    }));

    console.log('✅ Lead Status Response:', responseData);
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

    console.log(`📊 Sales Trend Request: ${days} days (${start} to ${end})`);

    const { data: salesData, error } = await supabase
      .from('leads')
      .select('converted_date, amount')
      .eq('status', 'Converted')
      .gte('converted_date', start)
      .lte('converted_date', end);

    if (error) {
      console.error('Sales trend error:', error);
      return res.status(500).json({ error: 'Failed to fetch sales trend data' });
    }

    const dateMap = {};
    const currentDate = new Date(start);
    const endDateObj = new Date(end);

    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dateMap[dateStr] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    salesData?.forEach(sale => {
      if (sale.converted_date && sale.amount) {
        dateMap[sale.converted_date] = (dateMap[sale.converted_date] || 0) + parseFloat(sale.amount);
      }
    });

    const responseData = Object.entries(dateMap).map(([date, revenue]) => ({
      date,
      revenue: parseFloat(revenue)
    }));

    console.log(`✅ Sales Trend Response: ${responseData.length} days`);
    res.json(responseData);
  } catch (err) {
    console.error('Sales Trend Error:', err);
    res.status(500).json({ error: 'Failed to fetch sales trend data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'supabase', deployment: 'unified' });
});

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Unified Sales Dashboard running on port ${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   GET /api/health - Health check`);
  console.log(`   GET /api/dashboard/kpi?days=30 - KPI summary`);
  console.log(`   GET /api/dashboard/lead-status?days=30 - Lead status summary`);
  console.log(`   GET /api/dashboard/sales-trend?days=30 - Sales trend data`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
});
