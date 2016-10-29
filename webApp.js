// Good Read API Key
// https://www.goodreads.com/api
var key = "";

// Create a web server
// https://nodejs.org/en/about/

const http = require('http');
const https = require('https');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
	 //response.end('Hello World');
	handlingRoute(request, response);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// Handling request / parsing the parameter
function handlingRoute(request, response){

	if(request.url == '/'){
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/plain');
		response.end('Please provide the ISBN');
	}
	
	// :isbn (9780132350884)
	var isbn = request.url.replace('/', '');
	
	if(isbn.length === 13){
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/plain');
		response.write("ISBN: " + isbn);
		
		getRating(isbn, function(rating) {
			response.end("\n Good Read's Rating: " + rating);
		});
		
	}
}

// Get Book Information
function getRating(isbn, callback){
	// Get review statistics given a list of ISBNs (json)
	var get_statistics_by_isbn = "https://www.goodreads.com/book/review_counts.json?isbns=" +
									isbn + "&key=" + key;
	var rating = "n/a";
	var request = https.get(get_statistics_by_isbn, function(response){
	
		// concat stream of data
		var body = "";
		response.on('data', function(chunk){
			body += chunk;
		});
	
		// get information after completion
		response.on('end', function(){
			
			if(response.statusCode === 200){
				// parsing String into JSON Object
				var json = JSON.parse(body);
				rating = json.books[0].average_rating;
				callback(rating);
			}else{
				console.log("There was an error: " + body + "\n Status:" + 
				response.statusMessage)
				callback(rating);
			}
		});
	});
}












