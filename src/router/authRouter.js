import express from 'express';
const router = express.Router();

import {auth} from './../middleware'
import {userValidRule, valid} from './../validation'
import {authController} from './../controller'

/**
 * 
 */
router.post('/signup', userValidRule.userValidRule(), valid.validate, authController.userSignup);
/**
 * 
 */
router.post('/login', authController.userLogin);
/**
 * 
 */
router.post('/forgot-password', authController.forgotPassword);

module.exports = router 