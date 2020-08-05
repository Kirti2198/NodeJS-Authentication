const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newPassword = (req,res) => {
    let user=req.user;
    let htmlString = nodeMailer.renderTemplate({reset_password_link:reset_password_link }, '/passwords/reset_password.ejs');
    nodeMailer.transporter.sendMail({
       from: 'kirti2198@gmail.com',
       to: req.user.email,
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}