var login = require('vasttrafik-login');
var getCards = require('vasttrafik-cards');
var Q = require('kew');

angular.module('kontoladdning.services', [])

.factory('CardsService', function($rootScope, $ionicLoading) {

  // Some fake testing data
  var cards = ({
    "__type": "ResponseGetVtkCardsWithPaging:#Customer.CustomerServices.EPiServerWs.ServiceLogicLayer.DataContracts",
    "RDC_Successful": true,
    "RDC_Messages": [],
    "Cards": [
      {
        "__type": "VtkCard:#Customer.CustomerServices.EPiServerWs.ServiceLogicLayer.DataContracts",
        "EntityId": 0,
        "EntityType": null,
        "Charges": [
          {
            "__type": "VtkCardCharge:#Customer.CustomerServices.EPiServerWs.ServiceLogicLayer.DataContracts",
            "EntityId": 0,
            "EntityType": null,
            "Amount": -1645,
            "AutoLoadCanBeDisabledInstantly": false,
            "AutoLoadEnabled": false,
            "Buyable": true,
            "CardId": 618208,
            "ChargeName": "Kontoladdning",
            "DIBSTicketNr": "",
            "ExpiryTime": "/Date(253402297199999+0100)/",
            "IsAccount": true,
            "ItemInBasket": false,
            "LastActivityDateTime": "/Date(1388144216000+0100)/",
            "Name": "Kontoladdning",
            "PassengerType": "Vuxen",
            "PendingAutoload": false,
            "ProdSerialNumber": 1,
            "ProductAgeGroupId": 1,
            "ProductGroupId": "28",
            "Status": 2,
            "SupportsAutoLoad": true,
            "Type": 0
          },
          {
            "__type": "VtkCardCharge:#Customer.CustomerServices.EPiServerWs.ServiceLogicLayer.DataContracts",
            "EntityId": 0,
            "EntityType": null,
            "Amount": 0,
            "AutoLoadCanBeDisabledInstantly": false,
            "AutoLoadEnabled": false,
            "Buyable": true,
            "CardId": 618208,
            "ChargeName": "Göteborg++ Flex Ungdom",
            "DIBSTicketNr": "",
            "ExpiryTime": "/Date(1399413598000+0200)/",
            "IsAccount": false,
            "ItemInBasket": false,
            "LastActivityDateTime": "/Date(1399387003000+0200)/",
            "Name": "Göteborg++ Flex Ungdom",
            "PassengerType": "",
            "PendingAutoload": false,
            "ProdSerialNumber": 6,
            "ProductAgeGroupId": 2,
            "ProductGroupId": "33",
            "Status": 3,
            "SupportsAutoLoad": true,
            "Type": 1
          },
          {
            "__type": "VtkCardCharge:#Customer.CustomerServices.EPiServerWs.ServiceLogicLayer.DataContracts",
            "EntityId": 0,
            "EntityType": null,
            "Amount": 0,
            "AutoLoadCanBeDisabledInstantly": false,
            "AutoLoadEnabled": false,
            "Buyable": true,
            "CardId": 618208,
            "ChargeName": "Göteborg++ Fast Ungdom",
            "DIBSTicketNr": "",
            "ExpiryTime": "/Date(1402005598000+0200)/",
            "IsAccount": false,
            "ItemInBasket": false,
            "LastActivityDateTime": "/Date(1399728329000+0200)/",
            "Name": "Göteborg++ Fast Ungdom",
            "PassengerType": "",
            "PendingAutoload": false,
            "ProdSerialNumber": 7,
            "ProductAgeGroupId": 2,
            "ProductGroupId": "33",
            "Status": 2,
            "SupportsAutoLoad": true,
            "Type": 1
          }
        ],
        "CreditCardExpirationDate": 0,
        "CreditCardLeadingDigits": 0,
        "CreditCardTrailingDigits": 0,
        "ExpireDate": "/Date(1483743600000+0100)/",
        "FormattedCreditCardExpirationDate": "",
        "FormattedCreditCardNumber": "",
        "Id": 618208,
        "Name": "Jaco2",
        "Number": "240123204342978",
        "RefundType": null
      },
      {
        "__type": "VtkCard:#Customer.CustomerServices.EPiServerWs.ServiceLogicLayer.DataContracts",
        "EntityId": 0,
        "EntityType": null,
        "Charges": [
          {
            "__type": "VtkCardCharge:#Customer.CustomerServices.EPiServerWs.ServiceLogicLayer.DataContracts",
            "EntityId": 0,
            "EntityType": null,
            "Amount": 0,
            "AutoLoadCanBeDisabledInstantly": false,
            "AutoLoadEnabled": false,
            "Buyable": false,
            "CardId": 533514,
            "ChargeName": "Konto: ",
            "DIBSTicketNr": null,
            "ExpiryTime": "/Date(253402297199999+0100)/",
            "IsAccount": true,
            "ItemInBasket": false,
            "LastActivityDateTime": null,
            "Name": "Konto: ",
            "PassengerType": null,
            "PendingAutoload": false,
            "ProdSerialNumber": 0,
            "ProductAgeGroupId": 0,
            "ProductGroupId": "28",
            "Status": 0,
            "SupportsAutoLoad": false,
            "Type": 0
          }
        ],
        "CreditCardExpirationDate": 0,
        "CreditCardLeadingDigits": 0,
        "CreditCardTrailingDigits": 0,
        "ExpireDate": "/Date(253402297199999)/",
        "FormattedCreditCardExpirationDate": "",
        "FormattedCreditCardNumber": "",
        "Id": 533514,
        "Name": "Jaco",
        "Number": "240108594349055",
        "RefundType": null
      }
    ],
    "TotalNumberOfCards": 2
  }).Cards;

  function refresh() {
    // $ionicLoading.show({
    //   template: '<i class="icon ion-ios7-reloading"></i> Laddar...'
    // });
    setTimeout(function() {
      cards.lastUpdated = new Date();
      $rootScope.$broadcast('cards', cards);
      $ionicLoading.hide();
    }, 1000);
  }

  refresh();

  return {
    refresh: refresh
  }
})

.factory('AuthService', function($rootScope, $timeout) {

  var loggedIn = false;

  return {

    ensureLoggedIn: function() {
      var promise;
      var deferred = Q.defer();
      $timeout(function() {
        deferred.resolve();
      }, 1000)
      promise = deferred.promise;
      return promise;
    },

    hasCredentials: function() {
      return true;
    },

    login: function(username, password) {
      var deferred = Q.defer();
      $timeout(function() {
        deferred.resolve();
      }, 1000)
      return deferred.promise.then(function() {
        console.log('successfully logged in!')

        loggedIn = true;
        $rootScope.$broadcast('loggedIn', { 'loggedIn' : loggedIn });
      })
    },

    logout: function() {
      localStorage.removeItem('username');
      localStorage.removeItem('password');

      loggedIn = false;

      // TODO: clear request jar
    }

  }

})
