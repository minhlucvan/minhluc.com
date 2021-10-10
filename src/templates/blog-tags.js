/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"


const BlogTags = ({ pageContext }) => {
  const { tags } = pageContext;
  console.log(pageContext);
  return (
    <Layout className="blog-page">
      <Seo
        title={"Blog — Tags"}
        description={
          "Tags"
        }
      />
      <h1>Tags</h1>
      <ul className="tags">
        {(tags || []).map(tag => (
          <li className="tag">
            <a href={`/blog/tags/${tag.tag}`}>
              <span>{tag.tag}</span>
              &nbsp;
              <span>({tag.posts.length})</span>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default BlogTags
