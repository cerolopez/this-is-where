import React from "react";
import PropTypes from "prop-types";

function Alert({ alert_type, children, display }) {
  const alertClass =
    "alert alert-" + alert_type + " alert-dismissible fade show";
  return (
    <div className={alertClass} role="alert" style={{ display: display }}>
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

Alert.propTypes = {
  alert_type: PropTypes.string.isRequired, //Should be one of the Bootstrap 5.2 alert types - success, danger, warning, etc.
  children: PropTypes.string, //The message to be displayed in the alert
  display: PropTypes.string.isRequired, //Should be "none" (hidden) or "block" (visible)
};

export default Alert;
