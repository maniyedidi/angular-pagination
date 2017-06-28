'use strict';

/**
 * @ngdoc overview
 * @name angularPagination
 * @description
 * # angularPagination
 *
 * Main module of the application.
 */


function bootstrapAngular() {
  angular
    .module('angularPagination')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function(
        $stateProvider,
        $urlRouterProvider,
        ) {
            
         $stateProvider
            .state('/demo', {
                url: '/',
                templateUrl: 'views/demo.html',
                controller: 'exampleController',
                controllerAs: 'exampleController'
            })
        $urlRouterProvider.otherwise("/");
      }
    ])
}

bootstrapAngular();
