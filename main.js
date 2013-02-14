if (Meteor.isClient) {  
  Template.hello.rendered = function() {
    addFontSizeScale();
    
    console.log(Meteor.absoluteUrl("_oauth/instagram?close=close", {replaceLocalhost: true}));
    console.log(Meteor);
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}