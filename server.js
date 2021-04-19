const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
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
//add get method

app.get('/product', (req, res) => {
    db.collection('product').find().toArray()
        .then(results => {res.json(results); })
        .catch(error => console.error(error));
});

//add post method
app.post('/product', (req, res) => {
    collection.insertOne(req.body)
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












