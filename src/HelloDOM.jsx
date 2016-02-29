"use strict";
var React = require('react');
var ReactDOMServer = require('react-dom/server');

class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

var output = ReactDOMServer.renderToString(<MyComponent />);
console.log(output)





module.exports = output;
