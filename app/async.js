function* async(promise) {
  var iter = async.stack.pop();
  promise.then(function(value) {
    async.stack.push(iter);
    var next = iter.next(value);
    if (!next.done) {
      async.stack.pop();
    }
  });
  return yield;
}

function run(self, func, args) {
  var iter = func.apply(self, args);
  async.stack.push(iter);
  iter.next();
}

async.run = run;

async.stack = []

module.exports = async;
