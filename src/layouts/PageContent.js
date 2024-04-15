import React from "react";

function PageContent({ children }) {
  return (
    <div className="app-content content overflow-hidden">
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div className="container-xxl p-0">{children}</div>
    </div>
  );
}

export default PageContent;
