express = require "express"
router = express.Router()
fs = require "fs"
es5 = require "es5-await"
utils = require "../utils"

router.get '/test', (req, res, next) ->
  console.log "coffee cup"
  res.send 'respond with a resource'

router.get '/json-editor/get', es5.asyncroute (req, res, next) ->
  lang = res.locals.lang
  data = yield from es5.await fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json"
  res.render "JsonEditor/get.html.twig", json: data

router.post '/json-editor/post', es5.asyncroute (req, res, next) ->
  lang = res.locals.lang
  yield from es5.await fs.writeFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", JSON.stringify(req.body, null, 2)
  data = yield from es5.await fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".new.json", "UTF-8"
  res.send data

router.post '/json-editor/publish', es5.asyncroute (req, res, next) ->
  lang = res.locals.lang
  # Асинхронное чтение валит watch
  yield from es5.await fs.writeFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".json", JSON.stringify(req.body, null, 2), "UTF-8"
  require("../translations").reload();
  data = yield from es5.await fs.readFile, process.cwd() + "/app/Resources/translations/messages." + lang + ".json", "UTF-8"
  res.send data

router.post '/json-editor/upload', es5.asyncroute (req, res, next) ->
  data = yield from es5.await fs.writeFile, process.cwd() + "/public/uploads/" + req.query.filename, req.body
  res.send "OK"

router.all '/mail', es5.asyncroute (req, res, next) ->
  lang = res.locals.lang

  email = require("emailjs")
  server = email.server.connect {
    host: "178.159.110.48"
    port: "587"
    user: "aura"
    password: "ieph8aV9aethae9oosha"
  }

  message = {
    text: "i hope this works"
    from: "ovcharenkoav@aurafit.com.ua"
    to: "ovcharenkoav@meta.ua"
    cc: "comb-in@narod.ru"
    subject: "testing emailjs"
    attachment: [{
      data: "<html>i+++++++++++++ <i>hope</i> this works!</html>"
      alternative: true
    }
    ]
  }
  data = []
  for i in [0..10]
    data.push utils.promify server, server.send, message
  console.log data
  output = yield from es5.await.apply(null,data)
  console.log output
  res.json output

module.exports = router;
