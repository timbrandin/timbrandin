
Meteor.publish("profile", function () {
  return Profile.find({});
});

Meteor.publish("projects", function () {
  return Projects.find({});
});
