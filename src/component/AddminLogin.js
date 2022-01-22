import React, { useRef, useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const AdminLogin = (props) => {
  let history = useHistory();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState();

  const loginHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (
      enteredName.trim().length === 0 &&
      enteredPassword.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "please entered a valid name and Password",
      });
      return;
    }
    if (enteredPassword.trim().length == 0) {
      setError({
        title: "Invalid input",
        message: "please entered a valid Password",
      });
      return;
    }

    const resp = await axios.post(
      "http://localhost:8000/api/v1/account/admin/login",
      {
        name: enteredName,
        password: enteredPassword,
      }
    );

    if (resp.data.accessToken) {
      props.setAccessToken(resp.data.accessToken);
      props.setLogedinUser(enteredName);
      props.setUser(resp.data.payload);
      props.chartHandler(enteredName, resp.data.accessToken);
      history.push("/admin-dashboard");
    } else {
      setError({
        title: "Invalid input",
        message: "name or password is incorrect",
      });
      nameInputRef.current.value = null;
      passwordInputRef.current.value = null;
      return;
    }
  };
  const errorHandler = () => {
    setError(null);
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
      <div className="card">
        <h1>Admin Login</h1>
        <form>
          <div className="form-group">
            <label>Name :</label>
            <input type="text" className="form-control" ref={nameInputRef} />
          </div>
          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              className="form-control"
              ref={passwordInputRef}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={loginHandler}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
