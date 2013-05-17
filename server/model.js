
Profile = new Meteor.Collection("profile");

Projects = new Meteor.Collection("projects");

Meteor.methods({
  createProfile: function(options) {
    var user = Meteor.user();
    if (user && Profile.find({}).count() == 0) {
      if (user.services.linkedin) {
        var service = user.services.linkedin;
        var profile = getProfile(service.id, service.accessToken);
        Profile.insert(profile);
      }
    }
    else {
      if (user.services.linkedin) {
        var service = user.services.linkedin;
        var profile = getProfile(service.id, service.accessToken);
        Profile.update({}, {$set: profile});
      }
    }
  }
});

var getProfile = function (id, accessToken) {
  var result = Meteor.http.get(
    "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,summary,associations,positions,specialties,honors,interests,skills,educations,courses,recommendations-received,phone-numbers,languages:(language,proficiency),certifications)", {
      params: {
        oauth2_access_token: accessToken,
        format: 'json'
      }
    });
  if (result.error) {
    throw new Error("Failed to fetch profile from LinkedIn. " +
      "HTTP Error " + result.statusCode + ": " + result.content);
  } else {
    return result.data;
  }
};
