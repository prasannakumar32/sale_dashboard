import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function SalesTrendChart({ data }) {
  const formatCurrency = (value) => {
    return `$${(value / 1000).toFixed(1)}K`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          stroke="#718096"
          style={{ fontSize: '0.85rem' }}
        />
        <YAxis
          stroke="#718096"
          style={{ fontSize: '0.85rem' }}
          tickFormatter={formatCurrency}
        />
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{
            backgroundColor: '#2d3748',
            border: 'none',
            borderRadius: '8px',
            color: 'white'
          }}
          labelStyle={{ color: 'white' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#667eea"
          dot={{ fill: '#667eea', r: 4 }}
          activeDot={{ r: 6 }}
          strokeWidth={2}
          name="Revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SalesTrendChart;
