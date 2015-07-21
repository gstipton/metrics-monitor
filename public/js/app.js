var metricsMonitor = angular.module('metrics-monitor', ['ngResource', 'controllers']);
var mControllers = angular.module('controllers', []);

metricsMonitor.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);