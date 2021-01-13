import React from 'react'

// console.log(``)
// console.log(``)
// console.log(``)
// console.log(`FwdPassCmp, ${playerName}:  ${selectedGame.FwdPassCmp}`)
// console.log(`Aerials, ${playerName}:  ${selectedGame.Aerials}`)
// console.log(`Recoveries ${playerName}: ${selectedGame.Recovery}`)

// console.log(`DefTouchD3 ${playerName}: ${selectedGame.DefTouchD3}`)
// console.log(`DefTouchM3 ${playerName}: ${selectedGame.DefTouchM3}`)
// console.log(`DefTouchA3 ${playerName}: ${selectedGame.DefTouchA3}`)
// console.log(``)
// console.log(`TchsD3 ${playerName}: ${selectedGame.TchsD3}`)
// console.log(`TchsM3 ${playerName}: ${selectedGame.TchsM3}`)
// console.log(`TchsA3 ${playerName}: ${selectedGame.TchsA3}`)

const renderMinutes = (data) => {
  let playerMins = 0
  data.map(game => {
    playerMins += parseInt(game.Min, 10);
  });
  return playerMins
}

const renderInterceptions = (data) => {
  const interceptsSum = data.reduce((a, b) => ({Int: parseInt(a.Int, 10) + parseInt(b.Int, 10)}))
  const interceptsPerNinety = ((interceptsSum.Int / renderMinutes(data)) * 90).toFixed(2)
  
  return (
    <React.Fragment>
      <p>Total interceptions: {interceptsSum.Int}</p>
      <p>Interceptions per 90: {interceptsPerNinety}</p>
    </React.Fragment>
  )
}

const renderTackle = (data) => {
  let tacklesSuccess = 0
  let tacklesFail = 0
  // const successfulTacklesSum = data.reduce((a, b) => ({Tck: a.SucflTkls + b.SucflTkls}))
  // const failedTacklesSum = data.reduce((a, b) => ({Tck: parseInt(a.FailTackle, 10) + parseInt(b.FailTackle, 10)}))
  data.map(game => {
    tacklesSuccess += parseInt(game.SucflTkls, 10)
    tacklesFail += parseInt(game.FailTackle, 10)
  });
  const successRate = ((tacklesSuccess / (tacklesSuccess + tacklesFail)) * 100).toFixed(2)
  const tacklesPer = ((tacklesSuccess / renderMinutes(data)) * 90).toFixed(2)
  return (
    <React.Fragment>
      <p>Success: {tacklesSuccess}</p>
      <p>Failed: {tacklesFail}</p>
      <p>Percent: {successRate}%</p>
      <p>Tackles per 90: {tacklesPer}</p>
    </React.Fragment>
  )
}

const renderClearances = (data) => {
  let clearances = 0
  data.map(game => {
    clearances += parseInt(game.Clrnce, 10)
  });
  const clearPer = ((clearances / renderMinutes(data)) * 90).toFixed(2)
  return (
    <React.Fragment>
      <p>Clearances: {clearances}</p>
      <p>Clearances per 90: {clearPer}</p>
    </React.Fragment>
  )
}

const renderDuelsSeason = (data) => {
  let successDuels = 0
  let lostDuels = 0
  data.map(game => {
    successDuels += parseInt(game.SucflDuels, 10)
    lostDuels += parseInt(game.DuelLs, 10)
  });
  const percentDuels = ((successDuels / (successDuels + lostDuels)) * 90).toFixed(2)
  return (
    <React.Fragment>
      <p>
        Successful duels: {successDuels}
      </p>
      <p>
        Failed duels: {lostDuels}
      </p>
      <p>
        Duel Percent: {percentDuels}
      </p>
    </React.Fragment>
  )
}

const renderBlocksSeason = (data) => {
  let defenseBlocks = 0
  data.map(game => {
    defenseBlocks += parseInt(game.DefensiveBlocks, 10)
  });
  const blocksPer = ((defenseBlocks / renderMinutes(data)) * 90).toFixed(2)
  return (
    <React.Fragment>
      <p>
        Defensive blocks: {defenseBlocks}
      </p>
      <p>
        Blocks per 90: {blocksPer}
      </p>
    </React.Fragment>
  )
}

export {
  renderMinutes,
  renderInterceptions,
  renderTackle,
  renderClearances,
  renderDuelsSeason,
  renderBlocksSeason,
}
