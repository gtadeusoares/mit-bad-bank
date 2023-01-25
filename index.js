var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
// endpoint: '/account/create/:name/:email/:password/:role'
// parameters: user name, user email, user password, user role
// purpose: create user
// returns: created user information
app.get('/account/create/:name/:email/:password/:role', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {
            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already exists');    
            }
            else { // else create user
                dal.create(req.params.name,req.params.email,req.params.password, req.params.role).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }
        });
    
});


// login user 
// endpoint: '/account/login/:email/:password'
// parameters: user email, user password
// purpose: login user
// returns: logged in user information
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
});

// find user account
// endpoint: '/account/find/:email'
// parameters: user email
// purpose: find user in database
// returns: found user information
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
// endpoint: '/account/findOne/:email'
// parameters: user email
// purpose: find a user in the database
// returns: found user information
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
// endpoint: '/account/update/:email/:amount'
// parameters: user email, amount
// purpose: update user's balance
// returns: updated user's information
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
// endpoint: '/account/all'
// parameters: none
// purpose: return all users.
// returns: all users.
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port: ' + port);
