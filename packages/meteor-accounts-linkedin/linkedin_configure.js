Template.configureLoginServiceDialogForLinkedin.siteUrl = function () {
  // Linkedin doesn't recognize localhost as a domain name
  return Meteor.absoluteUrl({replaceLocalhost: true});
};

Template.configureLoginServiceDialogForLinkedin.fields = function () {
  return [
    {property: 'consumerKey', label: 'API/Consumer Key'},
    {property: 'secret', label: 'Secret Key'}
  ];
};
