import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});


const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

//DATA HANDLING

// Function to fetch table data
async function fetchTableData(tableName: string): Promise<any[]> {
  const result = await pool.query('SELECT id, name FROM $1')[tableName];
  return result.rows;
}

export { pool, connectToDb, fetchTableData };
