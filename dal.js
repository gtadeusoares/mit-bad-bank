const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
const url = process.env.MONGODB_URI; // For Heroku & Docker. 
// const url = mongodb+srv://gsoares:admin@cluster0.4q75i.mongodb.net/?retryWrites=true&w=majority; // For local development
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
// Parameters: user name, user email, user password, user role. 
// returns: user information. 
function create(name, email, password, role){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, role};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
// Parameters: user email
// returns: user information. 
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
// Parameters: user email
// returns: user information. 
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
// Parameters: user email, amount.
// returns: user information with updated balance. 
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
// Parameters: none
// returns: all users' information. 
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};
