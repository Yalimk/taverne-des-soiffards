// Native modules imports
import express from 'express';
import {body, validationResult} from 'express-validator';

//Personal modules imports
import {getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost}from '../Controllers/post.js';
import {userById} from '../Controllers/user.js';
import {requireSignin} from '../Controllers/auth.js';

// Constants declaration
const router = express.Router();

// Route for getting all the posts
router.get(
  '/posts',
  getPosts);

// Route for posting a new message
router.post(
  '/post/new/:userId',
  requireSignin,
  createPost,
  body('title', 'Un titre, moussaillon !').notEmpty(),
  body('title', 'Le titre doit faire entre 5 et 300 caractères').isLength({
    min: 5,
    max: 300,
  }),
  body('body', 'Un message, moussaillon, un message !').notEmpty(),
  body('body', 'Le message doit faire entre 5 et 3000 caractères !').isLength({
    min: 5,
    max: 3000,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(400).json({error: firstError});
    }
    next();
  }
);

// Route for getting all posts from a certain user
router.get('/posts/by/:userId', requireSignin, postsByUser);

// Route for updating a post
router.put('/post/:postId', requireSignin, isPoster, updatePost);

// Route for deleting a post
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

// Router to check for user id in parameters
router.param('userId', userById);

// Router to check for post id in parameters
router.param('postId', postById);
                    
export default router