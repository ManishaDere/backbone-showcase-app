var setFilters = function(newFilters) {
	var oldFilters = getFilters();
	_.extend(oldFilters, newFilters);
	localStorage.setItem('filters', JSON.stringify(oldFilters));
}

var getFilters = function() {
	var filters = localStorage.getItem('filters');
	filters = JSON.parse(filters);
	return filters;
}


