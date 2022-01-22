import React from "react";
import { CSVLink } from "react-csv";
import classes from "./Passbook.module.css";
const Passbook = (props) => {
  console.log(props);
  const transactions = props.userTransactions.map((t) => {
    return (
      <tr>
        <td>{t.id}</td>
        <td>{t.amount}</td>
        <td>{t.type}</td>
        <td>{t.date}</td>
      </tr>
    );
  });
  return (
    <div>
      <div className="card">
        <CSVLink
          data={props.userTransactions}
          target="_blank"
          class="button-30 btn btn-success"
        >
          Download Data
        </CSVLink>
      </div>
      <div className={classes.tableCard}>
        <table className={classes.customers}>
          <tr>
            <th>Transaction id</th>
            <th>Amount</th>
            <th>Transaction Type</th>
            <th>Date of Transaction</th>
          </tr>
          {transactions}
        </table>
      </div>
    </div>
  );
};

export default Passbook;
