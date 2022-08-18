import React, { useState } from "react";
import Chart from "react-apexcharts";

const AnalysisChart = ({ category, interviewee, passUser, height }) => {
  console.log(interviewee, "차트 내부");
  const chart = {
    options: {
      colors: ["#0244FC", "#868686"],
      chart: {
        id: "bar",
      },
      plotOptions: {
        bar: {
          barHeight: "30%",
          columnWidth: "20%",
          horizontal: true,
          dataLabels: {
            style: {
              fontSize: "20px",
              colors: ["#304758"],
            },
            position: "top",
          },
        },
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: category,
        max: 100,
      },
      dataLabels: {
        style: {
          fontSize: "15px",
          colors: ["#333333"],
        },
        position: "top",
        offsetX: 25,
      },
    },
    series: [
      {
        name: "나의 평균(%)",
        data: interviewee,
      },
      {
        name: "합격자 평균(%)",
        data: passUser,
      },
    ],
  };

  return (
    <Chart
      options={chart.options}
      series={chart.series}
      type="bar"
      width="1110"
      height={height}
    />
  );
};

export default AnalysisChart;
