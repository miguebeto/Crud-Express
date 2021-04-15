const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;

app.listen(3000,()=>{console.log(`listening on  ${port}`)});
app.get('/', (req, res)=>{res.send('Hello World')});
MongoClient.connect('mongodb://localhost/crud-express', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
});