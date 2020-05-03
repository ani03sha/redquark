import React, { Component } from 'react'
import { Top } from '../components/top'
import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { rhythm } from '../utils/typography'
import { Link } from 'gatsby'

class NotFoundPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Top title='Red Quark' location='/' rootPath='//' />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(32),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <ThemeSwitch />
          <Header title='Red Quark' location='' rootPath='/' />
          <div style={{ textAlign: "center" }}>
            <h1>Page Not Found &#129301;. Go to <Link to="/">home</Link></h1>
          </div>
        </div>
      </React.Fragment>)
  }
}

export default NotFoundPage