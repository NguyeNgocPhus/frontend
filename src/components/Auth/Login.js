import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/authAction";
// import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const stateAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, password } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginAction(formData.email, formData.password));
  };
  if (stateAuth) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don`t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
}

export default Login;
