function testPromise(message, timeout){
  return new Promise(function(ok, ex){
    setTimeout(function(){ok(message);console.log("***"+message)}, timeout);
  });
}

function ASYNC(self, promise){
  console.log(this === self)
}

function noop(value){return value;}

function* main(message){
  console.log(yield ASYNC(this, message));
}
main().next()
