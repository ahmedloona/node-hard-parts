const http = require('http');
const fs = require('fs');

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...

  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    const htmlFile = fs.readFileSync('index.html');
    response.end(htmlFile);

  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    const toWrite = 'Somebody said hi. \n';
    fs.appendFileSync('hi_log.txt', toWrite);

    response.end("hi back to you!");
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...

    const accumulatedRequestBody = [];

    function doOnPartialData(data){
        accumulatedRequestBody.push(data);
    }

    function doOnDataEnd() {
        const requestBody = Buffer.concat(accumulatedRequestBody).toString();
        respondToRequest(requestBody);
        fs.appendFileSync('hi_log.txt', requestBody + "\n");

    }

    function respondToRequest(reqString){
        if (reqString == `hello`){
            response.end('hello there!')
        } else if (reqString == `what's up` ) {
            response.end('the sky');
        } else {
            response.end('good morning');
        }
    }

    request.on('data', doOnPartialData);
    request.on('end', doOnDataEnd);
  }
  else {
    // Handle 404 error: page not found
    // code here...
    response.statusCode = 404;
    response.statusMessage = 'Error: Not Found';
    response.end();
    
  }
}

const server = http.createServer(doOnRequest)

server.listen(4000);
