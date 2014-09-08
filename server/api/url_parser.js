
module.exports.get_document_ids = function(url) {
	var parsed_url_array = url.split('/');

	var index = 2;

	var object_to_id_map = new Object();


	while(true) {
		object_type_name = parsed_url_array[index];
		id_name = object_type_name.substring(0, object_type_name.length - 1) + '_id';
		object_to_id_map[id_name] = parsed_url_array[index + 1];
		index += 2;
		if (index >= parsed_url_array.length - 1) break;
	}
	return object_to_id_map;
}