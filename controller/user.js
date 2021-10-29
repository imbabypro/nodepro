var mongoose = require('mongoose');
const users = require('../models/user');
const books = require('../models/book');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//register
exports.signUp = (req, res) => {
    let validateEmail = validator.isEmail(req.body.email);
    let validatePassword = validator.isStrongPassword(req.body.password);
    let validusername = validator.isAlpha(req.body.username);
    if (validateEmail && validatePassword && validusername) {
        var user = new users({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10), 
            email: req.body.email,
        })

    } else {
        res.status(401).send(`unvailed Email or password`)
    }
    user.save()
        .then(userData => {
            res.send(userData)
        }).catch(err => {
            res.status(401).send(err)
        })

}
// login
exports.login = (req, res) => {           
    users.findOne({ email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).send("serever error");
            }
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).send("user not found please register");
        }
        const userToken = jwt.sign({ id: user._id, username: user.username, userType: user.userType }, "ahims");
        jwt.verify(userToken, "ahims" , (err, userData) => {
            if (userData) {
                books.find({} , (err, books) => {
                    const info = `userName:${userData.username} 
                    books:${books}
                    token:${userToken}`;
                    res.send(info);
                });
            }
            if (err) {
                res.send("You cannot access");
            }
        });
        
    });
}
//list all users 
exports.listUsers = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, userData) => {
        if (userData.userType === "admin" ) {
            users.find({}, { username: 1 , userType:1, _id:0 }).then(function (user) {
                res.send(user);
            });
        } else {
            res.send("You cannot access users");
        }
    })
}
//update user
exports.update = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, userData) => {
        if (userData.userType === "admin") {
            users.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                userType: req.body.userType
            }, { new: true })
                .then(user => {
                    res.send(user)
                });          
        } else if (userData.userType === "user" ){
            users.findByIdAndUpdate(userData.id, {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email
            }, { new: true })
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");

        }
})

}

//delete user
exports.delete = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, userData) => {
        console.log(userData.userType);
        if (userData.userType === "admin") {
            users.findByIdAndDelete(req.params.id)
                .then(user => {
                    res.send(user)
                })           
        } else if (userData.userType === "user" ){
            users.findByIdAndDelete(userData.id)
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");
        }
})

}






