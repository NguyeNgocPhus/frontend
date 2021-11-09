import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getProfileById } from "../../actions/profileAction";

import { Link, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGitHub from "./ProfileGitHub";

function ProfileDetail() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loadingAuth = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Go back to profiles
          </Link>
          {isAuthenticated &&
            !loadingAuth &&
            !loading &&
            user &&
            user._id.toString() === profile.user._id.toString() && (
              <Link to="/edit-profile" className="btn btn-dark">
                Go to Edit profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile}></ProfileAbout>
            {/* profile experience  */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((exp) => {
                    return (
                      <ProfileExperience
                        key={exp._id}
                        exp={exp}
                      ></ProfileExperience>
                    );
                  })}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            {/*  profile education */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((edu) => {
                    return (
                      <ProfileEducation
                        key={edu._id}
                        edu={edu}
                      ></ProfileEducation>
                    );
                  })}
                </>
              ) : (
                <h4>Not Education credentials</h4>
              )}
            </div>
          </div>

          {profile.githubUsername && (
            <ProfileGitHub username={profile.githubUsername}></ProfileGitHub>
          )}
        </>
      )}
    </>
  );
}

export default ProfileDetail;
