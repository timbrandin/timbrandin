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
//  $(window).load(function() {
//    $('.gallery').flexslider({
//      animation: 'slide',
//      slideshow: true,
//      slideshowSpeed: 4000 + 3000 * Math.random(),
//      animationSpeed: 600,
//      controlNav: false,
//      directionNav: false
//    });
//  });
};

// Create a profile from the first logged in user.
Deps.autorun(function(){
  if(Meteor.userId() && !Meteor.loggingIn()){
    Meteor.call('createProfile');
  }
});

// If we're using Handlebars, register the {{importedProfile}} and
// some more global helpers.
if (typeof Handlebars !== 'undefined') {
  Handlebars.registerHelper('importedProfile', function () {
    return Profile.findOne({});
  });
  Handlebars.registerHelper('dateFormat', function (date) {
    return (date.month < 10 ? '0' + date.month : date.month) + '/' + date.year;
  });
  Handlebars.registerHelper('suffix', function (obj, suffix) {
    return obj ? obj + suffix : '';
  });
  Handlebars.registerHelper('dateLength', function (start, end) {
    var d1 = new Date(start.year, start.month - 1),
        d2 = !end.month ? Date.now() : new Date(end.year, end.month - 1),
        diff = (d2 - d1) / 1000,
        day_ago = Math.floor(diff / 86400);

    if ( isNaN(day_ago) || day_ago < 0) {
      return null;
    }

    return day_ago == 0 ? (
        diff < 60 ? "just now" : (
        diff < 120 ? "1 minute ago" : (
        diff < 3600 ? Math.floor( diff / 60 ) + " minutes ago" : (
        diff < 7200 ? "1 hour ago" : (
        diff < 86400 ? Math.floor( diff / 3600 ) + " hours ago"
      : ''))))) : (
      day_ago == 1 ? "Yesterday" : (
      day_ago < 7 ? day_ago + " days" : (
      day_ago < 31 ? Math.ceil( day_ago / 7 ) + " weeks" : (
      day_ago < 365 ? Math.ceil( day_ago / 30.5 ) + " months" : (
      Math.floor( day_ago / 365.25 ) + " years "
        + Math.ceil( (day_ago - Math.floor( day_ago / 365.25 ) * 365.25) / 30.5 )
        + " months"
    )))));

  });
}
