const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');
const bodyParser = require('body-parser');
const passport = require('passport');

//init app
const app = express();
const db = require('./config/keys').mongoURI;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connect to mongoDB
mongoose.connect(db)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

require('./config/passport' )(passport);


//use routes
app.use('/api/user', users );
app.use('/api/profile', profile );
app.use('/api/post', post );

const port = process.env.port || 5000;

app.listen(port, function () {
    console.log('server running on ' + port)
})

