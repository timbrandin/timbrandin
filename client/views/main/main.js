Template.main.rendered = function() {
  if (this.find) {
    var self = this;
    var $jumbotron = $(self.find('.jumbotron'));
    var resizing;
    var $body = $('body');
    var $lead = $('.lead');
    var $window = $(window);
    var $firstSection = $('.container section:first-child');

    var d = new Date();
    // Add class for night theme.
    // if (d.getHours() > 19 || d.getHours() < 7) {
    //   $body.addClass('night');
    // }
    // else {
    //   $body.addClass('day');
    // }

    $body.addClass('day');
    // $body.addClass('night');

    $('.switch .option').click(function() {
      if ($(this).is('.day')) {
        $body.removeClass('night');
        $body.addClass('day');
        $window.trigger('resize');
      } else {
        $body.removeClass('day');
        $body.addClass('night');
        $window.trigger('resize');
      }
    });

    $window.load(function() {
      // All is loaded.
      $body.addClass('ready');

      var $img = $(new Image());
      var src = $jumbotron.css('background-image');
      src = src.replace('url(', '').replace(')', '');

      $img.load(function() {
        var image = this;

        $window.bind('resize', function() {
          // Set nice height.
          var h = $window.height() - $firstSection.height() - 40 - ($body.is('.day') ? 65 : 0);
          $jumbotron.css({height: h});

          if ($body.is('.day')) {
            // Calculate top to center background depending on the cover effect.
            var width = Math.max($jumbotron.width(), image.width);
            var scaleX = width / $jumbotron.width();
            var height = Math.max($jumbotron.height(), image.height / scaleX);
            var top = (height - $jumbotron.height()) / 2;

            $jumbotron.css({
              'background-position': 'center ' + ($window.scrollTop()/2 - top/1) + 'px'
            });
          }
          else {
            $jumbotron.css({
              'background-position': '50% 35%'
            });
          }

        }).trigger('resize');

        $window.bind('scroll', function() {
          // Slow down scroll of jumbotron-background if day.
          if ($body.is('.day')) {

            // Calculate top to center background depending on the cover effect.
            var width = Math.max($jumbotron.width(), image.width);
            var scaleX = width / $jumbotron.width();
            var height = Math.max($jumbotron.height(), image.height / scaleX);
            var top = (height - $jumbotron.height()) / 2;

            $jumbotron.css({
              'background-position': 'center ' + ($window.scrollTop()/2 - top/1) + 'px',
            });
          }

          // Fade out on scroll.
          $jumbotron.css({
            'transition': 'none'
          });

        });
      }).trigger('scroll');

      $img.attr('src', src);
    });
  }
};
