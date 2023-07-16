const seedUsers = require("./UserSeed");
const seedThoughts = require("./ThoughtSeed");
const db = require("../config/connection");

db.once("open", async () => {
  const users = await seedUsers();
  if (users) {
    const userByUsername = new Map();
    const usernames = [];
    users.forEach((user) => {
      usernames.push(user.username);
      userByUsername.set(user.username, user);
    });
    const thoughtIdByUsername = await seedThoughts(usernames);
    if (thoughtIdByUsername) {
      const userNameIterator = thoughtIdByUsername.keys();
      for (const username of userNameIterator) {
        if (userByUsername.has(username)) {
          const user = userByUsername.get(username);
          user.thoughts = thoughtIdByUsername.get(username);
          console.log(user);
          await user.save();
        }
      }
    }
  }
  process.exit(0);
});
