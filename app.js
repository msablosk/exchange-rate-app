var exchange = require('./exchange.js');
var mainCurrency = process.argv.splice(2, 1);
var secondCurrency = process.argv.splice(2, 1);
exchange.get(mainCurrency,secondCurrency)