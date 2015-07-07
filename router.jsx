FlowRouter.route("/", {
  subscriptions: function() {
    // this.register('github', Meteor.subscribe('github'));
    // this.register('slack', Meteor.subscribe('slack'));
  },
  action: function() {
    ReactLayout.render(Content);
  }
});
