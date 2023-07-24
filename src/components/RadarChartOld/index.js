import React from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

class RadarChartOld extends React.Component {
  constructor(props) {
    super(props);
    const defaultCategories = this.props.categories || [
      "Interceptions per 90",
      "Tackles per 90",
      "Clearances per 90",
      "Blocks per 90",
      "Recoveries per 90",
    ];
    this.state = {
      options: {
        chart: {
          height: 350,
          type: "radar",
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: "#e9e9e9",
              fill: {
                colors: ["#fafafa", "#fff"],
              },
            },
          },
        },
        title: {
          text: "",
        },
        colors: ["#dc4405", "#a1c63c", "#22356F"],
        markers: {
          size: 5,
          colors: ["#fff"],
          strokeColor: "rgba(255,255,255,0)",
          strokeWidth: 5,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        xaxis: {
          categories: defaultCategories,
        },
        yaxis: {
          tickAmount: 6,
          min: 0,
          max: 6,
          labels: {
            formatter: function (val, i) {
              if (i % 2 === 0) {
                return val;
              } else {
                return "";
              }
            },
          },
        },
      },
    };
  }

  render() {
    // const series = [
    //   {
    //     name: 'Krutzen',
    //     data: [2, 1, 1, 5, 3],
    //   },
    //   {
    //     name: 'Edgar',
    //     data: [4, 2, 2, 3, 5],
    //   },
    //   {
    //     name: 'Temguia',
    //     data: [1, 1, 3, 2, 3],
    //   },
    // ]
    const { series } = this.props;
    return (
      <div className="radar-chart">
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={series}
            type="radar"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default RadarChart;
