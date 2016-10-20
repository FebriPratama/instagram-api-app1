'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .factory('Api', ['$http','ApiEndpoint','$filter',Api]);
  
function Api($http,ApiEndpoint,$filter) {

    var instagrams = [];

    return {

      setData : function(input){
        
          instagrams = input;
      },
      
      setDataSingle : function(input){
          
          check = false;
          for(var i = 0; i < instagrams.length; i++){
            if(angular.equals(instagrams[i], input)) check = true;
          }

          if(!check) instagrams.push(input);

      },

      updateDataSingle : function(input){

          for(var i = 0; i < instagrams.length; i++){
            if(angular.equals(instagrams[i].ig_id, input.ig_id)) instagrams[i] = input;
          }

      },

      getData : function(){

          return instagrams;

      },

      getTimeline : function() {

            return $http.get(ApiEndpoint.url + 'instagram/timeline');

      },

      getComments : function(id) {

            return $http.get(ApiEndpoint.url + 'instagram/timeline');

      },

      getAllInstagram : function() {

            return $http.get(ApiEndpoint.url + 'instagram');

      }

    }

};
