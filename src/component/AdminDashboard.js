import axios from "axios";
import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./AdminDashboard.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AdminDashboard = (props) => {
  console.log("customer", props);
  let history = useHistory();
  const customersDetailHandler = async () => {
    history.push("/customer-details");
  };
  let totalBalance = 0;
  for (let d of props.customersData) totalBalance += d.balance;

  const array = props.customersData.map((d) => {
    return {
      name: d.accno,
      y: (d.balance / totalBalance) * 100,
    };
  });

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Overall Money distribution of all the accounts",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Share",
        colorByPoint: true,
        data: array,
      },
    ],
  };

  const logoutHandler = () => {
    props.setUser({});
    props.setAccessToken(null);
    history.push("/admin");
  };

  return (
    <div>
      <div className="chart">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

      <div className="card">
        <button
          type="button"
          className="btn btn-success"
          onClick={customersDetailHandler}
        >
          All Customer Details
        </button>
        <div>View all your customer details by clicking on this button</div>
      </div>
      <div className="card">
        <button
          type="button"
          className="btn btn-success"
          onClick={logoutHandler}
        >
          Logout
        </button>
        <div>Update customer details by clicking on this button</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
