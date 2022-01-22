import React, { Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Login from "./component/Login";
import AddCustomer from "./component/AddCustomer";
import Dashboard from "./component/Dashboard";
import Passbook from "./component/Passbook";
import PerformTransaction from "./component/PerformTransaction";
import AdminDashboard from "./component/AdminDashboard";
import { useEffect } from "react/cjs/react.development";
import axios from "axios";
import UpdateProfile from "./component/UpdateProfile";
import AdminLogin from "./component/AddminLogin";
import CustomerDetails from "./component/CustomersDetails";
const App = () => {
  const [logedinUser, setLogedinUser] = useState();
  const [user, setUser] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);

  const [userdata, setUserData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {}, [
    userTransactions,
    customersData,
    accessToken,
    logedinUser,
    userdata,
  ]);

  const userChartHandler = async (id, token) => {
    const u = await axios.get(
      `http://localhost:8000/api/v1/account/user/${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const transactions = await axios.get(
      `http://localhost:8000/api/v1/account/${id}/passbook`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserTransactions(transactions.data);
    setUserData(u.data);
  };
  const chartHandler = async (id, token) => {
    const resp = await axios.get(
      `http://localhost:8000/api/v1/account/admin/${id}/all-users`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = await axios.get(
      `http://localhost:8000/api/v1/account/user/${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCustomersData(resp.data);
    setUserData(user.data);
  };

  return (
    <Fragment>
      <Menu logedinUser={logedinUser} user={user} />
      <Switch>
        <Route exact path="/">
          <Login
            setLogedinUser={setLogedinUser}
            setAccessToken={setAccessToken}
            chartHandler={chartHandler}
            userChartHandler={userChartHandler}
            setUser={setUser}
          />
        </Route>
        <Route path="/register">
          <AddCustomer accessToken={accessToken} />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            logedinUser={logedinUser}
            setUserTransactions={setUserTransactions}
            setLogedinUser={setLogedinUser}
            user={user}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            userTransactions={userTransactions}
            userdata={userdata}
            userChartHandler={userChartHandler}
            setUser={setUser}
          />
        </Route>
        <Route path="/passbook">
          <Passbook
            logedinUser={logedinUser}
            user={user}
            userTransactions={userTransactions}
            accessToken={accessToken}
          />
        </Route>
        <Route path="/perform-transaction">
          <PerformTransaction
            logedinUser={logedinUser}
            accessToken={accessToken}
            userChartHandler={userChartHandler}
            user={user}
          />
        </Route>
        <Route path="/admin">
          <AdminLogin
            setAccessToken={setAccessToken}
            setLogedinUser={setLogedinUser}
            chartHandler={chartHandler}
            setUser={setUser}
          />
        </Route>
        <Route path="/admin-dashboard">
          <AdminDashboard
            customersData={customersData}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/customer-details">
          <CustomerDetails
            customersData={customersData}
            accessToken={accessToken}
          />
        </Route>
        <Route path="/update-profile">
          <UpdateProfile
            logedinUser={logedinUser}
            user={user}
            accessToken={accessToken}
            setLogedinUser={setLogedinUser}
          />
        </Route>
      </Switch>
    </Fragment>
  );
};
export default App;
