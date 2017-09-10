import React from 'react';

const Contact = () => (
  <div className="contact">
      <h2>I'm based in Gothenburg, Sweden &mdash; Get in touch</h2>

      <div className="text-center mail">
        <a href="mailto:tim.brandin@gmail.com"
             target="_blank">tim.brandin@gmail.com</a>
      </div>
      <div className="lead social">
        <a href="https://instagram.com/timbrandin" title="Instagram"
           target="_blank"><i className="icon-instagram-circled"></i></a>
        <a href="https://twitter.com/timbrandin" title="Twitter"
           target="_blank"><i className="icon-twitter-circled"></i></a>
        <a href="http://drupal.org/user/738462" title="Drupal"
           target="_blank"><i className="icon-drupal-1"></i></a>
        <a href="http://se.linkedin.com/in/timbrandin/" title="LinkedIn"
           target="_blank"><i className="icon-linkedin-circled"></i></a>
        <a href="https://github.com/timbrandin" title="GitHub"
           target="_blank"><i className="icon-github-circled"></i></a>
      </div>
      <div className="text-center fork">
        <a href="https://github.com/timbrandin/timbrandin" title="See the source code"
           target="_blank">Fork me on Github</a>
      </div>
    </div>
);

export default Contact;
