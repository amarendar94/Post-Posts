//declarations
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const schema = mongoose.Schema;
const bodyParser = require("body-parser");

//body-parser stuff
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors stuff
app.use(cors({ origin: 'http://localhost:4200' }));


//mongodb stuff
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ang6test");
var db = mongoose.connection;
db.on("error", function () {
    console.log("db connection error");
});
db.on("open", function () {
    console.log("connection established");
});

//schemas for mongoDB
const userSchema = new schema({
    username: String,
    password: String
});
const postSchema = new schema({
    username: String,
    title: String,
    description: String,
    liked: Boolean,
    comments: [String],
});
mongoose.model('users', userSchema);
mongoose.model('posts', postSchema);
const User = mongoose.model("users");
const Post = mongoose.model("posts");

app.post('/register', (req, res) => {
    var newUser = {
        username: req.body.username,
        password: req.body.password
    };

    new User(newUser).save().then(function (user) {
        res.send(user);
    });
})

app.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (user.username == req.body.username && user.password == req.body.password) {
            res.send({
                loggedIn: true,
                user:user
            });
        }
        else {
            res.send({
                loggedIn: false
            })
        }
    })
})

app.post('/posts', (req, res) => {
    var newPost = {
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        liked: false,
        comments: []
    };

    new Post(newPost).save().then(function (post) {
        res.send(post);
    });
})

app.get('/posts/:username', (req, res) => {
    Post.find({
        username: req.params.username
    }).then(posts => {
        res.send(posts);
    })

})











app.listen(5000, () => console.log("listening on port 5000"));
