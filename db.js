// db.js
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Create a new database or open existing one
const db = new sqlite3.Database("./profile-page-project.db", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
    process.exit(1); // Exit on failure
  } else {
    console.log("Connected to SQLite database: profile-page-project.db");
  }
});

// Execute schema to initialize the tables
try {
  const schema = fs.readFileSync("./schemas/init.sql", "utf-8");
  db.exec(schema, (err) => {
    if (err) {
      console.error("Failed to initialze the database schema:", err.message);
    } else {
      console.log("Databse schema initialized.");
    }
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Databse connection closed.");
      }
    });
  });
} catch (err) {
  console.error("Error reading schema file:", err.message);
  db.close();
  process.exit(1);
}

// Reuse the same database instance
module.exports = db;
