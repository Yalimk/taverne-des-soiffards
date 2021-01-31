// Native modules import
import formidable from "formidable";
import _ from "lodash";
import fs from "fs";

// Personal modules import
import Post from "../models/post.js";
import { Logger, logMoment } from "../logger/logger.js";

export const postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("author", "_id pseudo")
    .select("_id title body created photo")
    .exec((err, post) => {
      if (err || !post) {
        Logger.error(
          `${logMoment.dateAndTime} : La méthode postById a rencontré une erreur: ${err}.`
        );
        return res.status(400).json({
          error: err,
        });
      }
      req.post = post;
      next();
    });
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "_id pseudo")
      .select("_id title body created")
      .sort({ created: -1 });
    return res.json(posts);
  } catch (error) {
    Logger.error(
      `${logMoment.dateAndTime} : La méthode getPosts a rencontré une erreur: ${error}.`
    );
    return res.status(400).json({
      error: error,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        Logger.error(
          `${logMoment.dateAndTime} : La méthode form.parse() createPost a rencontré une erreur: ${err}.`
        );
        return res.status(400).json({
          error: `Un vent violent a empêché l'image d'être téléchargée sur le serveur, mille sabords ! (erreur 400)`,
        });
      }
      let post = new Post(fields);
      const user = req.profile;
      user.hashed_password = undefined;
      user.salt = undefined;
      user.__v = undefined;
      post.author = req.profile;
      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.path);
        post.photo.contentType = files.photo.type;
      }
      post.save((err, newPost) => {
        if (err) {
          Logger.error(
            `${logMoment.dateAndTime} : La méthode post.save() de createPost a rencontré une erreur: ${err}.`
          );
          return res.status(400).json({
            error: err,
          });
        }
        Logger.info(
          `${logMoment.dateAndTime} : Le post ${newPost._id} créé par ${post.author.pseudo} a été créé avec succès.`
        );
        return res.json(newPost);
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

export const postsByUser = (req, res) => {
  Post.find({ author: req.profile._id })
    .populate("author", "_id pseudo")
    .sort("date")
    .exec((err, posts) => {
      if (err) {
        Logger.error(
          `${logMoment.dateAndTime} : La méthode postsByUser a rencontré une erreur: ${err}.`
        );
        return res.status(400).json({
          error: err,
        });
      }
      res.json(posts);
    });
};

export const isPoster = (req, res, next) => {
  const isPoster =
    req.post && req.auth && req.post.author._id == req.auth._id;
  if (!isPoster) {
    Logger.error(
      `${logMoment.dateAndTime}: The method isPoster in post controller encountered the error: ${err}.`
    );
    return res.status(403).json({
      error: `Tu n'as pas posté ce message, pirate ! (erreur 403)`,
    });
  }
  next();
};

export const updatePost = (req, res, next) => {
  let form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: `The image couldn't be uploaded using updatePost because of error: ${err}`,
      });
    }
    let post = req.post;
    post = _.extend(post, fields);
    post.updated = Date.now();

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: `The method post.save in post controller failed because of error: ${err}`,
        });
      }
      res.json(post);
    });
  });
};

export const deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, deletedPost) => {
    if (err) {
      Logger.error(
        `${logMoment.dateAndTime}: the method deletePost in post controller encountered the error: ${err}.`
      );
      return res.status(400).json({
        error: err,
      });
    }
    Logger.info(
      `${logMoment.dateAndTime} : Le post ${deletedPost._id} créé par ${deletedPost.author.pseudo} a été supprimé avec succès.`
    );
    res.json({
      message: `Le post avec id ${deletedPost._id} a bien été emporté par la marée ! (suppression confirmée)`,
    });
  });
};

export const postPhoto = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

export const displayPost = (req, res) => {
  Logger.verbose(`${logMoment.dateAndTime}: inside displayPost function in post controller`)
  return res.json(req.post);
};
