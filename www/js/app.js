angular.module('kontoladdning', ['ionic', 'kontoladdning.controllers', 'kontoladdning.services', 'kontoladdning.filters'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl',
      resolve: {
        redirect: function(AuthService, $location) {
          if (AuthService.hasCredentials()) {
            $location.path('/cards');
          }
        }
      }
    })

    .state('cards', {
      url: '/cards',
      templateUrl: "templates/cards.html",
      controller: 'CardsCtrl'
    })

    .state('info', {
      url: '/info',
      templateUrl: "templates/info.html",
      controller: 'InfoCtrl'
    })

  $urlRouterProvider.otherwise('/login');

});
