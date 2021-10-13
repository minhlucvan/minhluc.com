/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"


const BlogCategories = ({ pageContext }) => {
  const { categories } = pageContext;
  return (
    <Layout className="blog-page">
      <Seo
        title={"Blog — Categories"}
        description={
          "categories"
        }
      />
      <h1>Categories</h1>
      <ul className="tags">
        {(categories || []).map(cat => (
          <li className="cat">
            <a href={`/blog/categories/${cat.category}`}>
              <span>{cat.category}</span>
              &nbsp;
              <span>({cat.posts.length})</span>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default BlogCategories
