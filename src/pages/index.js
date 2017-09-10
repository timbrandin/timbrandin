import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import moment from 'moment'
import Helmet from 'react-helmet';
import Introduction from '../components/Introduction';
import Timeline from '../components/Timeline';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

class IndexPage extends React.PureComponent {
  render() {
    const { experience: { edges = [] } = {} } = this.props.data || {};
    return (
      <div>
        <Helmet>
          <title>{`Tim Brandin`}</title>
          <meta name="og:title" content="Tim Brandin" />
          <meta name="og:url" content="https://timbrandin.com" />
          <meta name="description" content="The offical site of Tim Brandin, a full-stack developer and interaction designer from Sweden at Findwise and Studio Interact." />
          <meta name="og:description" content="The offical site of Tim Brandin, a full-stack developer and interaction designer from Sweden at Findwise and Studio Interact." />
          <meta name="og:image" content="/timbrandin.jpg" />
          <meta name="og:image_type" content="image/jpeg" />
        </Helmet>
        <div className="container">
          <Introduction />
        </div>

        <Timeline experience={edges} />

        <Skills />

        <section>
          <Contact />
        </section>
      </div>
    );
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPage {
    experience: allMarkdownRemark(
      sort: {
        fields:[frontmatter___stop]
        order:DESC
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            start
            stop
            company {
              name
              link
            }
            image {
              childImageSharp {
                responsiveSizes(
                  maxWidth: 400
                  toFormat: PNG
                ) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
          html
        }
      }
    }
  }
`
