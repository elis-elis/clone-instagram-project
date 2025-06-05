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

  // Get user id
  db.get(
    "SELECT id FROM users WHERE username = ?",
    ["lolita_user"],
    (err, row) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return;
      }
      const userId = row.id;

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

      posts.forEach((post) => {
        db.run(
          `
            INSERT INTO posts (user_id, image_url, title, description)
            VALUES (?, ?, ?, ?)
          `,
          [userId, post.image_url, post.title, post.description],
          (err) => {
            if (err) {
              console.error("Error instering post:", err.message);
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

          const postId = row.id;
          db.run(
            `
            INSERT INTO comments (post_id, user_id, content)
            VALUES (?, ?, ?)
            `,
            [postId, userId, "Looks fabulous!"],
            (err) => {
              if (err) {
                console.error("Error inserting comment:", err.mesage);
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

db.close((err) => {
  if (err) {
    console.error("Error closing database", err.message);
  } else {
    console.log("Database connection closed.");
  }
});
