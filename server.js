const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const post = require('./routes/api/post')

//init app
const app = express();
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose.connect(db)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

app.get('/', function (req, res) {
    res.send('Server Running!');
});
//use routes

app.use('/api/user', users );
app.use('/api/profile', profile );
app.use('/api/post', post );

const port = process.env.port || 5000;

app.listen(port, function () {
    console.log('server running on ' + port)
})

