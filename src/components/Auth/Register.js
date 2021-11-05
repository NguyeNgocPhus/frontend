import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertAction";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../actions/authAction";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const stateAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { name, email, password, passwordConfirm } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(setAlert("vui long nhap lai mat khau cho dung dmmm", "danger"));
    } else {
      dispatch(authAction({ name, email, password }));
    }
  };
  if (stateAuth) {
    <Redirect to="/login"></Redirect>;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
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
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            onChange={(e) => onChange(e)}
            value={passwordConfirm}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
}

export default Register;
