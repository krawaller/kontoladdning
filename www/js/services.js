var login = require('vasttrafik-login');
var getCards = require('vasttrafik-cards');
var Q = require('kew');

angular.module('kontoladdning.services', [])

.factory('CardsService', function($rootScope, $ionicLoading, AuthService) {

  var CardsService = {};
  var isRetrying;

  CardsService.refresh = function() {
    AuthService.ensureLoggedIn()
      .then(getCards)
      .fail(function(error) {
        if (!isRetrying) {
          isRetrying = true;
          AuthService.setSessionIsStale();
          CardsService.refresh();
        } else {
          $rootScope.$broadcast('cardsError', error);
        }
      })
      .then(function(data) {
        data.Cards.lastUpdated = new Date();
        $rootScope.$broadcast('cards', data.Cards);
        $ionicLoading.hide();

        isRetrying = false;
      })
  }
  return CardsService;
})

.factory('AuthService', function($rootScope) {

  var loggedIn = false;

  return {

    ensureLoggedIn: function() {
      var promise;
      if (loggedIn) {
        var deferred = Q.defer();
        promise = deferred.promise;
        deferred.resolve();
      } else if (this.hasCredentials()) {
        promise = this.login(localStorage.getItem('username'), localStorage.getItem('password'));
      } else {
        var deferred = Q.defer();
        promise = deferred.promise;
        deferred.reject('Cannot log in without credentials');
      }
      return promise;
    },

    hasCredentials: function() {
      return !!(localStorage.getItem('username') && localStorage.getItem('password'));
    },

    login: function(username, password) {
      return login({ username: username, password: password })
        .then(function() {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);

          loggedIn = true;
          $rootScope.$broadcast('loggedIn', { 'loggedIn' : loggedIn });
        })
    },

    logout: function() {
      localStorage.removeItem('username');
      localStorage.removeItem('password');

      loggedIn = false;

      // TODO: clear request jar
    },

    setSessionIsStale: function() {
      loggedIn = false;
    }

  }

})
