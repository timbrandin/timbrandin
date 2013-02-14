// Helper function for font-size scaling.
var addFontSizeScale = function() {
  var $body;
  var setBodyScale = function() {
    if (!$body) 
      $body = $('body');

    var scaleSource = $body.width(),
        scaleFactor = 0.10,                     
        maxScale = 100,
        minScale = 30; //Tweak these values to taste

    var fontSize = scaleSource * scaleFactor;

    if (fontSize > maxScale) fontSize = maxScale;
    if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums

    $('.front').css('font-size', fontSize + '%');
  };
  // Add binders to window.
  setBodyScale();
  $(window).unbind('resize.font-size');
  $(window).bind('resize.font-size', function() {
    setBodyScale();
  });
};
