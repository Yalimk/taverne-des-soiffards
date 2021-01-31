// Native modules import
import express from 'express';
// import {body, validationResult} from 'express-validator';

//Personal modules import
import {userById, allUsers, getUser, updateUser, deleteUser, userPhoto} from '../controllers/user.js';
import {requireSignin} from '../controllers/auth.js';

// Constants declaration
const router = express.Router();

// Route for getting all the users
router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);
router.get('/user/photo/:userId', userPhoto);

// Router to check for user id in parameters
router.param('userId', userById);

export default router;