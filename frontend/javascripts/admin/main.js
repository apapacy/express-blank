define(["react", "react/HelloDOM"], function(React, hello){

alert("main")

React.render(hello, document.getElementsByTagName("body")[0])

});
