import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './bootstrap3.css'
import './index.css'
import './print.scss'
import './timeline.scss'
import './fontello.css'

class Header extends React.PureComponent {
  render() {
    return (
      <header className="jumbotron" data-transform="translateZ(-2px) scale(3.0)">
        <div className="switch">
          <span className="selector"></span>
          <a className="option night" href="#night">NIGHT</a>
          <a className="option day" href="#day">DAY</a>
        </div>
        <div className="print avatar">
          <img src="/timbrandin.jpg" />
        </div>
      </header>
    );
  }
}

const TemplateWrapper = ({ children }) =>
  <div className="profile ready day">
    <Helmet>
      <title>Tim Brandin</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="description" content="The offical site of Tim Brandin, a full-stack developer and interaction designer from Sweden at Findwise and Studio Interact." />
      <meta name="keywords" content="timbrandin, interaction design, frontend, fullstack, designer" />
      <meta name="author" content="Tim Brandin" />
      <meta name="og:site_name" content="Tim Brandin" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortlink" href="http://timbrandin.com" />
      <link rel="alternate" href="http://timbrandin.se/" hreflang="sv" />
    </Helmet>
    <span id="day"></span>
    <span id="night"></span>
    <span id="print"></span>
    <Header />
    <div className="main">
      {children()}
    </div>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css" />
  </div>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper;
