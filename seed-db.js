const db = require("./db.js");

db.serialize(() => {
  // Insert a user
  db.run(
    `
  INSERT OR IGNORE INTO users (username, email, assword_hash, bio, avatar_url)
  VALUES (?, ?, ?, ?, ?)
  `,
    [
      "lolita_user",
      "lolita@example.de",
      'lolita"s_hashed_password_0101',
      'Lolita"s bio goes here, if she wants',
      "https://picsum.photos/50",
    ],
    (err) => {
      if (err) {
        console.error("Error inserting user:", err.message);
      }
    },
  );
});
