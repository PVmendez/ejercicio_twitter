const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  content: {
    type: String,
    maxLength: 140,
  },
  date: Date,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
},
{ timestamps: true },
);

module.exports = mongoose.model("Tweet", tweetSchema);
