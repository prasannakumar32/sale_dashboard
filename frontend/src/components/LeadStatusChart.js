import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function LeadStatusChart({ data }) {
  const COLORS = {
    'New': '#667eea',
    'Contacted': '#48bb78',
    'Follow Up': '#ed8936',
    'Appointment Booked': '#f6ad55',
    'Converted': '#38a169',
    'Lost': '#e53e3e'
  };

  const chartData = data.map(item => ({
    name: item.status,
    value: item.count
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#667eea'} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} leads`, 'Count']}
          contentStyle={{
            backgroundColor: '#2d3748',
            border: 'none',
            borderRadius: '8px',
            color: 'white'
          }}
          labelStyle={{ color: 'white' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default LeadStatusChart;
