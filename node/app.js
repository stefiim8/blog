const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const User = require('./models/user');
const bodyParser = require('body-parser');
var cors = require('cors')


const app = express();

const userRoutes = require('./routes/user');

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


app.use(cors());

app.use(userRoutes);

mongoose.connect('mongodb+srv://admin:lBjHY0IkzEkjLe9l@cluster0.olvul.mongodb.net/test?retryWrites=true&w=majority')
    .then(result => {
        console.log('Connected!');
        app.listen(3000);
    })
    .catch(err => console.log(err));