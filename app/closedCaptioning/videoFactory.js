angular.module('myApp').factory('Video', function ($q) {
	var Video = {};

	// in a real app this would take at least an id argument and clearly make a call to the server.
	// This mock scenario does neither.
	// This is using promises on synchronous code just to show that it is how it would  work if actually make a http GET call.
	Video.getVideoData = function(){
		return new $q(function(resolve, reject){

			var timeCounter = 0;

			var closedCaptioningData = [];

			var sentenceFodder = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

			var sentences = sentenceFodder.split(". ");

			for(var i = 0; i < 200; i++){
				closedCaptioningData.push({
					time: timeCounter,
					text: sentences[i % sentences.length]
				});
				timeCounter += 4;
			}
			resolve(closedCaptioningData);
		})
	};



	return Video;
});