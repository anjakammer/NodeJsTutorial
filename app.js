// Get current version of node
// > node -v
// run file ‘app.js’
// console.log("Hello World");
// > node app.js
// inline node console
// > node
// > var x = 1+2
// > x
//exit by ctrl+C
// install modules with npm install module-name

// APIs to use 
// https://nodejs.org/api/

// Get information from web api with node and the http api
// https://nodejs.org/api/https.html#https_https_get_options_callback
var https = require("https");

// Good Read API Key
// https://www.goodreads.com/api
var key = "";

// Getting command line arguments
//console.dir(process.argv);

// Getting isbn from command line argument
// 9780132350884
var isbn = process.argv.slice(2);

// Get review statistics given a list of ISBNs (json)
var get_statistics_by_isbn = "https://www.goodreads.com/book/review_counts.json?isbns=" +
								isbn + "&key=" + key ;


// Get Book Information
function getRating(isbn, callback){
var request = https.get(get_statistics_by_isbn, function(response){
	// console.dir(response);
	
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

getRating(isbn, function(rating){
	var message = "ISBN: " + isbn + "\n Good Read's Rating: " + rating;
	console.log(message);
});









