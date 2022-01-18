import express from 'express';
const router = express.Router();

/**
 * 
 */
router.use('/auth', require('./authRouter'));
/**
 * 
 */
router.use('/user', require('./userRouter'));

module.exports = router