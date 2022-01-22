import React from "react";
import { CSVLink } from "react-csv";
import classes from "./CustomersDetails.module.css";
const CustomerDetails = (props) => {
  const customers = props.customersData.map((c) => {
    return (
      <tr>
        <td>{c.accno}</td>
        <td>{c.firstName}</td>
        <td>{c.lastName}</td>
        <td>{c.balance}</td>
        <td>{c.email}</td>
        <td>{c.phone}</td>
      </tr>
    );
  });

  return (
    <div>
      <div className="card">
        <CSVLink
          data={props.customersData}
          target="_blank"
          class="button-30 btn btn-success"
        >
          Download Data
        </CSVLink>
      </div>
      <div className={classes.tableCard}>
        <table className={classes.customers}>
          <tr>
            <th>Account No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Balance</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          {customers}
        </table>
      </div>
    </div>
  );
};

export default CustomerDetails;
