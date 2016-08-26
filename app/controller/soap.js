var soap = require("soap");
var xml2js = require("xml2js");
var utils = require("../utils");
var config = require("../config");

// Рабочий урл, параметры из конфигурации системы
//var url = "http://" + config["app.soap.server"] + config["app.soap.path"] + "/wsdl?wsdl";
//Урл для тестироварния от разработчиков 1с
var url = "http://89.162.142.62/AURA2-FIT/ws/PersonalAccount?wsdl";
var url1 = "http://wsf.cdyne.com/WeatherWS/Weather.asmx?WSDL";
var auth = "Basic " + new Buffer(config["app.soap.login"] + ":" + config["app.soap.password"]).toString("base64");
var args = {
  name: 'value'
};

async function getClient() {
  var client;
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

async function getClient1() {
  var client;
  try {
    client = await utils.promify2(soap, soap.createClient, url1, {
    });
    //client.setSecurity(new soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]));
    return client;
  } catch (ex) {
    console.error("SOAP error:");
    console.error(ex);
  }
  return undefined;
}



function getClientCallback(next) {
  var basic = new soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]);
  //soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]);
  for (var prop in soap.Client.super_)
  console.log(prop)
  soap.createClient(url,basic, function(error, client){
    //client.setSecurity(new soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]));
    console.log(client);
  });
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
    var promises = [];
    for (var j = 0; j<2;j++)
    for (var i = 0; i< 100; i++) {
      client = await getClient();
      StartDate = new Date()
      console.log(StartDate)
      StartDate.setDate(StartDate.getDate() - i - 8);
      console.log(StartDate)
      StartDate = StartDate.toISOString().substring(0, 10);
      console.log(StartDate)
      EndDate = (new Date())
      EndDate.setDate(EndDate.getDate() - i);
      EndDate = EndDate.toISOString().substring(0, 10);
      promises[i] = utils.promify2(client, client.GetShedule, {
        StartDate: StartDate,
        EndDate: EndDate,
        clientID: String(clientID),
        ClubID: String(ClubID)
      });
    }
    var shedules = await Promise.all(promises)
    for (var i =0; i< 100; i++) {
      console.log(i + '=' + shedules[i].return.length)
    }
    return shedules[99].return;
    shedules = await utils.promify2(undefined, xml2js.parseString, shedules.return, {
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

async function GetShedule0(StartDate, EndDate, clientID, ClubID) {
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
    var promises = [];
    for (var j = 0; j<1;j++)
    for (var i = 0; i< 100; i++) {
      client = await getClient();
      StartDate = new Date()
      //console.log(StartDate)
      StartDate.setDate(StartDate.getDate() - i - 8);
      //console.log(StartDate)
      StartDate = StartDate.toISOString().substring(0, 10);
      //console.log(StartDate)
      EndDate = (new Date())
      EndDate.setDate(EndDate.getDate() - i);
      EndDate = EndDate.toISOString().substring(0, 10);
      var x0 = 0;
      client.GetShedule({
        StartDate: StartDate,
        EndDate: EndDate,
        clientID: String(clientID),
        ClubID: String(ClubID)
      },
      function(error, data) {
        console.log(x0++)
        console.log(data.return.length)
        console.log(new Date())
      });
    }
  } catch (ex) {
    console.error("SOAP->GetShedule error:");
    console.error(ex);
  }
  return undefined;
}


async function GetShedule1(StartDate, EndDate, clientID, ClubID) {
  console.log(arguments);
  var client = await getClient();
  if (typeof client === "undefined") {
    return undefined;
  }
  var x0 = 0;
  var err = 0;

  try {
    for (var j = 0; j<10;j++)
    for (var i = 0; i< 100; i++) {
      client = await getClient1();
      client.GetWeatherInformation({
      },
      function(error, data) {
        if (error)
        console.log(error.message + (err++))
        else
        console.log(JSON.stringify(data))
        console.log(x0++)
        console.log(err)
        console.log(new Date())
      });
    }
  } catch (ex) {
    console.error("SOAP->GetShedule error:");
    console.error(ex);
  }
  return undefined;
}



module.exports = {
  shedules: GetShedule1,
  getClientCallback: getClientCallback
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
