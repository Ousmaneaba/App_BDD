/* Hello, World! program in node.js */
console.log("Hello, World!")

 // Import Required Module
var http = require("http");

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World my boie\n Dal Diam');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');


//-------------------------------------------------trash
/*

server.use((req, res, next) => {
  console.log("sending the request");
  next();
});

server.use((req, res, next) => {
  //console.log(myres);
  res.json({ message: 'Connected to Elasticsearch was successful!' });
  next();
});

server.use((req, res, next) => {
  const body = client.exists({
    index: 'bank*',
    id: 1
  });
  console.log(body);
});
*/

/*
server.get('/', function(request, response) {

 var res = 'test';

 //response.sendfile('./index.html');
 response.render('index', {res: res});

});
*/
// Console will print the message