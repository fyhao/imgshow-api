var imgshow = require('./imgshow.js');

var win = Ti.UI.createWindow({title:'Currency'});
var btn = Ti.UI.createButton({left:5,top:5,right:5,bottom:5,title:'Show Me Currency'});
btn.addEventListener('click', function() {
	imgshow().name('currency').p('source','yql').load(function(result) {
		alert(result);
	});	
});