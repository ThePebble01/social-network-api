const userRouter = require("express").Router();
const { Thought, User } = require("../../models");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "There are no users in the database." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        error: `There are no users in the database with an id of ${req.params.id}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
userRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
userRouter.put("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        error: `Unable to find and update user with an id of ${req.params.id}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (user) {
      await Thought.deleteMany({
        username: user.username,
      });
      res.status(200).json({ message: "Successfully deleted a user", user });
    } else {
      res.status(404).json({
        error: `Unable to delete a user with an id of ${req.params.id}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
userRouter.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const targetUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    const targetFriend = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } },
      { new: true }
    );
    if (targetUser && targetFriend) {
      res.status(200).json({
        message: "Friends have been updated!",
        friend1: targetUser,
        friend2: targetFriend,
      });
    } else {
      res.status(404).json({
        error: `Unable to find and update user with an id of ${req.params.userId}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
userRouter.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const targetUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    console.log(targetUser);
    const targetFriend = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.userId } },
      { new: true }
    );
    if (targetUser && targetFriend) {
      res.status(200).json({
        message: "Friends have been torn apart!",
        friend1: targetUser,
        friend2: targetFriend,
      });
    } else {
      res.status(404).json({
        error: `Unable to remove friend (id = ${req.params.friendId}) for user with id of ${req.params.userId}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = userRouter;
