var _ = require("lodash");
var fs= require("fs");
var prompt = require("prompt-sync").prompt;
var dist = JSON.parse(fs.readFileSync("app/config/parameters.dist").toString("UTF-8"));
var config = {};
try {
  config = JSON.parse(fs.readFileSync("app/config/parameters.json").toString("UTF-8"));
} catch (ex) {
  console.log(ex);
}
var result = {}
 _.assign(result, dist, config)
walk(result, 0, "");
//console.log(result);
fs.writeFileSync("app/config/parameters.json", JSON.stringify(result, undefined, 4), "UTF-8");


function walk(object, step, path) {
  var answer;
  for (var prop in object) {
    if (typeof object[prop] === "object") {
      walk(object[prop], 1 + step, path + prop + ".");
    } else {
        object[prop] = String(object[prop]);
        answer = ""
        console.log(path +  prop + " : ");
        answer = prompt({value: object[prop]});
        if (answer) {
          object[prop] = answer;
        }
        console.log(path +  prop + " = " + object[prop]);
    }
  }
}
