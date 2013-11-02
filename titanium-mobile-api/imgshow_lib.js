var imgshow = function() {
	var c = new Object();
  c.params = [];
  c.seperator = ",";
  c.name = function(value) {
    this.params = [];
    this.p("name", value);
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
	    		comma = this.seperator;
	    	}
	    }
	   var referer = 'titanium mobile';
	    frequest({
	    	url : url,
	    	headers : {
	    		referer : referer,
	    		'X-TI-APP' : Ti.Platform.version
	    	},
	    	callback : function(content) {
	    		callback(content);
	    	}
	    });
	    
	  };
	  return c;
	}
	
var frequest = function(args) {
	
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var res = this.responseText;
		
		if(args.callback) {
			args.callback(res);
		}
		
		if(args.callbackJSON) {
			args.callbackJSON(JSON.parse(res));
		}
	};
	
	xhr.onerror = function(e) {
		// detect message
		var errortitle = 'Connection Failure Error';
		var errormsg = ''; // define some suggested network failure message
		if(e.error && e.error.indexOf('A connection failure occurred')) {
			errormsg = 'A connection failure occurred';
		}
		if(args.errorCallback) {
			args.errorCallback({
				e : e,
				errormsg : errormsg
			});
		} else {
			Ti.UI.createAlertDialog({
				title : errortitle,
				message : errormsg
			}).show();
		}
	}
	
	var method = args.method || 'GET';
	xhr.open(method, args.url);
	if(args.headers) {
		for(var k in args.headers) {
			var v = args.headers[k];
			xhr.setRequestHeader(k,v);
		}
	}
	var params = args.params || null;
	if(params != null) 
		xhr.send(params);
	else
		xhr.send();
};

module.exports = imgshow;