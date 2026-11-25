
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: isProduction,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
