// Personal modules imports
// import { Logger, logMoment } from '../Logger/logger.js';
import Post from "../Models/post.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}, {__v: false, _id: false});
        res.json({posts})
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
};

export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const result = await post.save();
    res.json({
      post: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
