import React from 'react'
import { Chart } from 'react-charts'
import './App.css'
import CSVParse from 'papaparse'
import DefensivePlayer from './DefensivePlayer'
import AllDefenders from './AllDefenders'
import RadarChart from './components/RadarChart'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defenderData: [],
    }
    this.updatePlayerData = this.updatePlayerData.bind(this)
    this.maintainPlayerState = this.maintainPlayerState.bind(this)
  }

  componentDidMount() {
    this.maintainPlayerState()
  }

  componentDidUpdate() {
    this.maintainPlayerState()
  }

  componentWillUnmount() {
    this.setState({ playerData: '' })
  }

  maintainPlayerState() {
    const { defenders } = this.props
    const defenderData = this.state.defenderData

    if(defenderData.length < 1 && defenders.length > 0) {
      this.updatePlayerData(defenders)
    }
  }

  updatePlayerData(data) {
    let defenderList = []
    data.map(game => {
      if (
        game.Position.includes("Centre Back") ||
        game.Position.includes("Central Defender")        
      ) {
        defenderList.push(game)
      }
    })
    
    defenderList.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())

    this.setState({ defenderData: defenderList })
  }

  render() {
    const defenderData = this.state.defenderData

    const series = [
      {
        name: 'Krutzen',
        data: [
          // 2, 1, 1, 5, 3
          // SIntercepts,
          // STackles,
          // SClearances,
          // SBlocks,
          // SRecoveries,
          3.18,
          0.94,
          3.56,
          0.37,
          4.87
        ],
      },
      {
        name: 'Edgar',
        data: [
          // 4, 2, 2, 3, 5
          1.4,
          0.5,
          5.3,
          0.8,
          4.1
        ],
      },
      {
        name: 'Temguia',
        data: [
          // 1, 1, 3, 2, 3
          2.4,
          2,
          3,
          0.6,
          6.8,
        ],
      },
    ]
    return (
      <div className="App">
        <h1 style={{textAlign: 'center'}}>#CCData</h1>
        {/* <RadarChart series={series} /> */}
        <AllDefenders data={defenderData} />
      </div>
    )
  }
}

export default Home;
