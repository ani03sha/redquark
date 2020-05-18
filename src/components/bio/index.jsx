import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import GitHub from '../../../content/assets/social/github.svg'
import Twitter from '../../../content/assets/social/twitter.svg'
import LinkedIn from '../../../content/assets/social/linkedin.svg'
import Facebook from '../../../content/assets/social/facebook.svg'
import Medium from '../../../content/assets/social/medium.svg'
import Stackoverflow from '../../../content/assets/social/stackoverflow.svg'

import './index.scss'

export const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={data => {
      const { author, social, introduction } = data.site.siteMetadata

      return (
        <div className="bio">
          <div className="author">
            <div className="author-description">
              <Image
                className="author-image"
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  borderRadius: `100%`,
                }}
              />
              <div className="author-name">
                <span className="author-name-prefix">Created and maintained by</span>
                <Link to={'/about'} className="author-name-content">
                  <span>@{author}</span>
                </Link>
                <div className="author-introduction">{introduction}</div>
                <p className="author-socials">
                  {social.github && (
                    <a href={`https://github.com/${social.github}`}>
                      <img
                        src={GitHub}
                        alt="GitHub icon"
                        style={{ height: '25px', width: '25px' }}
                      />
                    </a>
                  )}
                  {social.medium && (
                    <a href={`https://medium.com/${social.medium}`}>
                      <img
                        src={Medium}
                        alt="Medium icon"
                        style={{ height: '25px', width: '25px' }}
                      />
                    </a>
                  )}
                  {social.twitter && (
                    <a href={`https://twitter.com/${social.twitter}`}>
                      <img
                        src={Twitter}
                        alt="Twitter icon"
                        style={{ height: '25px', width: '25px' }}
                      />
                    </a>
                  )}
                  {social.facebook && (
                    <a href={`https://www.facebook.com/${social.facebook}`}>
                      <img
                        src={Facebook}
                        alt="Facebook icon"
                        style={{ height: '25px', width: '25px' }}
                      />
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
                      <img
                        src={LinkedIn}
                        alt="LinkedIn icon"
                        style={{ height: '25px', width: '25px' }}
                      />
                    </a>
                  )}
                  {social.stackoverflow && (
                    <a
                      href={`https://www.stackoverflow.com/${social.stackoverflow}`}
                    >
                      <img
                        src={Stackoverflow}
                        alt="Stackoverflow icon"
                        style={{ height: '25px', width: '25px' }}
                      />
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  />
)

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 72, height: 72) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
          github
          medium
          facebook
          linkedin
          stackoverflow
        }
      }
    }
  }
`

export default Bio
