// utils_db/mysqlClient.js
import mysql from 'mysql2/promise';

export default class MySQLClient {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Tata@1991',
      database: process.env.DB_NAME || 'Customer',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async executeQuery(query, params = []) {
    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  async close() {
    await this.pool.end();
  }
}
