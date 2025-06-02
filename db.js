// db.js
import sqlite3 from "sqlite3";

// Create a new database or open existing one
const db = new sqlite3.verbose().Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Execute schema to initialize the tables
const schema = fs.readFileSync("./schemas/init.sql", "utf-8");
db.exec(schema, (err) => {
  if (err) {
    console.error("Failed to inititialze the database schema:", err);
  } else {
    console.log("Databse schema initialized.");
  }
});

// Reuse the same database instance
module.exports = db;
