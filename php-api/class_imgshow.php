<?php
class imgshow {
	var $params = array();
	var $api = 1;
	var $seperator = ',';
	public function name($name) {
		$this->params['name'] = $name;
		return $this;
	}
	
	public function p($param, $value) {
		$this->params[$param] = $value;
		
		return $this;
	}
	
	public function get() {
		$k = 'q:';
		
		foreach($this->params as $key => $value) {
			$k .= $key.'='.$value.$this->seperator;
		}
		$k = substr($k, 0, strlen($k)-strlen($this->seperator));
		return $k;
	}
	
	public function load($qglstr = '') {
		if($qglstr == '')
			$qglstr = $this->get();
		if($this->seperator != ',')
			$addseperator = '&seperator='.$this->seperator;
		$url = 'http://web.qxinnet.com/script/imgshow/?api=1&'.$addseperator.'&k='.urlencode($qglstr);
		$ch = curl_init();curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_REFERER, $_SERVER['HTTP_HOST']);
		$c = curl_exec($ch);
		curl_close($ch);
		return $c;
	}
	
	public function show($qglstr) {
		echo $this->load($qglstr);
	}
}



?>