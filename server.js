//global constants 
const port = 4000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require body-parser Package 
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// function to get data from site . 
function getData (req,res){
    res.send(projectData);
};
// Te route
app.get('/all', getData);

// function to post data 
function postData (req,res){
    projectData = req.body;
    res.send (projectData);
}
app.post('/addData', postData);

//Testion the server

function testServer (){
    console.log(`The server is working at Port : ${port}`);
}

app.listen(port,testServer());