const mongoose = require("mongoose")

const repliesSchema = new mongoose.Schema({
  user: { type: String, required: true },
  reply: { type: String, required: true },
  likes: { type: Number, required: true },
  date: { type: Date, required: true, default: () => new Date(Date.now()) },
})

const commentsSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true, default: () => new Date(Date.now()) },
  likes: { type: Number, default: 0},
  replies: [repliesSchema]
})

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true, default: () => new Date(Date.now()) },
  comments: [commentsSchema]
})


module.exports = mongoose.model("Blog", BlogSchema)