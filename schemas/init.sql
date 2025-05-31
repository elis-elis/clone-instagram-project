-- Users Table
CREATE TABLE IF OT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    bio TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create index for user lookups
CREATE INDEX IF NOT EXISTS indx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS indx_users_username ON users(username);

-- Images Table
CREATE TABLE IF OT EXISTS images(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    file_path TEXT NOT NULL;
    upload_date TEXT DEFAULT CURRENT_TIMESTAMP,
    title TEXT,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index for finding a user's images
CREATE INDEX IF NOT EXISTS indx_images_user_id ON images(user_id);
