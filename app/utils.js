"use strict";

function promify() {
  var self = this || null;
  var func = arguments[0];
  var args = [];
  var next = 1;
  if (typeof arguments[0] !== "function") {
    self = arguments[0];
    var func = arguments[1];
    next = 2;
  }
  for (var i = next; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return new Promise(function(resolve, reject) {
    args.push(function(error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data);
      }
    })
    console.log(func)
    console.log(self)
    console.log(args)
    func.apply(self, args);
  });
}

module.exports = {
  promify: promify
};
