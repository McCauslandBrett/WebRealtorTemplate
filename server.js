//=================================
//Server SetUp
//=================================
var express = require('express'),
app = express(),
mongoose = require('mongoose'),
//logger=require('morgan'),
bodyParser=require('body-parser')

app.set('view engine', 'ejs');
//app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
// //======================================
// //            Database
// //note: not sure how to define local host properly
// //note: dont know how to connect to mongodb
// //======================================
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost:");
var clientSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  message: String
});
var client = mongoose.model("Client",clientSchema);

// //======================================
// // Routes
// //======================================
app.get("/", function(req,res){
  res.render("index");
});

app.post('/addclient', function(req,res){
  client.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    message:req.body.message,
  },function(err,client){
    res.redirect('/');
  });
});
//Start the Server
app.listen(3000,function(){
  console.log('Server started on port 3000...');
});
