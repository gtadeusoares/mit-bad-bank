const MongoClient = require('mongodb').MongoClient;
// docker run -p 27017:27017 --name badbank -d mongo 
// const url = process.env.MONGODB_URISTRING;// For docker container.
const url = process.env.MONGODB_URI; // For heroku deployment.
// const url = 'mongodb+srv://gsoares:admin@cluster0.4q75i.mongodb.net/?retryWrites=true&w=majority'; // For local server.
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
// Parameters: user name, user email, user password, user role.
// Purpose: Create a user in the database.
// returns: Created user information.
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
// Parameters: user email.
// Purpose: Finds users in the database with that email.
// returns: Found users information.
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
// Parameters: user email.
// Purpose: Finds a user in the database with that email.
// returns: Found user information.
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
// Purpose: Updates user balance.
// returns: Updated users information.
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
// Parameters: none.
// Purpose: Finds all users in the database.
// returns: Returns all users' information.
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
