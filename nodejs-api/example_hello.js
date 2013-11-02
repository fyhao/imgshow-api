var imgshow = require('imgshow');

imgshow().name('currency').p('source','yql').load(function(result) {
	console.log(result);
});

imgshow().name('weather')
		 .p('lat','1.56757569313')
		 .p('lng', '103.755691528')
		 .p('display', 'info')
		 .load(function(result) {
				console.log(result);
			   });
			   

imgshow().name('psi')
		 .p('place','my')
		 .p('label','1')
		 .load(function(result) {
				console.log(result);
			   });