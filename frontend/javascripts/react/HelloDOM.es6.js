"use strict";
var React = require('react');
var MyChildComponent = require("./MyChildComponent.jsx");
console.log(MyChildComponent.toString());

class MyComponent extends React.Component {
  render() {
    return React.createElement("div", null, "Hello World ", React.createElement(MyChildComponent, null), " ", this.props.name);
  }
}

module.exports = MyComponent;
