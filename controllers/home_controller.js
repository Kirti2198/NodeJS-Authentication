
const User= require('../models/user');
module.exports.home = async function (req,res){
                        // console.log(req.cookies);
                        // res.cookie('user_id',25);

                        //     Post.find({}, function(err,posts){
                        //         return res.render('home', {
                        //             title: "Codeial | Home",
                        //             posts: posts
                        //      });
                        //   });

     

    return res.render('home', {
        title: "NodeJa Auth | Home",
        
     });  
         
}