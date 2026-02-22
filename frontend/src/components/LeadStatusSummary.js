import React from 'react';
import './LeadStatusSummary.css';

function LeadStatusSummary({ data }) {
  const statusColors = {
    'New': '#667eea',
    'Contacted': '#48bb78',
    'Follow Up': '#ed8936',
    'Appointment Booked': '#f6ad55',
    'Converted': '#38a169',
    'Lost': '#e53e3e'
  };

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="lead-status-summary">
      <table className="summary-table">
        <thead>
          <tr>
            <th>Lead Status</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.status}>
              <td>
                <div className="status-cell">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: statusColors[item.status] || '#667eea' }}
                  ></span>
                  <span>{item.status}</span>
                </div>
              </td>
              <td className="count-cell">{item.count}</td>
              <td className="percentage-cell">
                {total > 0 ? ((item.count / total) * 100).toFixed(1) : 0}%
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="3" className="empty-row">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="summary-footer">
        <strong>Total Leads: {total}</strong>
      </div>
    </div>
  );
}

export default LeadStatusSummary;
