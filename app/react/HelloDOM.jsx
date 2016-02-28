"use strict";
var React = require('react');

class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

module.exports = React.createElement(MyComponent, null);
