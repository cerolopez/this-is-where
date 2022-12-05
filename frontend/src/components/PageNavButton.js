import React from "react";

function PageNavButton({ children, onClickMethod, key }) {
  return (
    <li className="page-item">
      <button className="page-link" key={key} onClick={onClickMethod}>{children}</button>
    </li>
  );
}

export default PageNavButton;