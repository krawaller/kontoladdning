(function() {
  var shouldPreventClick = false;

  function isLink(node) {
    return node && node.nodeName == 'A';
  }

  function getTarget(node) {
    return node.getAttribute('target');
  }

  ionic.on('tap', function(event) {
    var node = event.target;
    if (isLink(node)) {
      var target = getTarget(node);
      if (target) {
        shouldPreventClick = true;
        window.open(node.href, target, 'closebuttoncaption=Klar', 'toolbar=no', 'location=no');
      }
     }
  }, document.body);

  ionic.on('click', function(event) {
    if (shouldPreventClick && isLink(event.target) && getTarget(event.target)) {
      event.preventDefault();
      shouldPreventClick = false;
    }
    console.log('click')
  }, document.body);
})();
