const thoughtRouter = require("express").Router();
const { Thought, User } = require("../../models");

thoughtRouter.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    if (thoughts) {
      res.status(200).json(thoughts);
    } else {
      res.status(404).json({ error: "There are no thoughts in the database." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
thoughtRouter.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.id });
    if (thought) {
      res.status(200).json(thought.toJSON({ getters: true }));
    } else {
      res.status(404).json({
        error: `There are no thoughts in the database with an id of ${req.params.id}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
thoughtRouter.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const newThought = await Thought.create(req.body);
      if (newThought) {
        user.thoughts.push(newThought._id);
        await user.save();
        res.status(200).json(newThought);
      } else {
        res.status(500).json({ error: "Something went wrong" });
      }
    } else {
      res.status(404).json({
        message: `Could not find user with username of ${req.body.username}, therefore no thought was created.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
thoughtRouter.put("/:id", async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (thought) {
      res.status(200).json(thought.toJSON({ getters: true }));
    } else {
      res.status(404).json({
        error: `Unable to find and update thought with an id of ${req.params.id}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
thoughtRouter.delete("/:id", async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id });
    if (thought) {
      res
        .status(200)
        .json({ message: "Successfully deleted a thought", thought });
    } else {
      res.status(404).json({
        error: `Unable to find and update thought with an id of ${req.params.id}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = thoughtRouter;
