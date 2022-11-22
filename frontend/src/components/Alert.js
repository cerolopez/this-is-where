import React from "react";

function Alert({alert_type, children, display}) {
  return (
    <div className={"alert alert-" + {alert_type} + " alert-dismissible fade show"} role="alert" style={{display:display}}>
      {children}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
  //alert_type should be one of the Bootstrap alert types - success, danger, warning, etc.
}

export default Alert;