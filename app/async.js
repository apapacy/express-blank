var stack = [];

setInterval(function() {
  console.log(stack)
}, 5000);

function* await (func, args) {
  var promises = []
  if (typeof func === "function") {
    promises[0] = c2p(func, args);
  } else {
    for (var i = 0; i < arguments.length; i++) {
      promises[i] = arguments[i];
    }
  }
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
      if (!next.done) {
        stack.pop();
      }
    } catch (ex) {
      stack.pop();
      throw ex;
    }
  }).catch(function(ex) {
    throw ex;
  });
  return yield;
}

function async(func, args) {
  var iter = func.apply(this, args);
  stack.push(iter);
  iter.next();
}

function asyncroute(func) {
  return function() {
    return async(func, arguments);
  }
}

function c2p(func, args) {
  return new Promise(function(ok, err) {
    args.push(function(error, data) {
      if (error) {
        err(error)
      } else {
        ok(data);
      }
    })
    func.apply(null, args);
  });
}

module.exports = {
  await: await,
  async: async,
  c2p: c2p,
  asyncroute: asyncroute
};
