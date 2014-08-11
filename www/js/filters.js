function parseVtDate(dateString) {
  return moment(parseInt(dateString.replace('/Date(', '').replace(')/', '')));
}

angular.module('kontoladdning.filters', [])
  .filter('vtDate', function() {
    return function(input) {
      return parseVtDate(input).format('YYYY-MM-DD');
    };
  })

  .filter('vtAmount', function() {
    return function(input) {
      return (input / 100) + ' kr';
    };
  })

  .filter('momentAgo', function() {
    return function(input) {
      return moment(input).fromNow();
    };
  })

  .filter('dateHasPassed', function() {
    return function(input) {
      return parseVtDate(input).endOf('day') > moment()
    };
  })

  .filter('formatCardNumber', function() {
    return function(input) {
      return input.replace(/^(\d{4})(\d{4})(\d{6})(\d{1})$/, '$1 $2 $3 $4');
    };
  })




