"use strict";

var express = require('express');
var router = express.Router();
var soap = require("../controller/soap");

//router.get("/shedules/(:dateStart)?/(:dateEnd)?/(:clientID)?/(:clubID)?", async function(req, resp, next){
router.get(/\/shedules\/([^\/]+)?\/([^\/]+)?(\/([^\/]+))?(\/([^\/]+))?/, async function(req, resp, next){
  var dateStart = req.params[0];
  var dateEnd = req.params[1];
  var clientId = req.params[5];
  var clubId = req.params[3];
  if (!/^\d{4}-\d{2}-\d{2}$/.exec(dateStart) || !/^\d{4}-\d{2}-\d{2}$/.exec(dateEnd)) {
    resp.sendStatus(500);
    return;
  }
  if (!clientId) {
    clientId = "";
  }
  if (!clubId) {
    clubId = "";
  }
  var shedules = await soap.shedules(dateStart, dateEnd, clientId, clubId);
  resp.json(shedules);
});

router.get("/test", function(req, resp, next){
  soap.getClientCallback();
});

module.exports = router;
