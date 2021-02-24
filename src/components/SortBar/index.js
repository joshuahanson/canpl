import React from 'react'
import styled from 'styled-components'
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
        <SortBarContainer>
          <Pill to="/?role=Forward"><span>Forward</span></Pill>
          <Pill to="/?role=Midfield"><span>Midfielders</span></Pill>
          <Pill to="/?role=Defender"><span>Defenders</span></Pill>
          <Pill to="/?role=Goal"><span>Goalies</span></Pill>
        </SortBarContainer>
        <SortBarContainer>
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
        </SortBarContainer>
      </SortBarSection>
    )
  }
}

const SortBarSection = styled.section`
  background: #f2f2f2;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
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
`

export default SortBar
