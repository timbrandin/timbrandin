import React from 'react';
import moment from 'moment';

const Timeline = ({ experience = [] }) => (
  <section>
    <h2>How did I get here?</h2>

    <div className="container timeline-wrapper">
      <div className="start">
        <span className="head">NOW</span>
        <span className="subtitle">{moment().format('MMM YYYY')}</span>
      </div>
      <ul className="timeline">
        {experience.map(({ node }, i) => {
          const { responsiveSizes = {} } = node.frontmatter.image.childImageSharp || {};
          const start = node.frontmatter.start && new Date(node.frontmatter.start);
          const stop = node.frontmatter.stop && new Date(node.frontmatter.stop);
          const weeks = moment(stop || new Date()).diff(moment(start), 'weeks');
          const months = moment(stop || new Date()).diff(moment(start), 'months');
          const years = Math.round(months / 12);
          let duration = `${weeks} Weeks`;
          if (months > 1) {
            duration = `${months} Months`;
          }
          if (years > 1) {
            duration = `${years} Years`;
          }
          return (<li key={node.id}>
            <article>
              <figure>
                <div
                  style={{
                    paddingBottom: `${1 / responsiveSizes.aspectRatio * 100}%`,
                    position: `relative`,
                    width: `100%`,
                    bottom: 0,
                    left: 0,
                    backgroundImage: `url(${responsiveSizes.base64})`,
                    backgroundSize: `cover`,
                  }}
                >
                  <img
                    src={responsiveSizes.src}
                    alt={node.frontmatter.title}
                    srcSet={responsiveSizes.srcSet}
                    style={{
                      width: `100%`,
                      margin: 0,
                      verticalAlign: `middle`,
                      position: `absolute`,
                    }}
                    sizes={responsiveSizes.sizes}
                  />
                </div>
                <span className="time">{moment(start).format('MM/YYYY')}{' - '}{!stop ? 'Present' : moment(stop).format('MM/YYYY')}</span>
              </figure>
              <div className="content">
                <h3>{node.frontmatter.title}</h3>
                <span className="description" dangerouslySetInnerHTML={{ __html: node.html }} />
                <div className="meta">
                  <span className="length">{duration}</span>
                  <b>{node.frontmatter.company.map(({ name, link }, j) => link ? (
                    <span key={name}>
                      <a href={link} target="_blank">
                        <span style={{ whiteSpace: 'nowrap' }}>{name.toUpperCase()}</span>
                      </a>{j < node.frontmatter.company.length - 1 ? ', ' : ''}
                    </span>
                  ) : (
                    <span key={name}>
                      <span style={{ whiteSpace: 'nowrap' }}>{name.toUpperCase()}</span>
                      {j < node.frontmatter.company.length - 1 ? ', ' : ''}
                    </span>
                  ))}</b>
                </div>
              </div>
            </article>
            {!stop ? (
              <span className="entry present">
                Present
              </span>
            ) : (
              <span className="entry">
                <b>{moment(stop).format('D')}</b><br />
                {moment(stop).format('MMMM')}
              </span>
            )}
            <span className="line"></span>
            {i % 2 === 1 && stop && (
              <span className="year">{moment(stop).format('YYYY')}</span>
            )}
          </li>);
        })}
      </ul>
    </div>
  </section>
);

export default Timeline;
