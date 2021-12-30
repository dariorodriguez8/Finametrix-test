const express = require("express");
const  app = express();
const  bodyParser = require("body-parser");
const  methodOverride = require("method-override");
const mongoose = require("mongoose");
//Cors Allow all requests from all domains & localhost
const cors=require("cors");
const corsOptions ={
  origin:'*', 
  credentials:true,          
  optionSuccessStatus:200,
};
app.use(cors(corsOptions));
// Connection to DB
var directory = "mongodb://localhost/news";

mongoose.connect(directory, function (err, res) {
  if (err) throw err;
  console.log("Connected to Database");
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
const newsModel = require('./models/news-model');
const NewsCtrl = require("./routes/news-routes");


// insert Mock Data if not exist
var MockData = require('./mock/mock-news.json')
var db = mongoose.connection;

db.collection("news").countDocuments()
.then(function(number) {
  if(number== 0){
    console.log('inserting mock data')
     db.collection("news").insertMany(MockData,forceServerObjectId=true,function (err,data) {
      if(err!=null){
          return console.log(err);
      }
      });
  }
})

// API routes
var news = express.Router();

news.route('/news')
  .get(NewsCtrl.findAllNews)
  .post(NewsCtrl.addNews);

  news.route('/news/:id')
  .get(NewsCtrl.findNewsById)
  .put(NewsCtrl.archiveNew)
  .delete(NewsCtrl.deleteNew);

app.use(news);


// Start server
app.listen(3333, function() {
  console.log("Node server running on http://localhost:3333");
});