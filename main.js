var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var moment = require('moment');
var app = express();
app.set('views', './views')
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res){
	res.render('mainpage');
});

app.get('/:datestring', function (req,res){
	var datestring = req.params.datestring;
	var myregexp = /\d{8,}/;
	if(myregexp.test(datestring)){
		mydate = moment(datestring, 'X');
	} else {
		mydate = moment(datestring, "MMMM D, YYYY")
	}
	if(mydate.isValid()){
		res.send({
			unix: parseInt(mydate.format("X")),
			natural: mydate.format("MMMM D, YYYY")
		})
	} else {
		res.send({
			unix: null,
			natural: null
		})
	}
});

app.listen(process.env.PORT || 3000, function(err){
	if(err){
		console.log(err);
	} 
	console.log('listening on port 3000 or default port');
})