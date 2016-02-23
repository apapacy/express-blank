require "coffee-script"

console.log "coffee cup"


express = require "express"
router = express.Router()
fs = require "fs"
Async = (require "../async").asyncroute
Await = (require "../async").await

router.get '/test', (req, res, next) ->
  console.log "coffee cup"
  res.send 'respond with a resource'



router.get '/json-editor/get', Async (req, res, next) ->
  lang = res.locals.lang
  data = yield from Await fs.readFile, [process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json"]
  res.render "JsonEditor/get.html.twig", json: data

router.post '/json-editor/post', Async (req, res, next) ->
  lang = res.locals.lang
  yield from Await fs.writeFile, [process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json"
    JSON.stringify req.body]
  data = yield from Await fs.readFile, [process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json"
    "UTF-8"]
  res.send data

router.post '/json-editor/publish', Async (req, res, next) ->
  lang = res.locals.lang
  fs.writeFileSync process.cwd() + "/app/Resources/translations/messages." + lang + ".json",
    JSON.stringify(req.body), "UTF-8"
  data = yield from Await fs.readFile, [process.cwd() + "/app/Resources/translations/messages." + lang + ".json", "UTF-8"]
  res.send(data);


router.post '/json-editor/upload', Async (req, res, next) ->
  data = yield from Await fs.writeFile, [process.cwd() + "/public/uploads/" + req.query.filename, req.body]
  res.send("OK")





module.exports = router;
