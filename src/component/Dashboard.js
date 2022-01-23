import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorModal from "../UI/ErrorModal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./Dashboard.css";
const Dashboard = (props) => {
  const imageInputRef = useRef();
  console.log("tran", props);
  const [error, setError] = useState();

  let history = useHistory();

  useEffect(() => {
    if (!props.user.name) {
      setError({
        title: "Not Authorized",
        message: "Please login to access the dashboard...!",
      });
      return;
    }
  }, [props.userTransactions]);

  let totalDeposit = 0,
    totalWithdraw = 0,
    totalTransactions = props.userTransactions.length;
  for (let d of props.userTransactions) {
    if (d.type == "deposit") totalDeposit++;
    if (d.type == "withdraw") totalWithdraw++;
  }

  totalDeposit = (totalDeposit / totalTransactions) * 100;
  totalWithdraw = (totalWithdraw / totalTransactions) * 100;

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: "Transaction<br>shares<br>",
      align: "center",
      verticalAlign: "middle",
      y: 60,
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
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Share",
        innerSize: "50%",
        data: [
          ["Deposit", totalDeposit],
          ["Withdraw", totalWithdraw],
        ],
      },
    ],
  };

  const passbookHandler = async () => {
    const resp = await axios.get(
      `http://localhost:8000/api/v1/account/${props.user.id}/passbook`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
      }
    );
    props.setUserTransactions(resp.data);
    if (resp.data != []) {
      history.push("/passbook");
    }
  };

  const transactionHandler = (event) => {
    history.push("/perform-transaction");
  };

  const updateHandler = () => {
    history.push("/update-profile");
  };
  const logoutHandler = () => {
    props.setAccessToken(null);
    props.setLogedinUser(null);
    props.setUser({});
    history.push("/");
  };
  const errorHandler = () => {
    setError(null);
    history.push("/");
  };

  const uploadHandler = async () => {
    console.log(imageInputRef.current.value);
    let reader = new FileReader();
    reader.readAsDataURL(imageInputRef.current.files[0]);
    reader.onload = (e) => {
      console.warn("image data", e.target.result);
    };
    const resp = await axios.post(
      `http://localhost:8000/api/v1/account/user/${props.user.id}/upload-docs`,
      {
        path: imageInputRef.current.value,
      }
    );
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div>
        <div className="user-details">
          <div className="card detail1">
            <p>Account no : {props.userdata.accno}</p>
            <p>First Name : {props.userdata.firstName}</p>
            <p>Last Name : {props.userdata.lastName}</p>
            <p>Balance : {props.userdata.balance}</p>
          </div>
          <div className="card detail2">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>

        <div className="card">
          <button
            type="button"
            className="btn btn-success"
            onClick={passbookHandler}
          >
            Passbook
          </button>
          <div>
            View all your transaction details by clicking on this button
          </div>
        </div>
        <div className="card">
          <button
            type="button"
            className="btn btn-success"
            onClick={transactionHandler}
          >
            Perform Transaction
          </button>
          <div>
            Perform transaction deposit/withdraw by clicking on this button
          </div>
        </div>

        <div className="card">
          <button
            type="button"
            className="btn btn-success"
            onClick={updateHandler}
          >
            Update Profile
          </button>
          <div>Update your account details by clicking on this button</div>
        </div>
        <div className="card">
          <label>Adhar Card</label>
          <div>
            <img></img>
          </div>
          <input type="file" id="adhar" ref={imageInputRef} />
          <button
            type="button"
            className="btn btn-success"
            onClick={uploadHandler}
          >
            Upload AdharCard
          </button>
          <div>Update your account details by clicking on this button</div>
        </div>
        <div className="card">
          <button
            className="btn btn-danger"
            type="button"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
