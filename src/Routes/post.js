// Native modules imports
import express from 'express';
import {body, validationResult} from 'express-validator';

//Personal modules imports
import {getPosts, createPost}from '../Controllers/post.js';

// Constants declaration
const router = express.Router();

router.get('/', getPosts);
router.post("/post",
  body("title", "Un titre, moussaillon !").not().isEmpty(),
  body("title", "Le titre doit faire entre 5 et 300 caractères").isLength({
    min: 5,
    max: 300,
  }),
  body("body", "Un message, moussaillon, un message !").not().isEmpty(),
  body("body", "Le message doit faire entre 5 et 3000 caractères !").isLength({
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
  },
  createPost
);
                    
export default router