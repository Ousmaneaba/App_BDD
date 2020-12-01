'use strict';

// use the express module
const express = require('express');
// elasticsearch module1
const elasticsearch = require('elasticsearch');
// importer body-parser pour modifier le contenu d'une reponse post
const bodyParser = require('body-parser');


// instanciate the server
const server = express();
// listening port
server.listen(8082);
// configure Elasticsearch by creating a client so that gives
// you the ability to use the functions for effortless interaction.
const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200']
});
//server.set('view engine', 'ejs');
//server.use(express.static(__dirname));

client.ping(
 {
  requestTimeout: 30000,
 }, 
 function(error) {
  if (error) {
   console.error('Cannot connect to Elasticsearch.');
   myres = 'Cannot connect to Elasticsearch.';
  } else {
   console.log('Connected to Elasticsearch was successful!');
  }
 });

 server.use(bodyParser.urlencoded({
    extended: false
 }));

 server.use(bodyParser.json());

server.use((req, res, next) => {
  console.log(req.method, req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Type', 'text/plain')
  next();
});

//GET specific workout by id
server.get('/workout/:id', (req, res) => {
 var workout;
 client.get({
   index: 'workout',
   type: 'mytype',
   id: req.params.id
   }, function(err, resp, status){
     if(err){
       console.log(err);
     }else{
       workout = resp._source;
       console.log('fond the requested document', resp);
       if (!workout){
         return res.status(400).send({
           message: 'workout is not found for id ${req.params.id}'
         });
       }
       return res.status(200).send({
         message: 'Get workout calls for id ${req.params.id} succeeded',
         workout: workout
       });
     }
 });
})
 /*if(test !== null && test !== '' && test !== undefined) {
    console.log("test is not null");
    console.log(typeof(test));
    //console.log(JSON.parse(test))
 }*/

var workouts = [
  {
    id: 1,
    type: 'weight',
    duration: 45,
    date: '02/12/2020'
  },
  {
      id: 2,
      type: 'weight',
      duration: 49,
      date: '01/12/2020'
    }
]

//POST specific workout doc
server.post('/workout', (req, res) => {
  if(!req.body.id){
    return res.status(400).send({
      message: 'Id is required'
    });
  }
  client.index({
    index: 'workout',
    type: 'mytype',
    id: req.body.id,
    body: req.body
  }, function(err, resp, status){
    if(err){
      console.log(err);
    }else{
      return res.status(200).send({
        message: 'POST workout call succeeded'
      })
    }
  });
})

//GET specific bank by id
server.get('/bank/:id', (req, res) => {
 var bank;
 client.get({
   index: 'bank',
   type: 'account',
   id: req.params.id
   }, function(err, resp, status){
     if(err){
       console.log(err);
     }else{
       bank = resp._source;
       console.log('found the requested document', resp);
       if (!bank){
         return res.status(400).send({
           message: 'bank is not found for id ${req.params.id}'
         });
       }
       return res.status(200).send({
         message: 'Get bank calls for id ${req.params.id} succeeded',
         bank: bank
       });
     }
 });
})

//GET specific shakespeare by id
server.get('/shakes/:id', (req, res) => {
 var shakespeare;
 client.get({
   index: 'shakespeare',
   type: '_doc',
   id: req.params.id
   }, function(err, resp, status){
     if(err){
       console.log(err);
     }else{
       shakespeare = resp._source;
       console.log('found the requested document', resp);
       if (!shakespeare){
         return res.status(400).send({
           message: 'shakespeare is not found for id ${req.params.id}'
         });
       }
       return res.status(200).send({
         message: 'Get shakespeare calls for id ${req.params.id} succeeded',
         shakespeare: shakespeare
       });
     }
 });
})


console.log('Server running at http://127.0.0.1:8082/');
