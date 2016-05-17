'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
	'mwl.bluebird'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/closedCaptioning', {
			templateUrl: '/app/closedCaptioning/closedCaptioning.html',
			controller: 'MainCtrl'
		})
		.otherwise({redirectTo: '/closedCaptioning'});
}]);

angular.module('mwl.bluebird').run(function($q, $log) {
	$q.onPossiblyUnhandledRejection(function(err) {
		$log.warn('Unhandled rejection', err);
	});
});