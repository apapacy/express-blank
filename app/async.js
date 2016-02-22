function testPromise(message, timeout){
  return new Promise(function(ok, ex){
    setTimeout(function(){ok(message);console.log("***"+message)}, timeout);
  });
}

function ASYNC(self, promise){
    promise.then(function(value));
}

function noop(value){return value;}

function* main(message){
  console.log(yield ASYNC(this, testPromise(message)));
}
