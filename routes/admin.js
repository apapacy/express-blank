var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/json-editor/:lang?', function(req, res, next) {
  var lang = req.params.lang || 'ru';
  console.log(process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json");
  fs.readFile(process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json","UTF-8",
    function(error,data){
      console.log(data);
      res.render("JsonEditor/get.html.twig",{json: data});
    });
});



module.exports = router;
