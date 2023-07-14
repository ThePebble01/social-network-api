const thoughtRouter = require("express").Router();
const Thought = require("../../models/Thought");

thoughtRouter.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    if (newThought) {
      res.status(201).json(newThought);
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err); //review passing thoughtful errors
  }
});

module.exports = thoughtRouter;
