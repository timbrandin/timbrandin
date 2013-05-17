
Meteor.publish("profile", function () {
  return Profile.find({});
});
