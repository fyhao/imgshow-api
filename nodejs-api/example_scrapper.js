// to get title of the web page
var imgshow = require('imgshow');

imgshow().name('scrapper').p('url','https://github.com/fyhao/imgshow-api').p('selector','title').load(function(result) {
	console.log(result);
});