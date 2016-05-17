angular.module('myApp').directive('videoDirective', function(){
	return {
		replace: true,
		template: '<video id="video" width="640" height="480" ng-click="model.pauseOrPlay()" video-current-time="model.currentTime" controls autoplay> ' +
			'<source src="Beginners Sewing Course -  Day 1 - The Basics.mp4" type="video/mp4">' +
		'</video>',
		link: function(scope, element, attrs){
			scope.model.videoElem = element[0];
			scope.model.initializeVideoCurrentTimeListener();
		}
	};
});