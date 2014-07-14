Template.sync.rendered = function() {
  $body = $('body');
  $body.addClass('sync ready');

  $(window).resize(function() {
    var $profile = $('.profile');
    if ($profile) {
      $('.profile div[style]').remove();
      var $knob = $('<input type="text" class=".dial" />');
      $profile.prepend($knob);
      var size = parseInt($profile.width());
      $knob.knob({
        min: 0,
        max: 100,
        width: size,
        height: size,
        step: 0.1,
        bgColor: '#151515',
        fgColor: '#fff'
      });

      $({i: 0}).animate({i: 100}, {
        duration: 3000,
        step: function(i) {
          $knob.val(i).trigger('change');
        }
      });
    }
  }).trigger('resize');
}

Template.sync.events({
  'submit form': function(event, t) {
    // event.preventDefault();
    //
    // var username =
    //   t.find('input[name="username"]') ?
    //     t.find('input[name="username"]').value.toLowerCase() : undefined;
    //
    // var password = t.find('input[type="password"]').value;
    //
    // Meteor.syncWithPassword(username, password, function(error) {
    //   Session.set('error', error);
    //   if (!error) {
    //     Router.go('dashboard');
    //   }
    // });
  }
});
