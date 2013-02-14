if (Meteor.isClient) {  
  Template.hello.rendered = function() {
    addFontSizeScale();
    
    console.log(Accounts);
    
//    var result = Meteor.http.post(
//      "https://api.instagram.com/oauth/access_token", {params: {
//          'access_token': 'authorization_code'
//      }});
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