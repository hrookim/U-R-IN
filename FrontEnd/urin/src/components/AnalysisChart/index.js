import React, { useState } from "react";
import Chart from "react-apexcharts";

const AnalysisChart = (props) => {
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "bar",
      },
      plotOptions: {
        bar: {
          barHeight: "30%",
          horizontal: true,
          dataLabels: {
            style: {
              fontSize: "14px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "bold",
              colors: "fff",
            },
            position: "top",
          },
        },
      },
      xaxis: {
        categories: ["미소", "눈동자"],
        max: 100,
      },
    },
    series: [
      {
        name: "나의 평균",
        data: [56, 95],
      },
      {
        name: "합격자 평균",
        data: [73, 42],
      },
    ],
  });

  return (
    <Chart
      options={chart.options}
      series={chart.series}
      type="bar"
      width="1070"
      height="300"
    />
  );
};

export default AnalysisChart;
