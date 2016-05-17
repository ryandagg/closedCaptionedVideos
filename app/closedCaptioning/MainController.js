'use strict';

angular.module('myApp').controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $timeout, $location, $anchorScroll, Video) {
	var model = {};
	$scope.model = model;
	model.videoElem; // this is set in the videoDirective
	model.closedCaptioningDataIndex = 0;

	//<editor-fold desc="private functions"

	var initialize = function(){
		// this prevents the page from reloading when the $location.hash is set while updating the correct scroll position.
		$scope.$on('$locationChangeStart', function(ev) {
			ev.preventDefault();
		});

		// get the closed captioning text and times.
		Video.getVideoData()
			.then(function(closedCaptioningData){
				model.closedCaptioningData = closedCaptioningData;
			})
			.catch(function(err){
				console.log(err);
			});


	};
	//</editor-fold> desc="private functions"


	//<editor-fold desc="public methods"

	model.pauseOrPlay = function(){
		if(model.videoElem.paused){
			model.videoElem.play();
		}
		else{
			model.videoElem.pause();
		}
	};


	// this currently can only move the video backwards in time due to limitations of Chrome or from having the video load from directly from the client.
	model.updateVideoTime = function(time, index){
		model.closedCaptioningDataIndex = index;
		model.videoElem.currentTime = time;
	};

	model.initializeVideoCurrentTimeListener = function(){
		// using an old fashioned setInterval because $scope.$watch goes bananas with how much the videos currentTime gets updated.

		setInterval(function(){
			var currentTime = model.videoElem.currentTime;
			if(currentTime > model.closedCaptioningData[model.closedCaptioningDataIndex + 1].time){

				// look ahead to make sure model.closedCaptioningDataIndex isn't lagging behind the video player.
				// This should generally only loop once or twice.
				for(var i = model.closedCaptioningDataIndex + 1; i < model.closedCaptioningData.length; i++){
					if(model.closedCaptioningData[i].time > currentTime){
						$timeout(function(){
							// setting model.closedCaptioningDataIndex manages which sentence is highlighted using ng-class
							model.closedCaptioningDataIndex = i - 1;
							var anchorString = "anchor" + model.closedCaptioningDataIndex;
							if($location.hash() !== anchorString){
								console.log("going to " + anchorString)
								$location.hash(anchorString);
								$anchorScroll();
							}
						});
						break;
					}
				}
			}
		}, 1000)
	};
	//</editor-fold> desc="public methods"


	// load the data for the model.
	initialize();

}