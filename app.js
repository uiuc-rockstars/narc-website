var express = require('express'),
    http = require('http');
var app = express();
var mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
// const INDEX =  path.join(__dirname, 'index.js');

mongoose.connect('mongodb://heroku-site:LMDPiqBxsBnoPDGh@narc-cluster-shard-00-00-uij1v.mongodb.net:27017,narc-cluster-shard-00-01-uij1v.mongodb.net:27017,narc-cluster-shard-00-02-uij1v.mongodb.net:27017/test?ssl=true&replicaSet=narc-cluster-shard-0&authSource=admin');

var reportSchema = mongoose.Schema({
    location: String,
    description: String,
    timestamp: String
});

var report = mongoose.model('report', reportSchema);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index.ejs');
});

http.createServer(app).listen(PORT, function() {
    console.log("Server is listening on port 3000"); 
});

app.get('/viewall', function(req,res) {
    report.find({}, function(err, reports) {
	console.log("\nProducts !");
	console.log(reports); 
	renderResult(res, reports, "Reports from the database: ");
    });
});

function renderResult(res, data, msg) {
  res.render('display.ejs', {message:msg, reports:data},
    function(err, result) {
      if (!err) {res.end(result);}
      else {res.end('Oops ! An error occurred.');
        console.log(err);}
});}
