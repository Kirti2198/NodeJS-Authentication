// require express server
const express= require('express');
const cookieParser = require('cookie-parser');
// call the express server in a constant app
const app= express();
// define the port
// by default website run on port 80 when we deploy it to a server
const port=8000;
// require the express layout
const expressLayout= require('express-ejs-layouts');
// for database
const db = require('./config/mongoose');

// used for session cookie
const session= require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore= require('connect-mongo')(session);
const sassMiddleware= require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'extended',
    prefix: '/css'
}));

// middleware for 
app.use(express.urlencoded());
app.use(cookieParser());
// middleware to access static files
app.use(express.static('./assets'));
// tell app to use the layout
app.use(expressLayout);
// extract style and scripts from subpages into the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// for setting up the viewEngine ejs
app.set('view engine', 'ejs');
app.set('views', './views');
//  mongo-store is used to store the session cookie in the db
// middleware which is used to takes in the session-cookie and encrypts it
app.use(session({
  name: 'nodejs_authentication',
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  },
  store : new MongoStore(
      {
          mongooseConnection : db,
          autoRemove: 'disabled'
      },
      function(err){
          console.log(err || 'connect-mongodb setup ok');
      }
  )
}));
// need to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes'));

// need to make the app listen
app.listen(port, function(err){
  if(err){
      // console.log("error in running the express server:",err);
      // instead of above statement i will use interpolation using `` with $
      console.log(`Error in running the express server: ${err}`);
      return;
  }
  console.log(`Express server is running on the port: ${port}`);
})



