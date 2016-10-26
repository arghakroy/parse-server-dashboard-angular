'use strict';

//Setting up route
angular
  .module('parse-app').config(['$stateProvider','$urlRouterProvider','ngParseProvider',
  function($stateProvider, $urlRouterProvider, ngParseProvider) {

    ngParseProvider.initialize(
      'appid123',
      'http://localhost:8080/parse'
    );
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/content.html',
      controller: 'MainController'
    });
  }
  ]);
//
// //Setting HTML5 Location Mode
// angular.module('parse-app').config(['$locationProvider',
//   function($locationProvider) {
//     $locationProvider.hashPrefix('!');
// }
// ]);
