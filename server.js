const express = require('express');
const mongoose = require('mongoose');
const request = require("request");
const bodyParser = require('body-parser');
const app = express();

mongoose.connect("mongodb://top100:Rangers88@ds263928.mlab.com:63928/top100", {
  useNewUrlParser: true
}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Connected to DB");
    }
});


const albumSchema = new mongoose.Schema({
  title: String,
  image: String,
  genre: String,
  releaseDate: Date
});

const Album = mongoose.model("Album", albumSchema);

Album.create({
  title: "My Album",
  image: "none",
  genre: "Rock",
  releaseDate: new Date()
}, function(err) {
    if(err) {
      console.log("Error : " + err);
    }
    else {
      console.log("success");
    }
});


app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'}
  ];

  res.json(customers);
});

app.use(bodyParser.urlencoded({ extended: true }));
 
//Sets the public folder as the external file folder
app.use(express.static("public"));


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);