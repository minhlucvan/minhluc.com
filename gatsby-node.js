const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogList = path.resolve(`./src/templates/blog-list.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title,
              tags,
              categories,
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  const tagsMap = {};

  for (const post of posts) {
    const { frontmatter } = post.node;
    const { tags } = frontmatter;

    if (tags) {
      for (const tag of tags) {
        if (!tagsMap[tag]) {
          tagsMap[tag] = {
            tag,
            posts: []
          }
        }
        tagsMap[tag].posts.push(post);
      }
    }
  }

  const tags = Object.values(tagsMap);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create markdown pages
  let blogPostsCount = 0

  posts.forEach((post, index) => {
    const id = post.node.id
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })

    // Count blog posts.
    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++
    }
  })

  // Create blog-list pages
  const postsPerPage = 9
  const numPages = Math.ceil(blogPostsCount / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // create blog-tags pages
  const blogTags = path.resolve(`./src/templates/blog-tags.js`)

  createPage({
    path: '/blog/tags',
    component: blogTags,
    context: {
      tags,
    }
  })

  // create blog-tag pages
  const blogTag = path.resolve(`./src/templates/blog-tag.js`)

  for (const tag of tags) {
    const blogPostsTagCount = tag.posts.length;
    const numPages = Math.ceil(blogPostsTagCount / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog/tags/${tag.tag}` : `/blog/tags/${tag.tag}/${i + 1}`,
        component: blogTag,
        context: {
          tag: tag.tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

  }

}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
