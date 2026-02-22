import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KPICard from './components/KPICard';
import LeadStatusSummary from './components/LeadStatusSummary';
import SalesTrendChart from './components/SalesTrendChart';
import LeadStatusChart from './components/LeadStatusChart';
import DateRangeFilter from './components/DateRangeFilter';
import './App.css';

function App() {
  const [days, setDays] = useState(30);
  const [kpi, setKpi] = useState(null);
  const [leadStatus, setLeadStatus] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async (selectedDays) => {
    setLoading(true);
    setError(null);
    try {
      const [kpiRes, leadStatusRes, salesTrendRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL || ''}/api/dashboard/kpi?days=${selectedDays}`),
        axios.get(`${process.env.REACT_APP_API_URL || ''}/api/dashboard/lead-status?days=${selectedDays}`),
        axios.get(`${process.env.REACT_APP_API_URL || ''}/api/dashboard/sales-trend?days=${selectedDays}`)
      ]);

      setKpi(kpiRes.data);
      setLeadStatus(leadStatusRes.data);
      setSalesTrend(salesTrendRes.data);
    } catch (err) {
      setError('Failed to load dashboard data. Please check your backend connection.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(days);
  }, [days]);

  const handleDateRangeChange = (selectedDays) => {
    setDays(selectedDays);
  };

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <p>Make sure the backend is running on http://localhost:5000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="dashboard-header">
        <h1>📊 Sales Dashboard</h1>
        <DateRangeFilter onRangeChange={handleDateRangeChange} />
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="spinner">Loading...</div>
        </div>
      ) : (
        <main className="dashboard-main">
          {/* KPI Cards Section */}
          <section className="kpi-section">
            <h2 className="section-title">Key Performance Indicators</h2>
            <div className="kpi-grid">
              <KPICard
                label="Total Leads"
                value={kpi?.totalLeads || 0}
                icon="📌"
              />
              <KPICard
                label="Contacted Leads"
                value={kpi?.contactedLeads || 0}
                icon="📞"
              />
              <KPICard
                label="Sales Closed"
                value={kpi?.salesClosed || 0}
                icon="✅"
              />
              <KPICard
                label="Total Revenue"
                value={`$${(kpi?.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                icon="💰"
              />
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="charts-grid">
              <div className="chart-container">
                <h3>Sales Trend (Last {days} Days)</h3>
                {salesTrend && salesTrend.length > 0 ? (
                  <SalesTrendChart data={salesTrend} />
                ) : (
                  <div className="empty-state">No sales data available</div>
                )}
              </div>

              <div className="chart-container">
                <h3>Lead Status Distribution</h3>
                {leadStatus && leadStatus.length > 0 ? (
                  <LeadStatusChart data={leadStatus} />
                ) : (
                  <div className="empty-state">No lead data available</div>
                )}
              </div>
            </div>
          </section>

          {/* Lead Status Summary */}
          <section className="summary-section">
            <h2 className="section-title">Lead Status Summary</h2>
            <LeadStatusSummary data={leadStatus} />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
