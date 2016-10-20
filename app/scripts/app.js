'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'chart.js',
    'satellizer'
  ])
  .constant('ApiEndpoint', {

      url: document.location.hostname.indexOf('localhost') > -1 ? 'http://localhost:7000/api/' : 'https://api-febripratama.rhcloud.com/api/',
      main: document.location.hostname.indexOf('localhost') > -1 ? 'http://localhost:3000/' : 'https://api-febripratama.rhcloud.com',
      urlAuth : document.location.hostname.indexOf('localhost') > -1 ? 'http://localhost:7000/auth/' : 'https://api-febripratama.rhcloud.com/auth/',

  })
  .config(function($authProvider,ApiEndpoint) {

    var url = document.location.hostname.indexOf('localhost') > -1 ? 'http://localhost:7000/api/' : 'http://api-febripratama.rhcloud.com/api/';

    $authProvider.instagram({
      clientId: '123e98982938417882a4d126ec323ef3',
      url: ApiEndpoint.url + 'auth/instagram',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
      redirectUri: window.location.origin + '/#/dashboard/setting',
      requiredUrlParams: ['scope'],
      scope: ['basic','comments','public_content','follower_list','relationships','likes'],
      scopeDelimiter: '+',
      type: '2.0'
    });

  })
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/home');
/*    $locationProvider.html5Mode({ enabled: true, requireBase: false });*/

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('home', {
          url: '/home',
          parent: 'base',
          templateUrl: 'views/home.html',
          controller: 'LoginCtrl'
        })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('privacy', {
          url: '/page/privacy',
          parent: 'base',
          templateUrl: 'views/privacy.html'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            controller: 'overviewCtrl',
            templateUrl: 'views/dashboard/overview.html'
          })
          .state('reports', {
            url: '/reports',
            controller : 'ReportCtrl',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html'
          })
          .state('setting', {
            url: '/setting',
            controller : 'SettingCtrl',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/setting.html'
          });

  });
