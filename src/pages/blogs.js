import React from 'react'
import { graphql } from 'gatsby'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'
import { Top } from '../components/top'
import { ThemeSwitch } from '../components/theme-switch'

export default ({ data }) => {
    const blogPosts = data.allMarkdownRemark.edges

    const blogPost = blogPosts
        .filter(({
            node
        }) => node.frontmatter.lang === Lang.ENGLISH)
        .map(({
            node
        }) => node)[1]

    return (
        <div>
            <Top title="Red Quark" location="/blogs" rootPath="/" />
            <ThemeSwitch />
            <div style={
                {
                    marginLeft: `auto`,
                    marginRight: `auto`,
                    maxWidth: rhythm(24),
                    padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
                        3 / 4
                    )}`,
                }
            }>
                <div dangerouslySetInnerHTML={
                    {
                        __html: blogPost.html
                    }
                }
                /></div>
        </div>
    )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`