const express=require('express');
// using express.Router
const router=express.Router();
const homeController=require('../controllers/home_controller');
router.get('/', homeController.home);
router.use('/users', require('./users'));

// export the router
module.exports=router;