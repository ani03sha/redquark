import React from 'react'
import {
  graphql
} from 'gatsby'

import {
  rhythm
} from '../utils/typography'
import * as Lang from '../constants'
import { Top } from '../components/top'

export default ({
  data
}) => {
  const resumes = data.allMarkdownRemark.edges

  const resume = resumes
    .filter(({
      node
    }) => node.frontmatter.lang === Lang.ENGLISH)
    .map(({
      node
    }) => node)[0]

  return (
    <div><Top title="Red Quark" location="/about" rootPath="/" />
      <div style={
        {
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(32),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }
      }>
        <div dangerouslySetInnerHTML={
          {
            __html: resume.html
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