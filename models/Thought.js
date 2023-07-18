const { mongoose } = require("mongoose");
const dateformat = require("dateformat");
const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdDate) =>
        dateformat(createdDate, "mmmm dS, yyyy, h:MM:ss TT"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdDate) =>
        dateformat(createdDate, "mmmm dS, yyyy, h:MM:ss TT"),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;
