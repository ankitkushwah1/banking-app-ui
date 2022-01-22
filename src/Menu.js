import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Menu.module.css";
export default (props) => {
  console.log(props.user);
  return (
    <nav className={classes.nav}>
      <div>
        <NavLink to="/home" className={classes.navigationlink}>
          Home
        </NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink exact to="/" className={classes.navigationlink}>
          {!props.user.name && <span>Login</span>}
        </NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink to="/register" className={classes.navigationlink}>
          {!props.user.name && <span>Register</span>}
        </NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {props.user.isAdmin ? (
          <NavLink to="/admin-dashboard" className={classes.navigationlink}>
            Admin Dashboard
          </NavLink>
        ) : (
          <NavLink to="/dashboard" className={classes.navigationlink}>
            Dashboard
          </NavLink>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink to="/admin" className={classes.navigationlink}>
          {!props.user.name && <span>Admin</span>}
        </NavLink>
      </div>
      <div className={classes.username}>{props.user.name || "Guest"}</div>
    </nav>
  );
};
