"use strict";
var React = require('react');
var MyChildComponent = require("./MyChildComponent.jsx");
console.log(MyChildComponent.toString());

class MyComponent extends React.Component {
  render() {
    return React.createClass('div', null, ["Hello World ", MyChildComponent()," ", this.props.name]);
  }
}

module.exports = MyComponent;
