// Native modules imports
import express from 'express';
// import {body, validationResult} from 'express-validator';

//Personal modules imports
import {userById, allUsers, getUser, updateUser, deleteUser} from '../Controllers/user.js';
import {requireSignin} from '../Controllers/auth.js';

// Constants declaration
const router = express.Router();

// Route for getting all the users
router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);

// Router to check for user id in parameters
router.param('userId', userById);

export default router;