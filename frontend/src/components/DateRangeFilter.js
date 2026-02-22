import React from 'react';
import './DateRangeFilter.css';

function DateRangeFilter({ onRangeChange }) {
  const handleChange = (e) => {
    onRangeChange(parseInt(e.target.value));
  };

  return (
    <div className="date-range-filter">
      <label htmlFor="range-select">Filter by:</label>
      <select id="range-select" onChange={handleChange} defaultValue="30">
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
    </div>
  );
}

export default DateRangeFilter;
