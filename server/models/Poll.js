// server/models/Poll.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// schema for one option
const optionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const PollSchema = new Schema({
//for the user who created the poll
    user: {
    type: Schema.Types.ObjectId, // This stores the user's _id
    ref: 'User', //referring to user model
    required: true,
  },
  question: {
    type: String,
    required: [true, 'Please provide a poll question'],
    unique: true,
  },
//using option model in poll model
  options: [optionSchema],
  votedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Poll', PollSchema);