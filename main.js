if (Meteor.isClient) {  
  Template.hello.rendered = function() {
    addFontSizeScale();
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