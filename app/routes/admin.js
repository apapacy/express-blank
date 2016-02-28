"use strict";
var express = require('express');
var router = express.Router();
var fs = require("fs");
var promify = require("../utils").promify2;

router.get('/json-editor/get', async function(req, res, next) {
  var lang = res.locals.lang;
  try {
    var data = await promify(fs, fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json");
  } catch (ex) {
    console.log(ex);
    console.log(data);
    res.status(500).json(ex).end();
    return;
  }
  console.log(data);
  res.render("JsonEditor/get.html.twig", {
    json: data
  });
});

router.post('/json-editor/post', async function(req, res, next) {
  var lang = res.locals.lang;
  await promify(fs, fs.writeFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", JSON.stringify(req.body, null, 2));
  var data = await promify(fs, fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", "UTF-8");
  res.send(data);
});

router.post('/json-editor/publish', async function(req, res, next) {
  var lang = res.locals.lang
  await promify(fs, fs.writeFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".json", JSON.stringify(req.body, null, 2));
  console.log("222222222222222")
  require("../translations").reload();
  var data = await promify(fs, fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".json", "UTF-8");
  res.send(data);
});

router.post('/json-editor/upload', async function(req, res, next) {
  var data = await promify(fs, fs.writeFile, process.cwd() + "/public/uploads/" + req.query.filename, req.body);
  res.send("OK");
});

router.all('/mail', async function(req, res, next) {
  var lang = res.locals.lang;

  var email = require("emailjs");
  var server = email.server.connect({
    host: "178.159.110.48",
    port: "587",
    user: "aura",
    password: "ieph8aV9aethae9oosha"
  });

  var message = {
    text: "i hope this works",
    from: "ovcharenkoav@aurafit.com.ua",
    to: "ovcharenkoav@meta.ua",
    cc: "comb-in@narod.ru",
    subject: "testing emailjs",
    attachment: [{
      data: "<html>i <i>hope</i> this works!</html>",
      alternative: true
    }]
  };
  var data = [];
  for (var i = 0; i < 10; i++) {
    data.push(promify(server, server.send, message));
  }
  console.log(data);
  data = await Promise.all(data);

  console.log(data);
  res.send(data);
});


module.exports = router;
