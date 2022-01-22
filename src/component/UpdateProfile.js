import axios from "axios";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react/cjs/react.development";

const UpdateProfile = (props) => {
  let history = useHistory();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneNoInputRef = useRef();
  const passwordInputRef = useRef();
  const accountNoInputRef = useRef();
  const balanceInputRef = useRef();

  useEffect(async () => {
    const resp = await axios.get(
      `http://localhost:8000/api/v1/account/user/${props.user.id}`
    );
    console.log(resp);
    firstNameInputRef.current.value = resp.data.firstName;
    lastNameInputRef.current.value = resp.data.lastName;
    emailInputRef.current.value = resp.data.email;
    phoneNoInputRef.current.value = resp.data.phone;
    accountNoInputRef.current.value = resp.data.accno;
    balanceInputRef.current.value = resp.data.balance;
    passwordInputRef.current.value = resp.data.password;
  }, [props.logedinUser]);
  const updateHandler = async (event) => {
    event.preventDefault();
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredphone = phoneNoInputRef.current.value;
    const enteredPassword = passwordInputRef;
    const accountNo = accountNoInputRef.current.value;
    const balance = balanceInputRef;

    const resp = await axios.post(
      `http://localhost:8000/api/v1/account/update/${props.user.id}`,
      {
        accno: accountNo,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        phone: enteredphone,
        balance: balance,
        password: enteredPassword,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
      }
    );
    if (resp) {
      props.setLogedinUser(enteredFirstName);
      history.push("/");
    }
    console.log(resp);
  };

  return (
    <div className="card">
      <form>
        <div className="form-group ">
          <label htmlFor="firstName">Account No :</label>
          <input
            id="firstName"
            type="text"
            value={accountNoInputRef.current}
            ref={accountNoInputRef}
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group ">
          <label htmlFor="firstName">First Name :</label>
          <input
            id="firstName"
            type="text"
            value={firstNameInputRef.current}
            ref={firstNameInputRef}
            className="form-control"
          />
        </div>
        <div className="form-group ">
          <label htmlFor="lastName">Last Name :</label>
          <input
            id="lastName"
            type="text"
            value={lastNameInputRef.current}
            ref={lastNameInputRef}
            className="form-control"
          />
        </div>
        <div className="form-group ">
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            value={emailInputRef.current}
            ref={emailInputRef}
            className="form-control"
          />
        </div>
        <div className="form-group ">
          <label htmlFor="phone">Phone No :</label>
          <input
            id="phone"
            type="number"
            value={phoneNoInputRef.current}
            ref={phoneNoInputRef}
            className="form-control"
          />
        </div>

        <button className="btn btn-primary" onClick={updateHandler}>
          Update Now
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
