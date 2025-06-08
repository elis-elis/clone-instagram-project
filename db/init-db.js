// init-db.js
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Create or open the database
const db = new sqlite3.Database("./profile-page-project.db", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  } else {
    console.log("Connected to SQLite database: profile-page-project.db");
  }
});

// Execute schema to initialize tables
try {
  const schema = fs.readFileSync("./schemas/init.sql", "utf-8");
  db.exec(schema, (err) => {
    if (err) {
      console.error("Failed to initialize database schema:", err.message);
    } else {
      console.log("Database schema initialized.");
    }
  });
} catch (err) {
  console.error("Error reading schema file:", err.message);
  db.close();
  process.exit(1);
}
