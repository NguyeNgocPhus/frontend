import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../components/Auth/Login";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const stateAuth = useSelector((state) => state.auth.isAuthenticated);
  const sateLoading = useSelector((state) => state.auth.loading);

  return (
    <Route
      {...rest}
      component={!stateAuth && !sateLoading ? Login : Component}
    ></Route>
  );
};

export default PrivateRoute;
