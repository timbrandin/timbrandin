Profile = new Meteor.Collection("profile");
Projects = new Meteor.Collection("projects");

// Subscribe to 'profile', 'projects' collection on startup.
Meteor.subscribe('profile');
Meteor.subscribe('projects');

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

Template.projects.events = {
  'click .create': function() {
    Session.set("createType", {
      title: 'Project',
      fields: [

      {
        type: 'textfield',
        title: 'Title'
      },

      {
        type: 'textarea',
        title: 'Description'
      },

      {
        type: 'list',
        title: 'Features'
      },

      {
        type: 'textfield',
        title: 'Team',
        description: 'Number of team members'
      },

      {
        type: 'autocomplete',
        title: 'Skills',
        description: 'Add skills used'
      },

      {
        type: 'daterange',
        title: 'Date range'
      }
      ]
    });
    Session.set("createError", null);
    Session.set("showCreateDialog", true);
  }
};

Template.main.showCreateDialog = function () {
  return Session.get("showCreateDialog");
};

Template.createDialog.type = function () {
  return Session.get("createType");
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
  Handlebars.registerHelper('projects', function () {
    return Projects.find({});
  });
  Handlebars.registerHelper('dateFormat', function (date) {
    return (date.month < 10 ? '0' + date.month : date.month) + '/' + date.year;
  });
  Handlebars.registerHelper('suffix', function (obj, suffix) {
    return obj ? obj + suffix : '';
  });
  Handlebars.registerHelper('join', function (arr) {
    return arr.join(', ');
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
