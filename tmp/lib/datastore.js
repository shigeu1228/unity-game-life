var getData = function(key_name) {
	
	var data = $.cookie(key_name);
	if (data === undefined) {
		return {};
	}
	return JSON.parse(data);
};

var setData = function(key_name, data) {
	$.cookie(key_name, JSON.stringify(data), { expires: 365, path: '/', json: true });
};
