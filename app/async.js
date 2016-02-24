"use strict";

var stack = [];

setInterval(function() {
  console.log(stack)
}, 5000);


function $promify(args) {
  var output = [];
  if (typeof args[0] === "function") {
    output[0] = $c2p(args);
    return output;
  }
  for (var i = 0; i < args.length; i++) {
    if (args[i] instanceof Array) {
      output[i] = $c2p(args[i]);
    } else {
      output[i] = args[i];
    }
  }
  return output;
}

// Throwable await
function* $tawait() {
  var promises = $promify(arguments);
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
      throw ex;
    }
  }).catch(function(ex) {
    throw ex;
  });
  return yield;
}


// Errorreturned await
function* $eawait() {
  var promises = $promify(arguments);
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
      throw ex;
    }
  }).catch(function(ex) {
    var next;
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
      throw ex;
    }
  });
  return yield;
}

function $async(func, args) {
  var iter = func.apply(this, args);
  stack.push(iter);
  iter.next();
}

function $asyncroute(func) {
  return function(req, resp, next) {
    try {
      return $async(func, arguments);
    } catch (ex) {
      resp.status(500).send(ex).end();
    }
  }
}

function $c2p(args) {
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
  await: $tawait,
  tawait: $tawait,
  eawait: $eawait,
  async: $async,
  asyncroute: $asyncroute
};
