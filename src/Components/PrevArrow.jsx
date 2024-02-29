import React from "react";

export default function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        fontSize: "24px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}
