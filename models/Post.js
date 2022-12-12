const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//title:String, detail:String, dateCreated:Date(default now)


const PostSchema = new Schema({
    title: String,
    detail: String,
    fileName : String,
    fileUrl: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    }
  })

  const Post = mongoose.model('Posts', PostSchema);

  module.exports = Post;
