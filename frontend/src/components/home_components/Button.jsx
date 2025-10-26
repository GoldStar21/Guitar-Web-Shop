"use client";

const Button = ({ label, onClick, modifier = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${modifier ? `button--${modifier}` : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
