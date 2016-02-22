function testPromise(message, timeout) {
  return new Promise(function(ok, ex) {
    setTimeout(function() {
      ok(message);
    }, timeout);
  });
}

function* async(promise) {
  promise.then(function(value) {
    it.next(value);
  });
  return yield;
}

function run(func, args) {
  var self = null;
  if (typeof this === "object") {
    self = this;
  }
  var iter = func.apply(self, args);
  console.log(iter.next());
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
    //console.log(value);
}



var it = main("rest");
console.log(it.next());
