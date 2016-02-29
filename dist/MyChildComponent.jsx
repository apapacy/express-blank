"use strict";
var React = require("react");

class MyChildComponent extends React.Component {
  render() {
    return React.createClass('span', null, ["+-+"]);
  }
}

module.exports = MyChildComponent;
