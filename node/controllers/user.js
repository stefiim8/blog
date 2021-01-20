const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
let refreshTokens = [];

exports.getSignUp = (req,res,next) => {
    //console.log(req.body);
    res.send("<h1>Hello</h1><form method='POST'><button type='submit'>POST</button></form> ");
}

exports.postSignUp = (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confPass = req.body.confPass
    const posts = [];
    const user = new User({
        name:name,
        email:email,
        password:password,
        posts: posts
    });
    let message = {
        existingEmail: false,
        samePassword: true,
    }
    User.findOne({email: email})
        .then(result => {
            if(result){
                message.existingEmail = true;
                res.send(message);
            }
            else{
                if(password !== confPass){
                    message.samePassword = false;
                    res.send(message);
                }
                else{
                    user.save()
                        .then(result => {
                            res.send(message);
                        })
                }
            }
        })
}


exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        .then(result=> {
            if(password === result.password){
                
                // Generate jwt access token 

                const accesToken = jwt.sign({id: result.id}, accessTokenSecret)
                const name = result.name;
                const posts = result.posts
                res.json({accesToken,email,name,posts});
            }
            res.send(false);
        })
        .catch(err => false);
}

exports.authenticateJWT = (req,res,next) => {
    const authHeader = req.headers;

    if (authHeader) {
        token = authHeader.authorization.replace('Bearer ','');
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

exports.verifyUser = (req,res,next) => {
    res.send(true);
}

exports.blogPost = (req,res,next) => {
    User.findOne({_id: new mongodb.ObjectId(req.user.id)}) 
        .then(result => {
            if(result){
                const title = req.body.data;
                const content = req.body.data;
                const name = result.name;
                const post = new Post({
                    title: title,
                    name: name,
                    content: content
                });
                const postUser = {
                    post: {
                        title: title,
                        content: content
                    }
                };
                result.posts.push(postUser);
                result.save().then(() => {
                    post.save().then(() =>{
                        return res.send(true);
                    })
                    .catch(err => {return res.send(err)})
                })
                .catch(err => {return res.send(err)});
            }
            else{
                console.log("nok");
            }
        })
        .catch(err => {return res.send(err)})
}
    
exports.getPosts = (req,res,next) => {
    User.findOne({_id: new mongodb.ObjectId(req.user.id)})
        .then(result => {
            Post.find()
                .then(posts => {
                    res.send(posts);
                })
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err))
}

exports.logout = (req, res, next) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);
    res.send(true);
}

