const express= require('express');
// using express.Router
const router= express.Router();
// require the home_controller
const homeController= require('../controllers/home_controller');


// get access to the home_controller home action
router.get('/', homeController.home);
// require other routes
router.use('/users', require('./users'));
router.use('/api', require('./api'));


// for any further routes
//  router.use('/routerName',require('./routerFile);





// console.log('router is loaded');
// export the router
module.exports= router;
