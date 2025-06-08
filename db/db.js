// db.js
const sqlite3 = require("sqlite3").verbose();

// Create a new database or open existing one
const db = new sqlite3.Database("./profile-page-project.db", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
    process.exit(1); // Exit on failure
  } else {
    console.log("Connected to SQLite database: profile-page-project.db");
  }
});

// Reuse the same database instance
module.exports = db;
