if (Meteor.isClient) {  
  Template.hello.rendered = function() {
    addFontSizeScale();
    
    Meteor.http.call("GET", "https://api.instagram.com/v1/users/1574083/",
      {data: {'access_token': Accounts._storedLoginToken()}},
      function (error, result) {
        if (result.statusCode === 200) {
          console.log(result);
        }
      });
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