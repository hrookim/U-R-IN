import React, { useState } from "react";
import Chart from "react-apexcharts";

const AnalysisChart = (props) => {
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-treemap",
      },
    },
    series: [
      {
        name: "series-1",
        data: [
          {
            x: "미소",
            y: 218,
          },
          {
            x: "분노",
            y: 149,
          },
          {
            x: "찡그림",
            y: 184,
          },
          {
            x: "흔들림",
            y: 55,
          },
          {
            x: "무표정",
            y: 84,
          },

          {
            x: "Indore",
            y: 19,
          },
          {
            x: "Kanpur",
            y: 29,
          },
        ],
      },
    ],
  });

  return (
    <Chart
      options={chart.options}
      series={chart.series}
      type="treemap"
      width="750"
    />
  );
};

export default AnalysisChart;
