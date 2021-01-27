// Native modules imports
import formidable from 'formidable';
import _ from 'lodash';

// Personal modules imports
import Post from "../Models/post.js";
import { Logger, logMoment } from '../Logger/logger.js';

export const postById = (req, res, next, id) => {
  Post.findById(id)
  .populate('author', '_id pseudo')
  .exec((err, post) => {
    if (err || !post) {
      Logger.error(`${logMoment.dateAndTime} : La méthode postById a rencontré une erreur: ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    Logger.info(`${logMoment.dateAndTime} : Les infos du post ${post._id} créé par ${post.pseudo} ont été récupérées avec succès.`);
    req.post = post;
    next();
  });
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}, {__v: false})
    .populate('author', 'id pseudo');
    return res.json({posts})
  } catch (error) {
    Logger.error(`${logMoment.dateAndTime} : La méthode getPosts a rencontré une erreur: ${error}.`);
    return res.status(400).json({
        error: error
    })
  }
};

export const createPost = async (req, res) => {
  try {
    let form = formidable({multiples: true});
    form.parse(req, (err, fields, files) => {
      if (err) {
        Logger.error(`${logMoment.dateAndTime} : La méthode form.parse() createPost a rencontré une erreur: ${err}.`);
        return res.status(400).json({
          error: `Un vent violent a empêché l'image d'être téléchargée sur le serveur, mille sabords ! (erreur 400)`
        });
      }
      let post = new Post(fields);
      const user = req.profile;
      user.hashed_password = undefined;
      user.salt = undefined;
      user.__v = undefined;
      post.author = user;
      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.path);
        post.photo.contentType = files.photo.type;
      }
      post.save((err, newPost) => {
        if (err) {
          Logger.error(`${logMoment.dateAndTime} : La méthode post.save() de createPost a rencontré une erreur: ${err}.`);
          return res.status(400).json({
            error: err
          });
        }
        Logger.info(`${logMoment.dateAndTime} : Le post ${newPost._id} créé par ${newPost.pseudo} a été créé avec succès.`);
        return res.json(newPost);
      })
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

export const postsByUser = (req, res) => {
  Post.find({author: req.profile._id})
  .populate('author', '_id pseudo')
  .sort('date')
  .exec((err, posts) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : La méthode postsByUser a rencontré une erreur: ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    return res.json(posts);
  });
};

export const updatePost = (req, res) => {
  let post = req.post;
  post = _.assignIn(post, req.body);
  post.updated = Date.now();
  post.save((err, updatedPost) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : La méthode updatePoste a rencontré une erreur: ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    Logger.info(`${logMoment.dateAndTime} : Le post ${updatedPost._id} créé par ${updatedPost.pseudo} a été mise à jour avec succès.`);
    return res.json(updatedPost);
  });
};

export const isPoster = (req, res, next) => {
  const isPoster = req.post && req.auth && String(req.post.author._id) === req.auth._id;
  // Logger.verbose('req.post.author._id', req.post.author._id)
  // Logger.silly(`Type de req.post.author._id: ${typeof req.post.author._id}`)
  // Logger.verbose('req.auth._id', req.auth._id)
  // Logger.silly(`Type de req.auth._id: ${typeof req.auth._id}`)
  // The above logs helped me understand why this boolean was always returning false while the
  // values for req.post.author._id and req.auth._id were the same. Actually, I had forgotten
  // that req.post.author._id is not of type String like req.auth._id, but of type Object (ObjectId).
  if (!isPoster) {
    Logger.error(`${logMoment.dateAndTime} : La méthode isPoster a rencontré une erreur: ${err}.`);
    return res.status(403).json({
      error: `Tu n'as pas posté ce message, pirate ! (erreur 403)`
    });
  }
  next();
};

export const deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, deletedPost) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : La méthode deletePost a rencontré une erreur: ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    Logger.info(`${logMoment.dateAndTime} : Le post ${deletedPost._id} créé par ${deletedPost.pseudo} a été supprimé avec succès.`)
    return res.json({
      message: `Le post avec id ${deletedPost._id} a bien été emporté par la marée ! (suppression confirmée)`
    });
  });
};
