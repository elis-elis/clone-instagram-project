// Serves static files (e.g., CSS, JavaScript, images).
// Provides database access to handle CRUD operations
// (e.g., fetching user data, updating profiles, adding posts/comments/likes).

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const db = require("./db/db.js"); // Middleware for static files and form parsing

app.use(bodyParser.urlencoded({ extended = false }));
app.use(express.static(path.join(__dirname, '.')));
app.set('view engine', 'ejs');

// Route to render profile page
