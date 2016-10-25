'use strict';

//Setting up route
angular
  .module('parse-app').config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    
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
