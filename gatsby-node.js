const path = require('path');
const ImageSharp = require('gatsby-transformer-sharp/extend-node-type');
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
} = require(`graphql`);

// exports.createPages = ({ boundActionCreators, graphql }) => {
// }

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    let file = path.join(path.dirname(node.fileAbsolutePath), node.frontmatter.image, ' absPath of file');
    if (path.isAbsolute(node.frontmatter.image)) {
      file = path.join(process.cwd(), '/src/images', node.frontmatter.image.trim());
    }
    node.frontmatter.image = `${file} absPath of file`;
  }
};
