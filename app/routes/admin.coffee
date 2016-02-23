require "coffee-script"

console.log "coffee cup"


express = require "express"
router = express.Router()
fs = require "fs"
Async  = (require "../async").asyncroute
Await = (require "../async").await

router.get '/test', (req, res, next) ->
  console.log "coffee cup"
  res.send 'respond with a resource'



router.get '/json-editor/get',  Async (req, res, next) ->
  lang = res.locals["lang"];
  data = yield from Await fs.readFile, [process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json"]
  res.render "JsonEditor/get.html.twig", {
      json: data
    }




module.exports = router;
