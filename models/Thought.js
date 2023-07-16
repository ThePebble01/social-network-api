const { mongoose, ObjectId } = require("mongoose");
const dateformat = require("dateformat");
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: ObjectId,
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
    default: Date.now,
    get: (createdDate) => dateFormat(createdDate, "mmmm dS, yyyy, h:MM:ss TT"),
  },
});
const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdDate) => dateFormat(createdDate, "mmmm dS, yyyy, h:MM:ss TT"),
  },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
