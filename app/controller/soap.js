var soap = require("soap");
var xml2js = require("xml2js");
var utils = require("../utils");
var config = require("../config");

// Рабочий урл, параметры из конфигурации системы
//var url = "http://" + config["app.soap.server"] + config["app.soap.path"] + "/wsdl?wsdl";
//Урл для тестироварния от разработчиков 1с
var url = "http://37.57.73.227/A2-TEST/ws/PersonalAccount?wsdl";
var auth = "Basic " + new Buffer(config["app.soap.login"] + ":" + config["app.soap.password"]).toString("base64");
var args = {
  name: 'value'
};

var client;
async function getClient() {
  if (client) {
    return client;
  }
  try {
    client = await utils.promify2(soap, soap.createClient, url, {
      wsdl_headers: {
        Authorization: auth
      }
    });
    client.setSecurity(new soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]));
    return client;
  } catch (ex) {
    console.error("SOAP error:");
    console.error(ex);
  }
  return undefined;
}

async function GetShedule(StartDate, EndDate, clientID, ClubID) {
  console.log(arguments);
  var client = await getClient();
  if (typeof client === "undefined") {
    return undefined;
  }
  if (!ClubID && (Number(ClubID) !== 1) && (Number(ClubID) !== 5)) {
    ClubID = "";
  }
  if (!clientID) {
  //  clientID = "";
  }
  console.log("+++++"+ClubID+"*************")
  try {
    var shedules = await utils.promify2(client, client.GetShedule, {
      StartDate: StartDate,
      EndDate: EndDate,
      clientID: String(clientID),
      ClubID: String(ClubID)
    });
    shedules = await utils.promify2(undefined, xml2js.parseString, shedules[1].return, {
      explicitArray: false
    });
    shedules = shedules.shedules.shedule;
    return shedules;
  } catch (ex) {
    console.error("SOAP->GetShedule error:");
    console.error(ex);
  }
  return undefined;
}

module.exports = {
  shedules: GetShedule
}


/*
(async function() {

  console.log("befor");
  try {
    //soap.Client.prototype.security = new soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]);
    var client = await utils.promify2(soap, soap.createClient, url, {
      wsdl_headers: {
        Authorization: auth
      }
    });
    client.setSecurity(new soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]));
    var services = await utils.promify2(client, client.GetShedule, {
      clientID: "20004734",
      StartDate: "2016-01-24",
      EndDate: "2016-01-24",
      ClubID: ""
    });
    var obj = await utils.promify2(undefined, xml2js.parseString, services[1].return, {
      explicitArray: false
    });
  } catch (ex) {
    console.error(ex);
    console.log("+++++++++++++++")
  }
  console.log(JSON.stringify(obj, false, 2));
  console.log(obj.shedules.shedule.length)


})();




>GetShedule(
array('clientID' => "20004734", "StartDate"=>"2016-02-24","EndDate"=>"2016-02-24" ))
*/
