const pool = require('./config/db'); // db.js ka path

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS time');
    console.log('✅ Database connected! Time from DB:', rows[0].time);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}

testConnection();
