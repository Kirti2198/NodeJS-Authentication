const express= require('express');
// using express.Router
const router= express.Router();
const passport= require('passport');

const usersController= require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.get('/sign-in', usersController.signInUser);
router.get('/sign-up', usersController.signUpUser);
router.post('/create', usersController.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
    ),usersController.createSession);

router.get('/sign-out', usersController.destroySession);
router.get('/reset-password',usersController.resetPassword);


module.exports= router;