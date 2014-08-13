// TODO: fix refresh when app reactivated and info stale

angular.module('kontoladdning.controllers', [])

.controller('LoginCtrl', function($scope, $state, $location, $ionicLoading, AuthService) {
  $scope.form = {};

  $scope.logIn = function() {
    $ionicLoading.show({
      template: '<i class="icon ion-ios7-reloading"></i> Loggar in...'
    });

    AuthService.login($scope.form.username, $scope.form.password)
      .then(function() {
        delete $scope.form.error;
        $location.path('/cards');
        $scope.$apply();
      })
      .fail(function(error) {
        if (error == 'Access denied') {
          $scope.form.error = 'Felaktigt användarnamn eller lösenord.';
        } else if (error.cors == 'rejected') {
          $scope.form.error = 'Kunde inte ansluta till servern.';
        } else {
          $scope.form.error = error;
        }
        $ionicLoading.hide();
        $scope.$apply();
      })
  };

  $scope.getPreviousTitle = function() {
    return 'woot'
  };

})

.controller('CardsCtrl', function($scope, $state, $interval, $filter, $ionicLoading, CardsService, AuthService) {


  function refreshWithModalLoader() {
    CardsService.refresh();

    $ionicLoading.show({
      template: '<i class="icon ion-ios7-reloading"></i> Laddar...'
    });
  }

  function refreshWithModalLoaderIfStaleOrError() {
    if (!$scope.cards || $scope.error || moment($scope.lastUpdated).add('hours', 1) < moment()) {
      refreshWithModalLoader();
    }
  }

  document.addEventListener('resume', refreshWithModalLoaderIfStaleOrError, false);
  document.addEventListener('online', refreshWithModalLoaderIfStaleOrError, false);

  refreshWithModalLoader();

  $scope.$on('cards', function(ev, cards) {
    delete $scope.error;
    $scope.cards = cards;
    $scope.lastUpdated = cards.lastUpdated;
    updateLastUpdated();

    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }, true);

  $scope.$on('cardsError', function(ev, cardsError) {
    $scope.error = 'Kunde inte ansluta till servern.';
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }, true);


  $scope.logOut = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.doRefresh = CardsService.refresh;

  function updateLastUpdated() {
    $scope.lastUpdatedFormatted = $filter('momentAgo')($scope.lastUpdated);
  }

  $interval(updateLastUpdated, 60000);
})


.controller('InfoCtrl', function($scope, $state, $ionicNavBarDelegate) {
  console.log(1)
  $scope.getPreviousTitle = function() {
    console.log(2)
    debugger;
    return $ionicNavBarDelegate.getPreviousTitle();
  };
})


