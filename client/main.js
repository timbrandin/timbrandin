Profile = new Meteor.Collection("profile");

// Subscribe to 'profile' collection on startup.
Meteor.subscribe('profile');

Template.main.rendered = function() {
  Template.addFontSizeScale();
  var now = new Date();
  var hue = Math.round((now.getHours()*60 + now.getMinutes()) / 10);
  $('.top').css({
    'max-height': $(window).height(),
    'background': 'hsl(' + hue + ', 70%, 70%)'
  });
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

Template.main.importedProfile = function() {
  return Profile.findOne({});
};

Template.main.name = function () {
  return 'Name Lastname';
};

Template.main.events({
  'click .import a' : function (e) {
    e.preventDefault();
    console.log('import me');
  }
});