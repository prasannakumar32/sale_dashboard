import pool from './db.js';

const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');

    // Create tables
    await pool.query(`
      DROP TABLE IF EXISTS leads CASCADE;
      
      CREATE TABLE leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        status VARCHAR(50) NOT NULL,
        created_at DATE NOT NULL,
        contacted_date DATE,
        amount DECIMAL(10, 2),
        converted_date DATE
      );
    `);

    console.log('Tables created successfully');

    // Insert sample data
    const statuses = ['New', 'Contacted', 'Follow Up', 'Appointment Booked', 'Converted', 'Lost'];
    let leadId = 1;

    // Generate data for the last 60 days
    for (let daysAgo = 60; daysAgo >= 0; daysAgo--) {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      const dateStr = date.toISOString().split('T')[0];

      const leadsPerDay = Math.floor(Math.random() * 8) + 3; // 3-10 leads per day

      for (let i = 0; i < leadsPerDay; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const amount = status === 'Converted' ? Math.floor(Math.random() * 50000) + 5000 : null;

        const contactedDate = ['Contacted', 'Follow Up', 'Appointment Booked', 'Converted', 'Lost'].includes(status)
          ? new Date(new Date(dateStr).getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null;

        const convertedDate = status === 'Converted'
          ? new Date(new Date(contactedDate).getTime() + Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null;

        await pool.query(
          'INSERT INTO leads (name, email, status, created_at, contacted_date, amount, converted_date) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [
            `Lead ${leadId}`,
            `lead${leadId}@example.com`,
            status,
            dateStr,
            contactedDate,
            amount,
            convertedDate
          ]
        );
        leadId++;
      }
    }

    console.log('Sample data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('Database initialization error:', err);
    process.exit(1);
  }
};

initializeDatabase();
