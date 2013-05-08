// Helper function for font-size scaling.
Template.addFontSizeScale = function() {
  var $body;
  var setBodyScale = function() {
    if (!$body) 
      $body = $('body');

    var scaleSource = $body.width(),
        scaleFactor = 0.10,
        maxScale = 100,
        minScale = 30,
        paddingFactor = 0.05,
        maxPadding = 70,
        minPadding = 33; //Tweak these values to taste

    var fontSize = scaleSource * scaleFactor;

    if (fontSize > maxScale) fontSize = maxScale;
    if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums

    var paddingTop = 1 / (scaleSource * paddingFactor / 100) * 15;

    if (paddingTop > maxPadding) paddingTop = maxPadding;
    if (paddingTop < minPadding) paddingTop = minPadding; //Enforce the minimum and maximums

    $('.front').css('font-size', fontSize + '%');
    $('.front h1').css('padding-top', paddingTop + '%');
  };
  // Add binders to window.
  setBodyScale();
  $(window).unbind('resize.font-size');
  $(window).bind('resize.font-size', function() {
    setBodyScale();
  });
};
