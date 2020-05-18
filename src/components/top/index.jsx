import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'

import './index.scss'
import { right } from 'inquirer/lib/utils/readline'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {(
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}
      <GitHubIcon />
    </div>
  )
}
