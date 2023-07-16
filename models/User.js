const mongoose = require("mongoose");
const Thought = require("./Thought");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      set: (username) => username.trim(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (email) => {
        return /^([\w_\.-]+)@{1}([\w\.-]+)\.+([a-zA-Z]{2,})$/.test(email);
      },
    },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: this }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
