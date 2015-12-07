// Biblioteki
var http = require("http")
var fs = require("fs")

// Komunikaty
const badArgumentsMessage = "Wrong arguments"
const notFoundMessage = "Key not found"
const keySet = "Key set"
const keyUnset = "Key unset"

fs.readFile("./data.json", function(err, file){
	data = JSON.parse(file);
});

http.createServer(function(message, response) {
	// Rozbij łańcuch na elementy
	question = message.url.split("/")

	if(question.length == 2 || question.length == 3) {
		if (question[1] == "") answer(response, 400, badArgumentsMessage)
		else {
			key = question[1]
			if (question.length == 2) {	
				// Pytanie o wartość klucza
				value = data[key];
				if (value) 	answer(response, 200, value)
				else 		answer(response, 404, notFoundMessage)
			}
			else { 						
				// Ustawianie klucza
				if(question[2] == ""){
					// Jeśli jest taki klucz, a nie podaliśmy wartości, usuwamy go
					if(data[key])
					{
						delete data[key]
						synchronize()
						answer(response, 200, keyUnset)
					}
					else answer(response, 400, badArgumentsMessage)
				}
				else {
					// Jeśli podaliśmy wartość, ustawiamy go
					value = question[2];
					data[key] = value
					synchronize()
					answer(response, 200, keySet)
				}
			}
		}
	}
	else {
		answer(response, 400, badArgumentsMessage);
	}
}).listen(8888);
console.log("Listening on port 8888");

function answer(response, code, message){
	response.writeHead(code, {"Content-Type": "text/plain"});
	response.end(message);
}

function synchronize() {
	fs.writeFile("./data.json", JSON.stringify(data))
}