var http = require("http");
var fs = require("fs");

const badArgumentsMessage = "Błędne argumenty";

http.createServer(function(message, response) {
	question = message.url.split("/");

	if(question.length == 2 || question.length == 3) {
		if (question[1] == "") reject(response, badArgumentsMessage);
		else {
			if (question.length == 2) {	// Pytanie
				console.log("Pytanie");
				console.log(question[1]);
				reject(response, "Zapytałeś, ale spierdalaj");
			}
			else { 						// Ustawianie
				if(question[2] == "") reject(response, badArgumentsMessage);
				console.log("Ustawienie");
				reject(response, "Chciałeś coś ustawić, ale spierdalaj");
			}
		}
	}
	else {
		reject(response, badArgumentsMessage);
	}
}).listen(8888);
console.log("Listening on port 8888");

function reject(response, message){
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.end("\t" + message + "\n");
}

fs.readFile("./data.json", function(err, file){
	data = JSON.parse(file);
});