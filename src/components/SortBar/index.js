import React from "react";
import styled, { css } from "styled-components";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Card, Container, FlexContainer } from "../../styledComponents";

class SortBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(value) {
    const { history } = this.props;
    if (value) {
      const search = history.location.search;
      const formString = () => {
        const queryParams = new URLSearchParams(search);
        const hasSort = queryParams.get("sort");
        const updatedString = search
          ? `${search}&sort=${value}`
          : `sort=${value}`;

        if (hasSort) {
          if (queryParams.has("sort")) {
            queryParams.delete("sort");
            const newSortString = `${queryParams.toString()}&sort=${value}`;
            return newSortString;
          }
        }
        return updatedString;
      };

      history.push({
        search: formString(),
      });
    }
  }

  render() {
    const { history, sortedBy } = this.props;

    return (
      <SortBarSection>
        <Container className="flex align-center justify-center">
          <SortBarContainer>
            <Pill forge={true} to="/teams/forge">
              <span>Forge</span>
            </Pill>
            <Pill pacific={true} to="/teams/pacific">
              <span>Pacific</span>
            </Pill>
            <Pill cavalry={true} to="/teams/cavalry">
              <span>Cavalry</span>
            </Pill>
            <Pill edmonton={true} to="/teams/edmonton">
              <span>Edmonton</span>
            </Pill>
            <Pill valour={true} to="/teams/valour">
              <span>Valour</span>
            </Pill>
            <Pill york={true} to="/teams/york">
              <span>York</span>
            </Pill>
            <Pill atletico={true} to="/teams/atletico">
              <span>Atletico</span>
            </Pill>
            <Pill halifax={true} to="/teams/halifax">
              <span>Halifax</span>
            </Pill>
          </SortBarContainer>
        </Container>
      </SortBarSection>
    );
  }
}

const SortBarSection = styled.section``;

const SortBarContainer = styled(FlexContainer)`
  flex: 1;
  margin: 2em auto;
  background: #f8f8f8;
  border: 1px solid #eeeeee;
  padding: 1em 0;
`;

const Pill = styled(Link)`
  color: #fff;
  background: #22356f;
  border-radius: 1em;
  padding: 0.35em 0.75em;
  margin: 0 0.215em;
  ${'' /* font-size: 0.75rem; */}
  font-size: 11px;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.forge &&
    css`
      background: var(--forge);
    `}

  ${(props) =>
    props.pacific &&
    css`
      background: var(--pacific);
    `}

  ${(props) =>
    props.cavalry &&
    css`
      background: var(--cavalry);
    `}

  ${(props) =>
    props.edmonton &&
    css`
      background: var(--edmonton);
    `}

  ${(props) =>
    props.valour &&
    css`
      background: var(--valour);
    `}

  ${(props) =>
    props.york &&
    css`
      background: var(--york);
    `}

  ${(props) =>
    props.atletico &&
    css`
      background: var(--atletico);
    `}

  ${(props) =>
    props.halifax &&
    css`
      background: var(--wanderers);
    `}
`;

export default SortBar;
