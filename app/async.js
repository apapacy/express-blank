"use strict";

var stack = [];

function _async(func, args) {
  var iter = func.apply(this, args);
  stack.push(iter);
  iter.next();
}

// For Express user
function _asyncroute(func) {
  return function(req, resp, next) {
    try {
      return _async(func, arguments);
    } catch (ex) {
      console.log(ex);
    }
  }
}

function* _await() {
  var promises = _promify(arguments);
  var iter = stack.pop();
  Promise.all(promises).then(function(value) {
    stack.push(iter);
    try {
      var next;
      if (value.length === 1) {
        next = iter.next(value[0]);
      } else {
        next = iter.next(value);
      }
      stack.pop();
    } catch (ex) {
      if (stack[stack.length] === iter) {
        stack.pop();
      }
      throw ex; //?
    }
  }).catch(function(error) {
    var next;
    stack.push(iter);
    try {
      var next;
      next = iter.next(error);
      stack.pop();
    } catch (ex) {
      if (stack[stack.length] === iter) {
        stack.pop();
      }
      throw ex;
    }
  });
  return yield;
}

// Promify standard node async calbacks(error, data){...}
function _promify(args) {
  var output = [];
  // await(asyncFunction, arg0, ...)
  if (typeof args[0] === "function") {
    output[0] = _c2p(args);
    return output;
  }
  // await(... , ..., [asyncFunction, arg0, ...], ..., [...] so on)
  for (var i = 0; i < args.length; i++) {
    if (args[i] instanceof Array) {
      output[i] = _c2p(args[i]);
    } else {
      output[i] = args[i];
    }
  }
  return output;
}

function _c2p(args) {
  var func = args[0];
  var output = [];
  for (var i = 1; i < args.length; i++) {
    output.push(args[i]);
  }
  return new Promise(function(ok, err) {
    output.push(function(error, data) {
      if (error) {
        err(error)
      } else {
        ok(data);
      }
    })
    func.apply(null, output);
  });
}

module.exports = {
  await: _await,
  async: _async,
  asyncroute: _asyncroute
};
