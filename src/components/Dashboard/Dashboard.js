import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getCurrentUser } from "../../actions/profileAction";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const stateProfile = useSelector((state) => state.profile.profile);
  const stateloading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return stateProfile === null && stateloading ? (
    <Spinner></Spinner>
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {stateProfile !== null ? (
        <>
          <DashboardAction></DashboardAction>
          <Experience experience={stateProfile.experience}></Experience>
          <Education experience={stateProfile.education}></Education>
        </>
      ) : (
        <>
          <p>you have not yet setup a profile , please add your infor</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
