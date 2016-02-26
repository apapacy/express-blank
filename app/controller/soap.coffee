soap = require("soap");
xml2js = require("xml2js");
utils = require("../utils");
config = require("../config");
es5 = require "es5-await"

# Рабочий урл, параметры из конфигурации системы
# var url = "http://" + config["app.soap.server"] + config["app.soap.path"] + "/wsdl?wsdl";
#Урл для тестироварния от разработчиков 1с
url = "http://37.57.73.227/A2-TEST/ws/PersonalAccount?wsdl";
auth = "Basic " + new Buffer(config["app.soap.login"] + ":" + config["app.soap.password"]).toString("base64");
args = {
  name: 'value'
};

staticClient = undefined

getClient = () ->
  console.log(staticClient)
  if typeof staticCLient != "undefined"
    return staticCLient;
  try
    staticClient = yield from es5.await utils.promify2(soap, soap.createClient, url, {
      wsdl_headers: {
        Authorization: auth
      }
    });
    console.log(staticClient)
    staticCLient.setSecurity(new soap.BasicAuthSecurity(config["app.soap.login"], config["app.soap.password"]));
    return staticClient;
  catch ex
    console.error("SOAP error:");
    console.error(ex);
  return undefined;


 GetShedule = (StartDate, EndDate, clientID,  ClubID) ->
  console.log "---------------------"
  client = yield from es5.await getClient()
  console.log "++++++++++++++++++++++++"
  if typeof client == "undefined"
    return undefined;
  if !ClubID || Number(ClubID) != 1 || Number(ClubID) != 5
    ClubID = ""
  if ! clientID
    clientID = ""
  try
    shedules = yield from es5.await utils.promify2(client, client.GetShedule, {
      clientID: clientID,
      StartDate: StartDate,
      EndDate: EndDate,
      ClubID: ClubID
    });
    shedules = yield from es5.await utils.promify2(undefined, xml2js.parseString, shedules[1].return, {
      explicitArray: false
    });
    shedules = shedules.shedules.shedule;
    return shedules;
  catch ex
    console.error("SOAP->GetShedule error:");
    console.error(ex);
  return undefined;


module.exports = {
  shedules: GetShedule
}


###
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

###
