var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/json-editor/get', function(req, res, next) {
  var lang = res.locals["lang"];
  fs.readFile(process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json","UTF-8",
    function(error,data){
      res.render("JsonEditor/get.html.twig",{json: data});
    });
});

router.post('/json-editor/post', function(req, res, next) {
  var lang = res.locals["lang"];
  fs.writeFile(process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json",
    JSON.stringify(req.body),
    function(error,data){
      fs.readFile(process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json","UTF-8",
        function(error,data){
          res.send(data);
        });
    });
});


module.exports = router;
