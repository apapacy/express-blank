define(function (require, exports, module) {"use strict";
var React = require("react");

class MyChildComponent extends React.Component {
  render() {
    return React.createElement("span", null, "+-+***");
  }
}

module.exports = MyChildComponent;

});
