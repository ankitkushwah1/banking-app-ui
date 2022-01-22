import axios from "axios";
import React, { useState, Fragment, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorModal from "../UI/ErrorModal";
import SuccessModal from "../UI/SuccessModal";
const AddCustomer = (props) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneNoInputRef = useRef();
  const amountInputRef = useRef();
  const passwordInputRef = useRef();

  const addCustomerHandler = async (event) => {
    event.preventDefault();
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredphone = phoneNoInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;

    if (
      enteredFirstName.trim().length === 0 ||
      enteredLastName.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredphone.trim().length === 0 ||
      enteredAmount.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "please entered all the details to open acount ",
      });
      return;
    }

    const resp = await axios.post(
      "http://localhost:8000/api/v1/account/registration",
      {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        balance: enteredAmount,
        email: enteredEmail,
        phone: enteredphone,
        password: enteredPassword,
      }
    );
    if (resp) {
      setSuccess({
        title: "Succesfully Registered ",
        message: `you have succesfully opened an account.  
                  Please login to continue...
        `,
      });
      firstNameInputRef.current.value = null;
      lastNameInputRef.current.value = null;
      phoneNoInputRef.current.value = null;
      firstNameInputRef.current.value = null;
      emailInputRef.current.value = null;
      passwordInputRef.current.value = null;
      amountInputRef.current.value = null;
      return;
    }
    console.log(resp);
  };
  const errorHandler = () => {
    setError(null);
  };
  const successHandler = () => {
    setSuccess(null);
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
      {success && (
        <SuccessModal
          title={success.title}
          message={success.message}
          onConfirm={successHandler}
        />
      )}

      <div className="card">
        <form>
          <div className="form-group ">
            <label htmlFor="firstName">First Name :</label>
            <input
              id="firstName"
              type="text"
              ref={firstNameInputRef}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="lastName">Last Name :</label>
            <input
              id="lastName"
              type="text"
              ref={lastNameInputRef}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              type="email"
              ref={emailInputRef}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="phone">Phone No :</label>
            <input
              id="phone"
              type="number"
              ref={phoneNoInputRef}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="amount">Amount :</label>
            <input
              id="amount"
              type="number"
              ref={amountInputRef}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="password">Password :</label>
            <input
              id="password"
              type="password"
              ref={passwordInputRef}
              className="form-control"
            />
          </div>

          <button className="btn btn-primary" onClick={addCustomerHandler}>
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
