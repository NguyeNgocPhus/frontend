import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getAllProfile } from "../../actions/profileAction";
import ProfileItem from "./ProfileItem";
function Profiles() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profiles = useSelector((state) => state.profile.profiles);

  useEffect(() => {
    dispatch(getAllProfile());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h1 className="large text-primary">Developer</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => {
                return (
                  <ProfileItem
                    key={profile._id}
                    profile={profile}
                  ></ProfileItem>
                );
              })
            ) : (
              <h4>No profile found .......</h4>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Profiles;
