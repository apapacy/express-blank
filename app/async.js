"use strict";

var stack =[];

function _async(func, args) {
  var iter = func.apply(this, args);
  stack.push(iter);
  iter.next();
  return iter;
}

// For Express user
function _asyncroute(func) {
  return function() {
    try {
      return _async(func, arguments);
    } catch (ex) {
      console.error(ex);
    }
  }
}

function* _await() {
  var iter = stack[stack.length - 1];
  console.log("iter")
  console.log(iter)
  arguments[0].then(function*(value) {
    console.log("+++++++++++++++++++++++++++++++")
    try {
      if (iter === stack[stack.length - 1])
      var next =  iter.next(value);
    } catch (ex) {
      console.error(ex)
      throw ex; //?
    }
    if (next.done) {
      iter = stack.pop();
      if (iter === stack[stack.length - 1]) {
        iter.next(value)
      }
      yield value
    }
  }).catch(function*(error) {
    console.log("---------------------------")
    try {
      if (iter === stack[stack.length - 1])
      var next = iter.next(error);
    } catch (ex) {
      console.error(ex)
      throw ex; //?
    }
    if (next.done) {
      iter = stack.pop();
      if (iter === stack[stack.length - 1]) {
        iter.next(error)
      }
      yield value
    }
  });
  yield;
}

function promify() {
  var self = arguments[0];
  var func = arguments[1];
  var args = [];
  for (var i = 2; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return new Promise(function(resolve, reject) {
    args.push(function(error, data) {
      console.log(data)
      if (error) {
        reject(error)
      } else {
        if (arguments.length === 2) {
          resolve(data);
        } else {
          resolve(arguments);
        }
      }
    })
    func.apply(self, args);
  });
}

function preturn(value) {
  return new Promise(function(resolve, reject){
    resolve(value);
  });
}

module.exports = {
  await: _await,
  async: _async,
  asyncroute: _asyncroute,
  promify: promify
};
