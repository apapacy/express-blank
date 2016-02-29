"use strict";

express = require('express');
router = express.Router();
soap = require("../controller/soap7");
es5 = require "../async"
console.log "*******************"
#router.get("/shedules/(:dateStart)?/(:dateEnd)?/(:clientID)?/(:clubID)?", async function(req, resp, next){
router.get ///\/shedules/([^/]+)?/([^/]+)?(/([^/]+))?(/([^/]+))?///, es5.asyncroute (req, resp, next) ->
  dateStart = req.params[0];
  dateEnd = req.params[1];
  clientId = req.params[5];
  clubId = req.params[3];
  if !/^\d{4}-\d{2}-\d{2}$/.exec(dateStart) || !/^\d{4}-\d{2}-\d{2}$/.exec(dateEnd)
    resp.sendStatus(500)
    return
  if (!clientId)
    clientId = ""
  if (!clubId)
    clubId = ""
  try
    shedules = yield from  es5.async(soap.shedules,[dateStart, dateEnd, clientId, clubId])
    console.log shedules
  catch ex
    console.log ex
  console.log "}}}}}}}}}}}"
  console.log shedules
  resp.json(shedules);


module.exports = router;
