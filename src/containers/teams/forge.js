import React from 'react'

class Forge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: [],
    }
  }
  
  componentDidMount() {
  }
  
  render() {
    return (
      <article className="forge">
        <div className="container">
          <h1>This is the Forge FC page</h1>
          <p>This is a short sentence. This is a bit of a longer sentence, I think.</p>

          <h3>Typical Lineup</h3>
          <p>
            <strong>4-3-3</strong>
          </p>
          <h3>Players</h3>
          <p>List of players goes here</p>
          
          <h3>Team Stats</h3>
          <p>team stats</p>
        </div>
      </article>
    )
  }
}

export default Forge;
