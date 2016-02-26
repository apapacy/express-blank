"use strict";

var express = require('express');
var router = express.Router();
var soap = require("../controller/soap");



//router.get("/shedules/(:dateStart)?/(:dateEnd)?/(:clientID)?/(:clubID)?", async function(req, resp, next){
router.get("/shedules/([^\\/]+)/([^\\/]+)(/([^\\/]+))?(/([^\\/]+))?", async function(req, resp, next){
  console.log(req.params[1])
  console.log(req.params[2])
  console.log(req.params[4])
  console.log(req.params[6])
  if (!/^\d{4}-\d{2}-\d{2}$/.exec(req.params.dateStart) || !/^\d{4}-\d{2}-\d{2}$/.exec(req.params.dateEnd)) {
    resp.sendStatus(500);
    return;
  }
  if (req.params.clientId) {
    var clientId = req.params.clientId;
  } else {
    clientId = "";
  }
  if (req.params.clubId) {
    var clubId = req.params.clubId;
  } else {
    clubId = "";
  }
  var shedules = await soap.shedules(req.params.dateStart, req.params.dateEnd, clientId, clubId);
  resp.json(shedules);
});


module.exports = router;
