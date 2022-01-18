import express from 'express';
const router = express.Router();

import {auth} from './../middleware'
import {userValidRule, valid} from './../validation'
import {userController} from './../controller'

/**
 * 
 */
router.get('/user-list', auth.verifyToken, userController.userListing);


module.exports = router 