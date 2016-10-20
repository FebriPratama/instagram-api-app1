'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, Api) {  	

    // get instagram
    Api.getAllInstagram().success(function(data){
    	Api.setData(data.data);
    });

  })
  .controller('ReportCtrl', function($scope, $state, Api, $auth) {
  	$scope.medias = [];

	Api.getTimeline().success(function(data){
		$scope.medias = data.data;
	});

	$scope.getComments = function(a){
		Api.getComments(a.id).success(function(data){
			a.comments_data = data.data;
		});
	}

	$scope.closeComment = function(a){
		if(a.comments_data) delete a.comments_data;
	}

  })
  .controller('SettingCtrl', function($scope, $state, Api, $auth) {
  	$scope.instagrams = [];

	$scope.authenticate = function(provider) {
		
		$auth.authenticate(provider).then(function(response) {
			
			if(response.data.status) Api.updateDataSingle(response.data.data);

		});

	};

    // get instagram
    $scope.$watch(function(){ return Api.getData() }, function(newValue) {
    	$scope.instagrams = newValue;
    }, true);

  })
  .controller('overviewCtrl',function($scope, $state, $timeout){

	  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	  ];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };

	  // Simulate async data update
	  $timeout(function () {
	    $scope.data = [
	      [28, 48, 40, 19, 86, 27, 90],
	      [65, 59, 80, 81, 56, 55, 40]
	    ];
	  }, 3000);

  });
