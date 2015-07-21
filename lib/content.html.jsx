<template name="Content">
  <div class="{{classes}}">
    <span id="day"></span>
    <span id="night"></span>
    <span id="print"></span>
    <header class="jumbotron" data-transform="translateZ(-2px) scale(3.0)">
      <div class="switch">
        <span class="selector"></span>
        <a class="option night" href="#night">NIGHT</a>
        <a class="option day" href="#day">DAY</a>
      </div>
      <div class="print avatar">
        <img src="/timbrandin.jpg" />
      </div>
    </header>
    <div class="main">
      <div class="container">
        <Introduction />
      </div>

      <Timeline />

      <Skills />

      <section>
        <Contact />
      </section>
    </div>
  </div>
</template>

Template.Content.onCreated(function() {
  var component = this;
  component.classes = new ReactiveVar({profile: true, ready: true, night: true, day: false});
});

Template.Content.helpers({
  classes() {
    return this.classes.get();
  }
});

Template.Content.extend({
  componentDidMount() {
    var state = this.classes.get();
    var component = this;
    var $header = $('header'), $main = $('.main'), $profile = $('.profile');
    $(window).bind('resize', function() {
      var w = $header.width();
      var h = $main.offset().top;

      if (state.day) {
        var y = Math.max(0, w - h*2) * 0.25;
        $header.css({
          'background-position': `center top ${-y}px`
        });
      }
      else if (state.night) {
        $header.css({
          'background-position': 'center center'
        });
      }
    }).trigger('resize');
  }
});
