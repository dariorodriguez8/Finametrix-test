//File: controllers/news.js
const mongoose = require("mongoose");
const News = mongoose.model("news");

//GET - Return all News in the DB
exports.findAllNews = function (req, res) {
  News.find(function (err, news) {
    if (err) res.send(500, err.message);

    console.log("GET findAllNews");
    res.status(200).jsonp(news);
  });
};

//GET - Return a News with specified ID
exports.findNewsById = function (req, res) {
  News.findById(req.params.id, function (err, news) {
    if (err) return res.send(500, err.message);

    console.log("GET findNewsById " + req.params.id);
    res.status(200).jsonp(news);
  });
};

//POST - Insert News in the DB
exports.addNews = function (req, res) {
  console.log("POST addNews");

  if (req.body.date == "") return res.status(500).send("date cant be null");

  var news = new News({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    content: req.body.content,
    author: req.body.author,
    archiveDate: req.body.archiveDate,
  });

  news.save(function (err, news) {
    if (err) return res.status(500).send(err.message);
    res.status(200).jsonp(news);
  });
};

//PUT - Archive a New
exports.archiveNew = function (req, res) {
  console.log("PUT archiveNew " + req.params.id + ' ' + req.body.archiveDate);

  News.findById(req.params.id, function (err, news) {
    news.archiveDate = req.body.archiveDate;
    news.save(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(news);
    });
  });
};

//DELETE - Delete News with specified ID
exports.deleteNew = function (req, res) {
  console.log("DELETE deleteNew " + req.params.id);

  News.findById(req.params.id, function (err, news) {
    news.remove(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};
