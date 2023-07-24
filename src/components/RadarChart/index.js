import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

class RadarChart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;
    const title = this.props.title || "";

    return (
      <Radar
        data={data}
        options={{
          // responsive: true,
          layout: {
            beginAtZero: true,
            padding: {
              top: 32,
              bottom: 32,
            },
          },
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
        }}
      />
    );
  }
}

export default RadarChart;
