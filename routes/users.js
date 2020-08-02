const express=require('express');
// using express.Router
const router=express.Router();
const userController=require('../controllers/users_controller');
router.get('/profile',userController.profile )
// export the router
module.exports=router;