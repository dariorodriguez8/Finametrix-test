const mongoose = require("mongoose"),

newsSchema = new mongoose.Schema({
title: { type: String, required:true},
description: { type: String,  required:true},
date: { type: Date, default:Date.now },
content: { type: String,required:true },
author: { type: String, required:true  },
archiveDate: { type: Date },
});

module.exports = mongoose.model("news", newsSchema);