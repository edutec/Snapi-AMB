Process.prototype.newAssociation = function(key,value) {
	return new Association(key,value);
}

Process.prototype.setValue = function(association,value) {
	association.setValue(value);
}

Process.prototype.getValue = function(association) {
	return association.value;
}

Process.prototype.associationAt = function (key, snapObject) {
	var array = snapObject.asArray();

	for(var i = 0; i < array.length; i++) {
		if(array[i].key == key) { return array[i] }
	}

	return Association(null,null);
}

Process.prototype.valueAt = function (key, snapObject) {
	return this.associationAt(key, snapObject).value;
}

Process.prototype.jsonObject = function (jsonString) {

	return toSnapObject(JSON.parse(jsonString));

	function toSnapObject(jsonObject) {
		if (jsonObject instanceof Array) {
			return new List(jsonObject.map(function(eachElement) { return toSnapObject(eachElement) }));
		} else if (jsonObject instanceof Object) {
			return new List(Object.keys(jsonObject).map( function(eachKey) { return new Association(eachKey, toSnapObject(jsonObject[eachKey])) }))
		} else {
			return jsonObject;
		}
	}
}
