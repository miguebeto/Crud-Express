const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ejs = require('ejs');
let db;
let collection;



app.listen(port,()=>{console.log(`listening on port ${port}`)}); // assigned port where it listens
//app.get('/', (req, res)=>{res.send('Hello World')});  // testing the server with get method

MongoClient.connect('mongodb://localhost/crud-express', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
    db = client.db('crud-express'); //created const for conection and action in our Database
    collection = db.collection('product'); 
});

app.use(bodyParser.json());

//add crud methods
//add get methods

app.get('/product', (req, res) => {
    db.collection('product').find({"nombre":"migue"}).toArray()
        .then(results => {res.json(results); })
        .catch(error => console.error(error));
});

//sendfile without Middleware
app.get('/about', (req, res)=>{res.sendFile(__dirname + '/static/about.html')});
app.get('/contact', (req, res)=>{ res.sendFile(__dirname + '/static/contact.html') });

//sign with template ejs
app.set('view engine', 'ejs')
app.get('/signin', (req, res)=>{ res.render('signin')});
app.get('/welcome-web', (req, res)=>{ res.render('welcome-web')});

// Middleware Express for send files to clients
app.use(express.static('public')); 


//add post method
app.post('/product', (req, res) => {
    collection.insert([{"nombre": "jose", "edad": 27}, {"nombre": "stephen", "edad": 26},{"nombre": "angel", "edad": 26}])
        .then(result => {res.json('Success');})
        .catch(error => console.error(error))
});

//add put method
app.put('/product/:id', (req, res) => {
    collection.findOneAndUpdate({ name: req.params.id },
        { $set: {
                name: req.body.name,
                price: req.body.price }},
        {upsert: true})
        .then(result => { res.json('Updated') })
        .catch(error => console.error(error))

}); 

//add delete method
app.delete('/product/:id', (req, res) => {
    collection.deleteOne({ name: req.params.id } )
        .then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
});












