import React from "react";

function Layout({ children }) {
  return (
    <div className="layout">
      <header></header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
