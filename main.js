if (Meteor.isClient) {  
  Template.hello.rendered = function() {
    addFontSizeScale();
    $(window).load(function() {
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

  Template.hello.events({
    'click input' : function () {
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    });
}