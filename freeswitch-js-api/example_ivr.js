include('imgshow.js');

if(session.ready()) {
	session.answer();
	util.say('Please hold while we querying the weather');
	
	imgshow().name('weather').p('lat', lat).p('lng', lng).p('display', 'label').p('stat', 'freeswitch').load(function(message) {
		util.say('the weather now is ' + message);
	});
}