var util = {
	
	say : function(message) {
		session.execute('speak', 'tts_commandline|festival|' + message);
	}
	,
	
    frequest : function(args) {
		var result = fetchUrl(args.url);
		if(args.callback) {
			args.callback(result);
		}
	}
	
}


var imgshow = function(request) {
  var c = new Object();
  c.params = [];
  c.seperator = ",";
  c.name = function(value) {
    this.params = [];
    this.p("name", value);
    this.p("freeswitch", "1");
    return this;
  };
  c.p = function(name, value) {
    var item = new Object();
    item.name = name;
    item.value = value;
    this.params.push(item);
    return this;
  };
  c.buildQuery = function() {
    var q = "q:";
    var arr = [];
    for(var i in this.params) {
     var item = this.params[i];
     if(item.name == null || item.name == '') continue;
     if(item.value == 'undefined') continue;
     arr.push(item.name + "=" + item.value);
    }
    q += arr.join(this.seperator);
    return q;
  };
  
  c.load = function(callback) {
	    var query = this.buildQuery();
	    
	    var params = [];
	    params.k = query;
	    params.api = 1;
	    if(this.seperator != ",")
	      params.s = this.seperator;
	    var url = 'http://web.qxinnet.com/script/imgshow/?';
	    if(params) {
	    	var comma = '';
	    	for(var k in params) {
	    		var v = params[k];
	    		url += comma;
	    		url += k + '=' + v;
	    		comma = '&';
	    	}
	    }
	    var referer = 'freeswitch';
	    if(request) {
	    	referer = request.headers.host;
	    }
	    util.frequest({
	    	url : url,
	    	headers : {
	    		referer : referer,
	    		'X-FREESWITCH-APP' : '1.0'
	    	},
	    	callback : function(content) {
	    		callback(content);
	    	}
	    });
	    
	 };
	  return c;
	}