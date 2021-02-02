// Native modules import
import _ from 'lodash';
import formidable from 'formidable';
import fs from 'fs';

// Personal modules import
import User from '../models/user.js';
import { Logger, logMoment } from '../logger/logger.js';

export const userById = (req, res, next, userId) => {
  User.findById(userId)
  .exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `Ce pirate n'existe pas ou une erreur s'est produite.`
      })
    }
    req.profile = user;
    // Logger.debug(`[back-end/src/controllers/user.js => userById:19] : user: ${user}`);
    next();
  });
};

export const hasAuthorization = (req, res, next) => {
  const sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
  const adminUser = req.profile && req.auth && req.auth.right === process.env.ADMIN_TITLE;
  
  const authorized = sameUser || adminUser;

  Logger.debug(`${logMoment.dateAndTime}: 
  [back-end/src/controllers/user.js => hasAuthorization:31] :  
  req.user: ${req.profile}
  req.auth: ${JSON.stringify(req.auth)}
  sameUser: ${sameUser}
  adminUser: ${adminUser}
  adminTitle: ${process.env.ADMIN_TITLE}
  `);

  if (!authorized) {
    return res.status(403).json({
      error: `Tu n'as pas la permission de faire ça, moussaillon, où est-ce que tu te crois ?! Chez mémé ?!`
    });
  }
  Logger.info(`${logMoment.dateAndTime}: [back-end/src/controllers/user.js => hasAuthorization:44] : successfully authorized to proceed`);
  next();
};

export const allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : [back-end/src/controllers/user.js => allUsers:51] : error: ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    return res.json(users);
  })
};

export const getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

export const updateUser = (req, res, next) => {
  let form = formidable({multiples: true});
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: `Photo was not uploaded because of error : ${err}`
      })
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();

    if (files.photo) {
      // Logger.info('A PHOTO HAS BEEN FOUND IN UPDATE USER');
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((err, updatedUser) => {
      // Logger.info(`INSIDE USER.SAVE`)
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
      Logger.debug(`${logMoment.dateAndTime}:[back-end/src/controllers/user.js => updateUser:95] : updatedUser: ${updatedUser}`);
      // Logger.debug(`${logMoment.dateAndTime}:[back-end/src/controllers/user.js => updateUser:96] : user: ${JSON.stringify(user)}`);
    })
  })
};

export const userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set('Content-Type', req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

export const deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : La méthode deleteUser a rencontré une erreur : ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    Logger.info(`${logMoment.dateAndTime} : L'utilisateur ${deletedUser.pseudo}, e-mail ${deletedUser.email}, id ${deletedUser._id} a été supprimé avec succès.`);
    return res.json({
      message: `Le pirate ${deletedUser.pseudo} dont l'adresse de courrier est ${deletedUser.email} a été annihilé. Bon vent !`
    });
  })
}