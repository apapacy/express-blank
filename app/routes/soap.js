"use strict";

var express = require('express');
var router = express.Router();
var soap = require("../controller/soap");



//router.get("/shedules/(:dateStart)?/(:dateEnd)?/(:clientID)?/(:clubID)?", async function(req, resp, next){
router.get("/shedules/(:dateStart)?/(:dateEnd)?", async function(req, resp, next){
  if (!/^\d{4}-\d{2}-\d{2}$/.exec(req.params.dateStart) || !/^\d{4}-\d{2}-\d{2}$/.exec(req.params.dateEnd)) {
    resp.sendStatus(500);
    return;
  }
  if (req.params.clientID) {
    var clientID = req.params.clientID;
  } else {
    clientID = "";
  }
  if (req.params.clubID) {
    var clubID = req.params.clubID;
  } else {
    clubID = "";
  }
  var shedules = await soap.shedules(req.params.dateStart, req.params.dateEnd, clientID, clubID);
  resp.json(shedules);
});


module.exports = router;
