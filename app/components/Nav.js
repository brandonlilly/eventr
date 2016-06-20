import React from 'react'
import { Link } from 'react-router'

const NavLink = ({ name, to }) =>
  <li>
    <Link to={to} activeClassName="active" onlyActiveOnIndex={true}>
      {name}
    </Link>
  </li>

const Nav = () =>
  <nav className="Nav content">
    <Link to='/' className="logo">
      e<span>ventr</span>
    </Link>
    <ul>
      <NavLink to="/" name="feed" />
      <NavLink to="/template" name="template" />
    </ul>
  </nav>

export default Nav
