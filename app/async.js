function testPromise(message, timeout) {
  return new Promise(function(ok, ex) {
    setTimeout(function() {
      ok(message);
    }, timeout);
  });
}
async.stack = []
function* async(promise) {
  var it = async.stack.pop();
  promise.then(function(value) {
    async.stack.push(it)
    var next = it.next(value);
    if (next.done) {
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

function* main(message) {
  var value = yield * async(testPromise(message, 3000))
  console.log("*****" + value);
  console.log("after first promise");
  var value = yield * async(testPromise("2nextMessage", 3000))
  console.log("*****" + value);
  console.log("after 2first promise");
  var value = yield * async(testPromise("3nextMessage", 3000))
  console.log("*****" + value);
  console.log("after 3first promise");
  var value = yield * async(testPromise("4nextMessage", 3000))
  console.log("*****" + value);
  console.log("after 4first promise");
  var value = yield * async(testPromise("5nextMessage", 3000))
  console.log("*****" + value);
  console.log("after 5first promise");
  var value = yield * async(testPromise("6nextMessage", 3000))
  console.log("*****" + value);
  console.log("after 6first promise");
  var value = yield * async(testPromise("7nextMessage", 3000))
  console.log("*****" + value);
  console.log("after 7first promise");
  var value = yield * async(testPromise("8nextMessage", 3000))
    console.log(value);
}

run(null, main, ["restify"]);

function* test(){
  var test = yield 16;
  console.log("test: " + test)
}

//var it = test(18);
//console.log(it.next())
//console.log(it.next(20))
