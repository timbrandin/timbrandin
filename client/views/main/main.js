Template.main.rendered = function() {
  if (this.find) {
    var self = this;
    var $jumbotron = $(self.find('.jumbotron'));
    var resizing;
    var $body = $('body');
    var $lead = $('.lead');
    var $window = $(window);
    var $firstSection = $('.container section:first-child');
    var $oddLiElements = $('.timeline > li:nth-child(odd)');

    var d = new Date();
    // Add class for night theme.
    if (d.getHours() > 19 || d.getHours() < 7) {
      $body.addClass('night');
    }
    else {
      $body.addClass('day');
    }

    $('.switch .option').click(function() {
      if ($(this).is('.day')) {
        $jumbotron.addClass('cover');
        setTimeout(function() {
          $body.removeClass('night print');
          $body.addClass('day');
          $('.pagebreak').remove();
          $window.trigger('load');
          $window.trigger('resize');
          // $body.removeClass('ready');
          setTimeout(function() {
            // $body.addClass('ready');
            $jumbotron.removeClass('cover');
          }, 300);
        }, 300);
      }
      else if ($(this).is('.night')) {
        $jumbotron.addClass('cover');
        setTimeout(function() {
          $body.removeClass('day print');
          $body.addClass('night');
          $('.pagebreak').remove();
          $window.trigger('load');
          $window.trigger('resize');
          // $body.removeClass('ready');
          setTimeout(function() {
            // $body.addClass('ready');
            $jumbotron.removeClass('cover');
          }, 300);
        }, 300);
      }
      else if ($(this).is('.print')) {
        $body.removeClass('day night ready');
        $body.addClass('print');
        $window.trigger('load');
        $window.trigger('resize');
      }
    });

    $window.load(function() {
      // All is loaded.
      $body.addClass('ready');

      $window.unbind('resize');
      $window.bind('resize', function() {
        // Make sure entries do not overlap.
        var i = 1;
        if (!$body.is('.print')) {
          $oddLiElements.each(function(i, el) {
            var $self = $(this);
            var $left = $self.find('article');
            var $right = $self.next('li').find('article');
            var extraMargin = Math.max(0, 120 - ($right.offset().top - $left.offset().top));
            $right.parent('li').css({
              'margin-top': extraMargin + 60,
            });
          });
        }

        var pageSize = 960;
        var pageMargin = 42;
        var page = 0;
        var prevPage = 0;
        $('.pagebreak').remove();
        $('.print .timeline li').each(function() {
          var $self = $(this);
          var $article = $self.find('article');
          if ($article.length > 0) {
            var $prev = $self.prev('li');
            $prev.removeAttr('style');
            var offset = $article.offset().top;
            var height = $article.height();
            var page = Math.floor((offset + height - pageSize) / (pageSize + pageMargin)) + 1;

            if (page != prevPage) {

              $article = $prev.find('article');
              offset = $article.offset().top;
              height = $article.height();

              var pageBreak = pageSize + (page - 1) * (pageSize + pageMargin / 2 + 1) + pageMargin / 2;
              var $d = $('<div></div>');
              // Print bageBreaks.
              // $d.css({
              //   'position': 'absolute',
              //   'top': pageBreak,
              //   'width': '100%',
              //   'border-top': 'solid 1px red'
              // });
              // $('body').prepend($d);

              var extraMargin = pageBreak - (offset + height);
              // if (extraMargin > 0) {
                var $pre = $('<li class="pagebreak"></li>').attr('style',
                  'margin-top: ' + (extraMargin) + 'px !important;');
                $self.before($pre);
                $prev.attr('style', 'page-break-before: always;');
              // }
            }
            prevPage = page;
          }
        });

      }).trigger('resize');

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
          else if ($body.is('.night')) {
            $jumbotron.css({
              'background-position': '50% 35%'
            });
          }

        }).trigger('resize');

        $window.unbind('scroll');
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
