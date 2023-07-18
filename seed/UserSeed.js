const { User } = require("../models");
async function seedUsers() {
  try {
    const users = await User.find();
    if (users.length === 0) {
      const results = await User.insertMany([
        {
          username: "lernantino",
          email: "lernantino@aol.com",
        },
        {
          username: "ramon",
          email: "ramon.wiggums@aol.com",
        },
        {
          username: "aLincoln",
          email: "honesty@ponyexpress.us",
        },
        {
          username: "jgo",
          email: "orange@msn.com",
        },
      ]);
      const [user1, user2, user3, user4] = results; //Intentionally dry friend-associations.
      user1.friends.push(user2);
      user1.friends.push(user3);
      user1.friends.push(user4);
      await user1.save();
      user2.friends.push(user1); //Friendship is a symetric relation...stalking is asymetric.
      user2.friends.push(user3);
      await user2.save();
      user3.friends.push(user1);
      user3.friends.push(user2);
      await user3.save();
      user4.friends.push(user1);
      await user4.save();
      console.log("Users Added!");
      return results;
    }
    console.log("User collection already populated");
    return users;
  } catch (err) {
    console.error("User seeding failed!", err);
  }
}

module.exports = seedUsers;
