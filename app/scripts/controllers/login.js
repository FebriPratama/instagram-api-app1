'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {
  	$scope.data = false;
    $scope.submit = function(valid,data) {

		if(valid && data.email == 'admin@diplir.com' && data.password == 'silahkanmasuk123'){
			$location.path('/dashboard');
		}else{
			$scope.data = true;
		}    

      return false;
    }

  });
