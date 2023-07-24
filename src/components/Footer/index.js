import React from "react";
import styled from "styled-components";
import StatsPerform from "./images/StatsPerform.png";
import CentreCircle from "./images/CentreCircle.png";

class Footer extends React.Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <StyledFooter>
        <p className="footer-data-title">Data Provided By</p>
        <div className="footer-logos">
          <img src={StatsPerform} />
          <p>
            <span>
              <a
                style={{ color: "#fff", textDecoration: "none" }}
                href="https://twitter.com/canpldata"
              >
                @CanPLdata
              </a>
            </span>
            <span>#CCdata</span>
            <span>#CanPL</span>
          </p>
          <img src={CentreCircle} />
        </div>
        <div className="footer-credit">
          <span>
            <small>&copy; {` ${year} `} canplscouting.ca</small>
          </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://montebello.digital"
            className="white"
            style={{ textDecoration: "none" }}
          >
            Site Built By <b>montebello.digital</b>
            <span className="emoji">⚡️</span>
          </a>
        </div>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  ${"" /* padding: 1.5em; */}
  background: var(--cpl-blue);
  color: white;
  border-top: 5px solid var(--cpl-green);
  box-shadow: 0px -1px 5px #efefef;
  .footer-data-title {
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.85em;
    margin: 0 auto;
    padding-top: 1.5em;
  }
  .footer-logos {
    padding: 1em;
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
      max-width: 70px;
    }
  }
  .footer-credit {
    background: var(--black);
    color: #fff;
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default Footer;
