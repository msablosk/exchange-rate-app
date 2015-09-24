var http = require('http');

function printRate (mainCurrency, secondCurrency, rate){
	console.log('The current rate of the ' + mainCurrency + " to the " + secondCurrency + " is " + rate);
}


function printError(error) {
	console.error(error.message)
}

function get (mainCurrency, secondCurrency){
	var request = http.get("http://api.fixer.io/latest?base=" + mainCurrency, function(response){
		var body = "";

		response.on('data', function (chunk){
			body += chunk;
		});

		response.on('end', function(){
			if (response.statusCode === 200){
				try {
					var rates = JSON.parse(body);
					printRate(mainCurrency, secondCurrency, rates.rates[secondCurrency]) 
				} catch (error){
					printError(error)
				}
			} else {
				printError({message: "Error "+ http.STATUS_CODES[response.statusCode]})
			}
		})
	})

	request.on('error', printError);
}

module.exports.get = get;