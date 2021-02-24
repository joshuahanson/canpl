import React from 'react'
import AllPlayers from './AllPlayers'
import SortBar from './components/SortBar'

class HomeNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPlayerData: [],
      role: '',
      sortedBy: '',
    }
    this.updatePlayerData = this.updatePlayerData.bind(this)
    this.maintainPlayerState = this.maintainPlayerState.bind(this)
  }
  
  componentDidMount() {
    this.maintainPlayerState()
  }
  
  componentDidUpdate(prevProps) {
    const { location } = this.props
    this.maintainPlayerState()
    this.updateRole(prevProps, location)
  }

  componentWillUnmount() {
    this.setState({ allPlayerData: '' })
    this.setState({ role: '' })
  }

  updateRole(prevProps, location) {
    if (location) {
      const roleQ = new URLSearchParams(location.search).get('role')
      const sortQ = new URLSearchParams(location.search).get('sort')
      const playerDataProps = this.props.allPlayers
      const returnUpdate = () => {
        let playerList = []
        playerDataProps.map(game => {
          if(roleQ === 'Forward') {
            if (
              game.Position.includes(roleQ) ||
              game.Position.includes("Winger") ||
              game.Position.includes("Striker")
            ) {
              playerList.push(game)
            }
          }
          if(roleQ === 'Midfield') {
            if (
              game.Position.includes(roleQ)
            ) {
              playerList.push(game)
            }
          }
          if(roleQ === 'Defender') {
            if (
              game.Position.includes(roleQ) ||
              game.Position.includes('Centre Back') ||
              game.Position.includes('Wing Back') ||
              game.Position.includes('Left Back') ||
              game.Position.includes('Right Back')
            ) {
              playerList.push(game)
            }
          }
          if(roleQ === 'Goal') {
            if (
              game.Position.includes(roleQ)
            ) {
              playerList.push(game)
            }
          }
          return ''
        })
        this.setState({ allPlayerData: playerList })
      }

      // If theres a role in URL, and no player data in state
      // This is a page refresh, new tab, first visit = need to force update
      if(
        roleQ !== null &&
        (
          roleQ === "Forward" ||
          roleQ === "Midfield" ||
          roleQ === "Defender" ||
          roleQ === "Goal"
        )
        && this.state.role === '' || this.state.role !== roleQ
      ) {
        this.setState({role: roleQ})
        this.setState({sortedBy: ''})
        returnUpdate()
      }

      // Role has been changed - on click of nav button
      if(
        (prevProps.location !== location) ||
        (prevProps.history.location !== location)
      ) {
        returnUpdate()
      }

      // Update Sort By
      if(
        sortQ !== null &&
        this.state.sortedBy === '' || this.state.sortedBy !== sortQ
      ) {
        this.setState({sortedBy: sortQ})
      }
    }
  }

  maintainPlayerState() {
    const { allPlayers } = this.props
    const allPlayersData = this.state.allPlayerData

    if(
      (allPlayersData.length < 1 && allPlayers.length > 0)
    ) {
      this.updatePlayerData(allPlayers)
    }
  }

  updatePlayerData(data) {
    this.setState({ allPlayerData: data })
  }
  
  render() {
    const { history, seasonData } = this.props
    const allPlayerState = this.state.allPlayerData
    const role = this.state.role
    const sortedBy = this.state.sortedBy
    return (
      <div className="App">
        <SortBar role={role} sortedBy={sortedBy} history={history} />
        <AllPlayers
          {...this.props} 
          data={allPlayerState} 
        />
      </div>
    )
  }
}

export default HomeNew;
