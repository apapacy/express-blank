require "coffee-script"

console.log "coffee cup"


express = require "express"
router = express.Router()
fs = require "fs"
asyncroute = (require "../async").asyncroute
tawait = (require "../async").tawait
eawait = (require "../async").eawait


router.get '/test', (req, res, next) ->
  console.log "coffee cup"
  res.send 'respond with a resource'



router.get '/json-editor/get', asyncroute (req, res, next) ->
  lang = res.locals.lang
  data = yield from tawait fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json"
  res.render "JsonEditor/get.html.twig", json: data

router.post '/json-editor/post', asyncroute (req, res, next) ->
  lang = res.locals.lang
  yield from tawait fs.writeFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", JSON.stringify(req.body, null, 2)
  data = yield from tawait fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", "UTF-8"
  res.send data

router.post '/json-editor/publish', asyncroute (req, res, next) ->
  lang = res.locals.lang
  # Асинхронное чтение валит watch
  fs.writeFileSync process.cwd() + "/app/Resources/translations/messages." + lang + ".json", JSON.stringify(req.body, null, 2), "UTF-8"
  require("../translations").reload();
  data = yield from tawait fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".json", "UTF-8"
  res.send data


router.post '/json-editor/upload', asyncroute (req, res, next) ->
  data = yield from tawait fs.writeFile, process.cwd() + "/public/uploads/" + req.query.filename, req.body
  res.send "OK"





module.exports = router;
