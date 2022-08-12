const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  content: String,
  date: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
  ],
});

module.exports = mongoose.model("Tweet", tweetSchema);
