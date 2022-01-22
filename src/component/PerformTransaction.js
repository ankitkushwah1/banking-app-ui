import axios from "axios";
import React, { useRef, useState } from "react";
import SuccessModal from "../UI/SuccessModal";
export default function PerformTransaction(props) {
  const [error, setError] = useState();
  const amountRef = useRef();
  const depositRef = useRef();
  const withdrawRef = useRef();

  const proceedHandler = async (event) => {
    const amount = amountRef.current.value;
    let type = null;
    if (depositRef.current.checked) {
      type = depositRef.current.value;
    }
    if (withdrawRef.current.checked) {
      type = withdrawRef.current.value;
    }
    console.log(props.accessToken);
    const resp = await axios.post(
      `http://localhost:8000/api/v1/account/${props.user.id}/transaction`,
      {
        transactionType: type,
        amount: amount,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
      }
    );
    props.userChartHandler(props.user.id, props.accessToken);
    console.log(resp);
    if (resp.data) {
      setError({
        title: " Transaction Succesfull",
        message: ` You transaction of type ${type} with an amount ${amount} is successfull
        `,
      });
    }
  };
  const errorHandler = () => {
    setError(null);
    amountRef.current.value = null;
    depositRef.current.checked = false;
    withdrawRef.current.checked = false;
  };
  return (
    <div>
      {error && (
        <SuccessModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div className="card">
        <form>
          <div className="form-group">
            <label>Amount :</label>
            <input type="number" className="form-control" ref={amountRef} />
          </div>
          <br />
          <div className="form-group">
            <label>Deposit</label>&nbsp;
            <input
              type="radio"
              name="type"
              value="deposit"
              className="form-check-input"
              ref={depositRef}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>Withdraw</label>&nbsp;
            <input
              type="radio"
              name="type"
              value="withdraw"
              className="form-check-input"
              ref={withdrawRef}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={proceedHandler}
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
