import React from "react";
import { useSelector } from "react-redux";
function Alert() {
  const stateAlert = useSelector((state) => state.alert);

  const classess = `alert ${
    stateAlert[0] ? `alert-${stateAlert[0].alertType}` : ""
  }`;

  return (
    <>
      {stateAlert.length > 0 && (
        <div className={classess}>{stateAlert[0].msg}</div>
      )}
      {stateAlert.length === 0 && <p></p>}
    </>
  );
}

export default Alert;
