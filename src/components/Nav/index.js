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
            <span style={{textAlign: 'center'}}>CANPLSCOUTING</span>
          </Link>
      </StyledNav>
    )
  }
}

const StyledNav = styled.nav`
  padding: 1em;
  text-align: center;

  a { 
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    text-decoration: none;

    img {
      max-width: 55px;
    }
    
    span {
      margin-left: 0.5em;
      font-size: 2em;
      text-decoration: none;
      font-weight: 700;
    }
  }
`

export default Nav
