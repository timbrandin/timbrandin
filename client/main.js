
Template.main.rendered = function() {
  Template.addFontSizeScale();
  $(window).load(function() {
    var now = new Date();
    var hue = Math.round((now.getHours()*60 + now.getMinutes()) / 10);
    $('.top').css({
      'max-height': $(window).height(),
      'background': 'hsl(' + hue + ', 70%, 70%)'
    });
    $('.gallery').flexslider({
      animation: 'slide',
      slideshow: true,
      slideshowSpeed: 4000 + 3000 * Math.random(),
      animationSpeed: 600,
      controlNav: false,
      directionNav: false
    });
  });
};

Template.main.events({
  'click input' : function () {
  }
});