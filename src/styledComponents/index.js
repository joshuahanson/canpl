import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background: #fff;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 0 2px 5px #999;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1em;
`

const FlexContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export { Card, Container, FlexContainer }
