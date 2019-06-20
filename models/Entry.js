const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntrySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  author: {
    type: String,
  },
  source: {
    type: String,
  },
  pageFrom: {
    type: Number,
  },
  pageTo: {
    type: Number,
  },
  files: [
    {
      type: Array,
    },
  ],
  entry: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  document: {
    type: String,
    requied: true,
  },
})

module.exports = Entry = mongoose.model('entry', EntrySchema)
