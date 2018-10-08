import * as React from 'react'
import { Link } from 'react-router-dom'

import './Header.css';

interface IHeaderProps {
  loggedInUser: any;
}

export default class Header extends React.Component<IHeaderProps> {
  public render() {
    const loggedInUser = this.props.loggedInUser
    const path = window.location.pathname
    const links = [
      <li key="0" className={!path || path === '/' ? 'active' : ''}>
        <Link to="/">Home</Link>
      </li>
    ]
    if (loggedInUser) {
      links.push(
        <li key="1" className={path === '/posts/new/edit' ? 'active' : ''}>
          <Link to="/posts/new/edit">New post</Link>
        </li>
      )
      links.push(
        <li key="2">
          <Link to={`/users/${loggedInUser.id}`}>
            Hi <strong>{loggedInUser.displayName || loggedInUser.name || loggedInUser.username}</strong>!
          </Link>
        </li>
      )
    } else {
      links.push(<li key="2"><a href="/auth/github">Login with Github</a></li>)
    }
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a href="/" className="navbar-brand"><img src="https://files.readme.io/fTQdMshQaObqmWzmV9h5_js-data.png" title="js-data blog example" width="50" height="50" /></a>
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar-main">
            <ul className="nav navbar-nav navbar-right">{links}</ul>
          </div>
        </div>
      </div>
    )
  }
}
