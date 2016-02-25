"use strict";
var express = require('express');
var router = express.Router();
var fs = require("fs");
var es5 = require("es5-await");

router.get('/json-editor/get', async function(req, res, next) {
  var lang = res.locals.lang;
  try {
    var data = await es5.c2p([fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json"]);
  } catch (ex) {
    console.log(ex)
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
  await es5.c2p([fs.writeFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", JSON.stringify(req.body, null, 2)]);
  var data = await es5.c2p([fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", "UTF-8"]);
  res.send(data);
});

router.post('/json-editor/publish', async function(req, res, next) {
  var lang = res.locals.lang
  await es5.c2p([fs.writeFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".json", JSON.stringify(req.body, null, 2), "UTF-8"]);
  require("../translations").reload();
  var data = await es5.c2p([fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".json", "UTF-8"]);
  res.send(data);
});

router.post('/json-editor/upload', async function(req, res, next) {
  var data = await es5.c2p([fs.writeFile, process.cwd() + "/public/uploads/" + req.query.filename, req.body]);
  res.send("OK");
});

router.all('/mail', function(req, res, next) {
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
    to: "an6rey@gmail.com",
    cc: "comb-in@narod.ru",
    subject: "testing emailjs",
    attachment: [{
      data: "<html>i <i>hope</i> this works!</html>",
      alternative: true
    }]
  };
  for (var i = 0; i < 100; i++)
    server.send(message, function(error, data) {
      //res.send(error || data);
    });
  res.send("OK")
});


module.exports = router;
