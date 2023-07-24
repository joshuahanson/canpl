import React from "react";

const renderMinutes = (data) => {
  let playerMins = 0;
  if (data) {
    data.map((game) => {
      playerMins += parseInt(game.Min, 10);
    });
    return playerMins;
  }
};

const returnInterceptionsNinety = (data) => {
  if (data) {
    const interceptsSum = data.reduce((a, b) => ({
      Int: parseInt(a.Int, 10) + parseInt(b.Int, 10),
    }));
    const interceptsPerNinety = (
      (interceptsSum.Int / renderMinutes(data)) *
      90
    ).toFixed(2);
    return interceptsPerNinety;
  }
};

const returnTacklePerNinety = (data) => {
  let tacklesSuccess = 0;
  if (data) {
    data.map((game) => {
      tacklesSuccess += parseInt(game.SucflTkls, 10);
    });
    const tacklesPer = ((tacklesSuccess / renderMinutes(data)) * 90).toFixed(2);
    return tacklesPer;
  }
};

const returnBlocksPerNinety = (data) => {
  let defenseBlocks = 0;
  if (data) {
    data.map((game) => {
      defenseBlocks += parseInt(game.DefensiveBlocks, 10);
    });
    const blocksPer = ((defenseBlocks / renderMinutes(data)) * 90).toFixed(2);
    return blocksPer;
  }
};

const returnRecoveriesPerNinety = (data) => {
  let recoveries = 0;
  if (data) {
    data.map((game) => {
      recoveries += parseInt(game.Recovery, 10);
    });
    const recovPer = ((recoveries / renderMinutes(data)) * 90).toFixed(2);
    return recovPer;
  }
};

const returnDefTouchesPerNinety = (data) => {
  let touches = 0;
  if (data) {
    data.map((game) => {
      touches += parseInt(game.DefTouch, 10);
    });
    const touchesPer = ((touches / renderMinutes(data)) * 90).toFixed(2);
    return touchesPer;
  }
};

const returnClearancesPerNinety = (data) => {
  let clearances = 0;
  if (data) {
    data.map((game) => {
      clearances += parseInt(game.Clrnce, 10);
    });
    const clearPer = ((clearances / renderMinutes(data)) * 90).toFixed(2);
    return clearPer;
  }
};

const renderInterceptions = (data) => {
  if (data) {
    const interceptsSum = data.reduce((a, b) => ({
      Int: parseInt(a.Int, 10) + parseInt(b.Int, 10),
    }));
    const interceptsPerNinety = (
      (interceptsSum.Int / renderMinutes(data)) *
      90
    ).toFixed(2);

    return (
      <React.Fragment>
        <p>Total interceptions: {interceptsSum.Int}</p>
        <p>Interceptions per 90: {interceptsPerNinety}</p>
      </React.Fragment>
    );
  }
};

const renderTackle = (data) => {
  let tacklesSuccess = 0;
  let tacklesFail = 0;
  if (data) {
    // const successfulTacklesSum = data.reduce((a, b) => ({Tck: a.SucflTkls + b.SucflTkls}))
    // const failedTacklesSum = data.reduce((a, b) => ({Tck: parseInt(a.FailTackle, 10) + parseInt(b.FailTackle, 10)}))
    data.map((game) => {
      tacklesSuccess += parseInt(game.SucflTkls, 10);
      tacklesFail += parseInt(game.FailTackle, 10);
    });
    const successRate = (
      (tacklesSuccess / (tacklesSuccess + tacklesFail)) *
      100
    ).toFixed(2);
    const tacklesPer = ((tacklesSuccess / renderMinutes(data)) * 90).toFixed(2);
    return (
      <React.Fragment>
        <p>Success: {tacklesSuccess}</p>
        <p>Failed: {tacklesFail}</p>
        <p>Percent: {successRate}%</p>
        <p>Tackles per 90: {tacklesPer}</p>
      </React.Fragment>
    );
  }
};

const renderClearances = (data) => {
  let clearances = 0;
  if (data) {
    data.map((game) => {
      clearances += parseInt(game.Clrnce, 10);
    });
    const clearPer = ((clearances / renderMinutes(data)) * 90).toFixed(2);
    return (
      <React.Fragment>
        <p>Clearances: {clearances}</p>
        <p>Clearances per 90: {clearPer}</p>
      </React.Fragment>
    );
  }
};

const renderDuelsSeason = (data) => {
  // let successDuels = 0
  // let lostDuels = 0
  // data.map(game => {
  //   successDuels += parseInt(game.SucflDuels, 10)
  //   lostDuels += parseInt(game.DuelLs, 10)
  // });
  if (data) {
    const successDuels = parseInt(data.SucflDuels, 10);
    const lostDuels = parseInt(data.DuelLs, 10);
    const percentDuels = (
      (successDuels / (successDuels + lostDuels)) *
      90
    ).toFixed(2);
    return (
      <React.Fragment>
        <p>Successful duels: {successDuels}</p>
        <p>Failed duels: {lostDuels}</p>
        <p>Duel Percent: {percentDuels}</p>
      </React.Fragment>
    );
  }
};

const renderBlocksSeason = (data) => {
  if (data) {
    let defenseBlocks = 0;
    data.map((game) => {
      defenseBlocks += parseInt(game.DefensiveBlocks, 10);
    });
    const blocksPer = ((defenseBlocks / renderMinutes(data)) * 90).toFixed(2);
    return (
      <React.Fragment>
        <p>Defensive blocks: {defenseBlocks}</p>
        <p>Blocks per 90: {blocksPer}</p>
      </React.Fragment>
    );
  }
};

const redCardsSeason = (data) => {
  let reds = 0;
  if (data) {
    data.map((game) => {
      reds += parseInt(game.Red, 10);
    });

    return reds;
  }
};
const yellowCardsSeason = (data) => {
  let yellow = 0;
  if (data) {
    data.map((game) => {
      yellow += parseInt(game.Yellow, 10);
    });

    return yellow;
  }
};
const goalsSeason = (data) => {
  let goals = 0;
  if (data) {
    data.map((game) => {
      goals += parseInt(game.Goal, 10);
    });

    return goals;
  }
};
const assistsSeason = (data) => {
  let assists = 0;
  if (data) {
    data.map((game) => {
      assists += parseInt(game.Ast, 10);
    });

    return assists;
  }
};

const renderTeamLogo = (team) => {
  let logo;
  switch (team) {
    case "":
      logo = "";
      break;
    case "Cavalry":
      logo = "/teams/CFC-Primary-Red-Outlined.png";
      break;
    case "Valour":
      logo = "/teams/Valour_FC_Primary.png";
      break;
    case "Forge":
      logo = "/teams/FFC_Primary_main.png";
      break;
    case "York United":
      logo = "/teams/YU_Primary.png";
      break;
    case "HFX Wanderers":
      logo = "/teams/HFX_Wanderers_FC.png";
      break;
    case "Edmonton":
      logo = "/teams/FCE_Logo.png";
      break;
    case "Pacific":
      logo = "/teams/PacificFC.png";
      break;
    case "Atlético Ottawa":
      logo = "/teams/ATO_Primary_Mark_keyline.png";
      break;
  }
  return logo;
};

const getTeamName = (team) => {
  return team
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export {
  returnInterceptionsNinety,
  returnTacklePerNinety,
  returnBlocksPerNinety,
  returnRecoveriesPerNinety,
  returnClearancesPerNinety,
  returnDefTouchesPerNinety,
  renderMinutes,
  renderInterceptions,
  renderTackle,
  renderClearances,
  renderDuelsSeason,
  renderBlocksSeason,
  redCardsSeason,
  yellowCardsSeason,
  goalsSeason,
  assistsSeason,
  renderTeamLogo,
  getTeamName,
};
