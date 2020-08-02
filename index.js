// require express server
const express= require('express');
// call the express server in a constant app
const app= express();
// define the port
// by default website run on port 80 when we deploy it to a server
const port=8000;
// require the express layout
const expressLayout= require('express-ejs-layouts');
// for database
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
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



