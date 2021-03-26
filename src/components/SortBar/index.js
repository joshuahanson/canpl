import React from 'react'
import styled, {css} from 'styled-components'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Card, Container, FlexContainer } from '../../styledComponents'

class SortBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(value) {
    const { history } = this.props
    if(value) {
      const search = history.location.search
      const formString = () => {
        const queryParams = new URLSearchParams(search)
        const hasSort = queryParams.get('sort')
        const updatedString = search ? `${search}&sort=${value}` : `sort=${value}`

        if(hasSort) {
          if (queryParams.has('sort')) {
            queryParams.delete('sort')
            const newSortString = `${queryParams.toString()}&sort=${value}`
            return newSortString
          }
        }
        return updatedString
      }

      history.push({
        search: formString()
      })
    }
  }

  render() {
    const { history, sortedBy } = this.props

    return (
      <SortBarSection>
        <div className="flex align-center justify-center">
          <SortBarContainer>
            <Pill forge to="/teams/forge"><span>Forge</span></Pill>
            <Pill pacific to="/teams/pacific"><span>pacific</span></Pill>
            <Pill calvary to="/teams/calvary"><span>calvary</span></Pill>
            <Pill edmonton to="/teams/edmonton"><span>edmonton</span></Pill>
            <Pill valour to="/teams/valour"><span>valour</span></Pill>
            <Pill york to="/teams/york"><span>york</span></Pill>
            <Pill atletico to="/teams/atletico"><span>atletico</span></Pill>
            <Pill halifax to="/teams/halifax"><span>halifax</span></Pill>
          </SortBarContainer>
        </div>
        <div className="flex align-center justify-center">
          <SortBarContainer>
            <Pill to="/?role=Forward"><span>Forwards</span></Pill>
            <Pill to="/?role=Midfield"><span>Midfielders</span></Pill>
            <Pill to="/?role=Defender"><span>Defenders</span></Pill>
            <Pill to="/?role=Goal"><span>Goalies</span></Pill>
          </SortBarContainer>
          {/* <SortBarContainer>
            <label>Sort By: &nbsp;</label>
            <select 
              onChange={(e) => {
                this.handleClick(e.target.value)
              }}
              placeholder="Sort By:"
            >
              <option value="" disabled selected>Select your option</option>
              <option>Minutes</option>
              <option>Alphabetical</option>
              <option>Games</option>
            </select>
          </SortBarContainer> */}
        </div>
      </SortBarSection>
    )
  }
}

const SortBarSection = styled.section`
  background: #f2f2f2;
`

const SortBarContainer = styled(FlexContainer)`
    margin: 0;
`

const Pill = styled(Link)`
  color: #fff;
  background: #22356F;
  border-radius: 18px;
  padding: 0.2em 0.75em;
  margin: 0 0.215em;
  font-size: 0.68em;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${props => props.forge && css `
    background: var(--forge);
  `}

  ${props => props.pacific && css `
    background: var(--pacific);
  `}

  ${props => props.calvary && css `
    background: var(--calvary);
  `}

  ${props => props.edmonton && css `
    background: var(--edmonton);
  `}

  ${props => props.valour && css `
    background: var(--valour);
  `}

  ${props => props.york && css `
    background: var(--york);
  `}

  ${props => props.atletico && css `
    background: var(--atletico);
  `}

  ${props => props.halifax && css `
    background: var(--halifax);
  `}     
`

export default SortBar
