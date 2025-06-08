const db = require("./db.js");

db.serialize(() => {
  // Insert a user
  db.run(
    `
    INSERT OR IGNORE INTO users (username, email, password_hash, bio, avatar_url)
    VALUES (?, ?, ?, ?, ?)
  `,
    [
      "lolita_user",
      "lolita@example.de",
      "lolita's_hashed_password_0101",
      "Lolita's bio goes here, if she wants",
      "https://picsum.photos/50",
    ],
    (err) => {
      if (err) {
        console.error("Error inserting user:", err.message);
        return;
      }
    },
  );

  // Get user id
  db.get(
    "SELECT id FROM users WHERE username = ?",
    ["lolita_user"],
    (err, row) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return;
      }
      if (!row) {
        console.error("User nor found: lolita_user");
        return;
      }
      const userId = row.id;
      console.log(`Fetched user ID: ${userId}`);

      // Insert posts
      const posts = [
        {
          image_url: "https://picsum.photos/303",
          title: "Beautiful Moment",
          description: "A stunning capture",
        },
        {
          image_url: "https://picsum.photos/298",
          title: "Nature Vibes",
          description: "Embracing the outdoors",
        },
        {
          image_url: "https://picsum.photos/302",
          title: "City Lights",
          description: "Urban glow",
        },
        {
          image_url: "https://picsum.photos/300",
          title: "Artistic Capture",
          description: "Creative shot",
        },
        {
          image_url: "https://picsum.photos/299",
          title: "Sunset Glow",
          description: "Evening beauty",
        },
        {
          image_url: "https://picsum.photos/301",
          title: "Morning Calm",
          description: "Peaceful start",
        },
        {
          image_url: "https://picsum.photos/305",
          title: "Abstract Art",
          description: "Unique patterns",
        },
        {
          image_url: "https://picsum.photos/298",
          title: "Urban Exploration",
          description: "City adventures",
        },
        {
          image_url: "https://picsum.photos/304",
          title: "Dreamy Skies",
          description: "Sky at dusk",
        },
      ];

      let pendingOperations = posts.length + 2; // Posts + comment + like

      posts.forEach((post) => {
        db.run(
          `
            INSERT INTO posts (user_id, image_url, title, description)
            VALUES (?, ?, ?, ?)
          `,
          [userId, post.image_url, post.title, post.description],
          (err) => {
            if (err) {
              console.error("Error insetring post:", err.message);
            } else {
              console.log();
              console.log(`Post inserted: ${post.title}`);
            }
            if (--pendingOperations === 0) {
              closeDatabase();
            }
          },
        );
      });

      // Insert a comment
      db.get(
        "SELECT id FROM posts WHERE image_url = ?",
        ["https://picsum.photos/303"],
        (err, row) => {
          if (err) {
            console.error("Error fetching post:", err.message);
            return;
          }
          if (!row) {
            console.error("Post not found: https://picsum.photos/303");
            return;
          }

          const postId = row.id;
          db.run(
            `
            INSERT INTO comments (post_id, user_id, content)
            VALUES (?, ?, ?)
            `,
            [postId, userId, "Looks fabulous!"],
            (err) => {
              if (err) {
                console.error("Error inserting comment:", err.message);
              }
            },
          );

          // Insert a like
          db.run(
            `
            INSERT OR IGNORE INTO likes (post_id, user_id)
            VALUES (?, ?)
          `,
            [postId, userId],
            (err) => {
              if (err) {
                console.error("Error inserting like:", err.message);
              }
            },
          );
        },
      );
    },
  );

  console.log("Seed data inserted.");
});

// Close the database after all operations
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error("Error closing database", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
}
