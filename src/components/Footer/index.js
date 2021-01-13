import React from 'react'
import styled from 'styled-components'
import StatsPerform from './images/StatsPerform.png'
import CentreCircle from './images/CentreCircle.png'

class Footer extends React.Component {
  render() {
    const year = new Date().getFullYear()
    return (
      <StyledFooter>
        <div className="footer-logos">
          <img src={StatsPerform} />
          <p>
            <span>@CanPLdata</span>
            <span>#CCdata</span>
            <span>#CanPL</span>
          </p>
          <img src={CentreCircle} />
        </div>
        <div style={{ textAlign: 'center' }}>
          &copy; {` ${year} `}
          <a target="_blank" rel="noopener noreferrer" href="https://joshhanson.ca">
            joshhanson.ca
          </a>
        </div>
      </StyledFooter>
    )
  }
}

const StyledFooter = styled.footer`
  padding: 1em;
  .footer-logos {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
      span {
        margin: 0 0.5em;
      }
    }

    img {
      max-width: 90px;
      margin: 1em;
    }
  }
`

export default Footer
