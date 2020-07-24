import React, { useState } from "react";

const Collapse = ({ label = "collapse", collapsed = false, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const defaultStyle = {
    border: "1px solid black",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "rgba(37, 153, 255, 0.25)"
  };
  return (
    <div
      style={
        isCollapsed
          ? { maxHeight: "48px", overflow: "hidden", ...defaultStyle }
          : defaultStyle
      }
    >
      <h3
        onClick={() => {
          setIsCollapsed(c => !c);
        }}
        style={isCollapsed ? { cursor: "s-resize" } : { cursor: "n-resize" }}
      >
        {label}:
      </h3>
      {children}
    </div>
  );
};

export default Collapse;
