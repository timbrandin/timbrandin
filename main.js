if (Meteor.isClient) {  
  Template.hello.rendered = function() {
    addFontSizeScale();
    
    var result = Meteor.http.get(
      "https://api.instagram.com/v1/users/1574083/", {params: {
          'access_token': Accounts._storedLoginToken()
      }});
    
     console.log(result);
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