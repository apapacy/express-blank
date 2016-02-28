"use strict";

var React = require('react');
var ReactDOMServer = require('react-dom/server');

class MyComponent extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      'Hello World'
    );
  }
}

var output = ReactDOMServer.renderToString(React.createElement(MyComponent, null));
console.log(output);

module.exports = output;