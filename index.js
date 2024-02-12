const express = require('express');
const app = express();
const env = require('./config/environment');
const db = require('./config/mongoose');
const passportLocal = require('./config/passport-local-strategy');
const customMware = require('./config/middleware');
const port = env.port;
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');


// used for session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new MongoStore(
  {
    mongooseConnection: db,
    autoRemove: 'disabled'
  },
  function(err){
    console.log(err || 'connect-mongodb setup ok')
  }
);
 

app.use(cookieParser());
app.use(expressLayouts);

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: 'placement_cell',
    // ToDo change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: sessionStore,
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

// sets the authenticated user in the response
// app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes'));

app.listen(env.port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});

