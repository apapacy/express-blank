var React = require('react');
module.exports = React.createClass({ displayName: 'Toolbar',
	render: function () {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'button',
				null,
				'Button 1'
			)
		);
	}
});