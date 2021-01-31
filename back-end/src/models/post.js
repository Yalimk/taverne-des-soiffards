// Native modules import
import mongoose from "mongoose";

// Constants declaration
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: Date,
});

export default mongoose.model("Post", postSchema);
