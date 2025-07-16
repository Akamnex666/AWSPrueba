import { createPool, Pool } from 'mysql2/promise';

// ...existing code...
const pool: Pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
  // ssl: { rejectUnauthorized: false } // Quita esta línea si usas MySQL local
});
// ...existing code...
export async function connect() {
  return pool;
}

export async function query(sql: string, values?: any[]) {
  const [rows] = await pool.execute(sql, values || []);
  return rows;
}