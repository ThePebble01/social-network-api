const { Thought } = require("../models");
//Comment Data Taken From 18-NoSQL/01-Activities/21-Ins_Virtuals
const rawThoughtText = [
  "Decision Trackers are awesome",
  "Find My Phone is a useful app",
  "Learn Piano is not very good for learning Piano",
  "Starbase Defender is a great game, I love it",
  "Tower Defense is okay",
  "Monopoly Money is better than real money IMO",
  "Movie trailers are just the best parts of a movie distilled into 90 seconds",
  "Hello world, this is a comment",
  "Social media is a big waste of time",
  "Notes is my most used app",
  "Messages is open on my computer 24/7",
  "Email is open on my computer",
  "Compass is never opened",
  "Firefox is great for privacy",
];
async function seedThoughts(possibleUsernames) {
  try {
    const thoughtData = buildThoughtData(possibleUsernames);
    const thoughts = await Thought.find();
    if (thoughts.length === 0) {
      const results = await Thought.insertMany(thoughtData);
      console.log("Thoughts Added!");
      const thoughtIdsByUsername = new Map();
      for (let thought of results) {
        if (thoughtIdsByUsername.has(thought.username)) {
          thoughtIdsByUsername.get(thought.username).push(thought._id);
        } else {
          thoughtIdsByUsername.set(thought.username, [thought._id]);
        }
      }
      return thoughtIdsByUsername;
    }
    return console.log("Thought collection already populated");
  } catch (err) {
    console.error("Thought seeding failed!", err);
  }
}

function buildThoughtData(possibleUsernames) {
  const resultThoughtData = [];
  for (let i = 0; i < 10; i++) {
    const thoughtUsername =
      possibleUsernames[Math.floor(possibleUsernames.length * Math.random())];
    const thoughtText =
      rawThoughtText[Math.floor(rawThoughtText.length * Math.random())];
    let numReactions = Math.floor(5 * Math.random());
    const reactions = buildReactionData(numReactions, possibleUsernames);
    resultThoughtData.push({
      thoughtText,
      username: thoughtUsername,
      reactions,
    });
  }
  return resultThoughtData;
}

function buildReactionData(numReactions, possibleUsernames) {
  const reactionResults = [];
  for (let i = 0; i < numReactions; i++) {
    const reactionBody =
      rawThoughtText[Math.floor(rawThoughtText.length * Math.random())];
    const username =
      possibleUsernames[Math.floor(possibleUsernames.length * Math.random())];
    reactionResults.push({ reactionBody, username });
  }
  return reactionResults;
}

module.exports = seedThoughts;
