var stack = [];

function* await (promise) {
  if (!promise || typeof (promise.then) !== "function") {
    return promise;
  }
  var iter = stack.pop();
  promise.then(function(value) {
    stack.push(iter);
    try {
      var next = iter.next(value);
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

module.exports = {
  await: await,
  async: async
};
