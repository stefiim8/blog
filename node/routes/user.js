const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/signup', userController.getSignUp);

router.post('/signup', userController.postSignUp);

router.post('/login', userController.postLogin);

router.post('/verify', userController.authenticateJWT, userController.verifyUser);

router.post('/blogpost', userController.authenticateJWT, userController.blogPost);

router.get('/posts', userController.authenticateJWT, userController.getPosts);

router.post('/logout', userController.logout);


module.exports = router;
