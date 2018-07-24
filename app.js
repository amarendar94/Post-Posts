//declarations
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const schema = mongoose.Schema;
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

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
    var token = jwt.sign({"uname" : req.body.username} , 'marlabs-secret-key' , {
        expiresIn: '1h'
      });

    User.findOne({
        username: req.body.username
    }).then(user => {
        if (user.username == req.body.username && user.password == req.body.password) {
            res.send({
                loggedIn: true,
                token : token,
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

app.use(function(req,res,next){
    var token = req.body.authToken || req.query.authToken || req.headers['authtoken'];
    jwt.verify(token, 'marlabs-secret-key', function(err, decoded){
        if(err){
          res.send({
            err: true,
            msg : "Invalid request"
          })
        }
        else{
            req.decoded = decoded 
            next();
        }
    });
  });

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
