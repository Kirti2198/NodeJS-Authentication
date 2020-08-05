const User= require('../models/user');
const jwt= require('jsonwebtoken');
const fs=require('fs');
const path=require('path');
// lets keep it same as before
module.exports.profile= function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile', {
            title: "User profile",
            profile_user: user
        });
    });    
}

// module.exports.update= function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('UnAuthorized');
//     }
// }

module.exports.update= async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('****Multer Error:',err);return;}
                // I wont be able to access req.body without multer
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                   if(user.avatar){
                       fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                   }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar= User.avatarPath +'/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }   
    }else{
        req.flash('error', 'UnAuthorized');
        return res.status(401).send('UnAuthorized');
    }
}

module.exports.createUser= function(req,res){
    return res.end('<h1> Create a new User </h1>');
}
// render the sign in page
module.exports.signInUser= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In "
    });
}
// render the sign up page
module.exports.signUpUser= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up "
    });
}

// get the SignUp data
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log("error in finding user and signing up"); return;}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log("error in creating user while signing up"); return;}

                return res.redirect('/users/sign-in');
            });
        }else{
            res.redirect('back');
        }
        
    })

}

// sign in and create a session for the user
module.exports.createSession= function(req,res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/');
}

// sign out function
module.exports.destroySession= function(req,res){
    // before redirecting we need to log out
    req.logout();
    req.flash('success','You have Logged Out');
    return res.redirect('/');
}

// render the reset password page

module.exports.resetPassword= async function(req,res){

    // if(req.isAuthenticated()){
    //     return res.redirect('/users/reset-password')
    // }
    try{
        let cookieExtractor =await function(req) {
            let token = null;
            if (req && req.cookies)
            {
                token = req.cookies['jwt'];
                
            }
            return res.render('reset_password', {
                title: "NodeJS Auth | Reset Password ",
                reset_password_link: token
            });
        };
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }    
}


