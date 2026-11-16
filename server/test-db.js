import db from "./db.js";

try {
  const [rows] = await db.query("SELECT DATABASE() AS databaseName");
  console.log("Database connected successfully!");
  console.log("Connected database:", rows[0].databaseName);
} catch (error) {
  console.error("Database connection failed:", error.message);
} finally {
  await db.end();
}