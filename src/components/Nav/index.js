import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/Island_Games_logo.png'

class Nav extends React.Component {
  render() {
    const year = new Date().getFullYear()
    return (
      <StyledNav>
          <Link to="/">
            <img src={logo} />
          </Link>
      </StyledNav>
    )
  }
}

const StyledNav = styled.nav`
  padding: 1em;
  text-align: center;
  img {
    max-width: 85px;
  }
`

export default Nav
