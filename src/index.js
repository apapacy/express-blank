var $ = require('jquery');
require('css!./index.css');
require('./header');
if (NODE_ENV === 'production') {
	$('body').append('There is Production mode.');
} else {
	$('body').append('There is Development mode.');
}
