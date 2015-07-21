mControllers.controller('mainController', ['$scope', '$resource', '$interval', function($scope, $resource, $interval) {

	var tickTime = 2000;
	var oldTick;

	var stripValues = function(data) {
	    return _.each(data.metrics, function(val) {
	        delete val.snapshot.values;
	    });
	};

	var convertToMilliseconds = function(data) {
		data = _.each(data, function(val, queryName) {
			_.each(data[queryName], function(val, key) {
				if (key == "snapshot") {
					_.each(val, function(numVal, numKey) {
						data[queryName].snapshot[numKey] = numVal / 1000000;
					});
				}
			});
		});
		return data;
	};

	var addRate = function(data) {
		if (!oldTick) return data;
		_.each(data.metrics, function(metric, queryName) {
			var oldCount = oldTick.metrics[queryName].count;
			var rate = ((metric.count - oldCount) / tickTime) * 1000;
			data.metrics[queryName].rate = rate;
		});
		return data;
	};

	var toArray = function(data) {
		var dataArray = [];
		_.each(data, function(val, key) {
			val.queryName = key;
			dataArray.push(val);
		});
		return dataArray;
	};

	var sortByCount = function(data) {
		var dataArray = toArray(data);
		dataArray = _.sortBy(dataArray, function(metric) {
			return metric.count;
		});
		return dataArray.reverse();
	};

	var loadData = function() {
		$resource('/metrics').get(function(data) {
			data = addRate(data);
			oldTick = data;
			data = sortByCount(convertToMilliseconds(stripValues(data)));
			$scope.metrics = data;
		});
	};

	$interval(loadData, tickTime);
	
}]);