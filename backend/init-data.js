import { supabase } from './supabase.js';

const initializeData = async () => {
  try {
    console.log('🚀 Initializing sample data...');
    
    // Clear existing data
    await supabase.from('leads').delete().neq('id', -1);
    console.log('🧹 Cleared existing data');

    // Generate sample data
    const statuses = ['New', 'Contacted', 'Follow Up', 'Appointment Booked', 'Converted', 'Lost'];
    const leads = [];

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

        const convertedDate = status === 'Converted' && contactedDate
          ? new Date(new Date(contactedDate).getTime() + Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null;

        leads.push({
          name: `Lead ${leads.length + 1}`,
          email: `lead${leads.length + 1}@example.com`,
          status,
          created_at: dateStr,
          contacted_date: contactedDate,
          amount,
          converted_date: convertedDate
        });
      }
    }

    // Insert data in batches
    const batchSize = 20;
    let insertedCount = 0;

    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      const { error: insertError } = await supabase.from('leads').insert(batch);
      
      if (insertError) {
        console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, insertError.message);
      } else {
        insertedCount += batch.length;
        console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(leads.length / batchSize)} - ${insertedCount} leads inserted`);
      }
    }

    console.log(`🎉 Successfully created ${insertedCount} sample leads!`);
    console.log('🚀 Database is ready! Start server with: npm start');
    process.exit(0);
  } catch (err) {
    console.error('❌ Initialization failed:', err.message);
    process.exit(1);
  }
};

initializeData();
