'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$http', '$scope', '$timeout', '$window', '$filter', 'Authentication', 'FileUploader',
	function ($http, $scope, $timeout, $window, $filter, Authentication, FileUploader) {
		$scope.user = Authentication.user;
		$scope.imageURL = $scope.user.profileImageURL;

		// Create file uploader instance
		$scope.uploader = new FileUploader({
			url: 'api/users/picture'
		});

		// Set file uploader image filter
		$scope.uploader.filters.push({
			name: 'imageFilter',
			fn: function (item, options) {
				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			}
		});

		// Called after the user selected a new picture file
		$scope.uploader.onAfterAddingFile = function (fileItem) {
			if ($window.FileReader) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL(fileItem._file);

				fileReader.onload = function (fileReaderEvent) {
					$timeout(function () {
						$scope.imageURL = fileReaderEvent.target.result;
					}, 0);
				};
			}
		};

		// Called after the user has successfully uploaded a new picture
		$scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
			// Show success message
			$scope.success = true;

			// Populate user object
			$scope.user = Authentication.user = response;

			// Clear upload buttons
			$scope.cancelUpload();
		};

		// Called after the user has failed to uploaded a new picture
		$scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
			// Clear upload buttons
			$scope.cancelUpload();

			// Show error message
			$scope.error = response.message;
		};

		// Change user profile picture
		$scope.uploadProfilePicture = function () {
			// Clear messages
			$scope.success = $scope.error = null;

			// Start upload
			$scope.uploader.uploadAll();
		};

		// Cancel the upload process
		$scope.cancelUpload = function () {
			$scope.uploader.clearQueue();
			$scope.imageURL = $scope.user.profileImageURL;
		};

		$scope.chooseDefaultPicture = function () {
			// Reset the success / error messages
			$scope.success = $scope.error = null;

			// Set profileImageURL to gravatar
			$scope.imageURL = $scope.user.profileImageURL = 'modules/users/img/profile/default.png';

			// build request body
			var postData = { default: true, imageURL: $scope.imageURL };

			// send POST request
			$scope.postPictureData(postData);
		};

		$scope.chooseGravatarPicture = function () {
			// Reset the success / error messages
			$scope.success = $scope.error = null;

			// Set profileImageURL to gravatar
			$scope.imageURL = $scope.user.profileImageURL = 'https://www.gravatar.com/avatar/' + $filter('gravatar')(Authentication.user.email);

			// build request body
			var postData = { gravatar: true, imageURL: $scope.imageURL };

			// send POST request
			$scope.postPictureData(postData);
		};

		$scope.postPictureData = function (postData) {
			// Post postData to api
			$http.post('/api/users/picture', postData).success(function(response) {
				// Display success message
				$scope.success = true;
			}).error(function(response) {
				// Display success message
				$scope.error = response.message;
			});
		};
	}
]);
