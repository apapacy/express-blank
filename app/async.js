var stack = [];

function* await (promise) {
  var iter = stack.pop();
  Promise.all(arguments).then(function(value) {
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

module.exports = {
  await: await,
  async: async
};
