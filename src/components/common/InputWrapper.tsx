import React from "react";

interface InputWrapperProps {
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  children: React.ReactNode;
}

function InputWrapper({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children
}: InputWrapperProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{topLeft}</span>
        <span className="label-text-alt">{topRight}</span>
      </label>
      {children}
      <label className="label">
        <span className="label-text-alt">{bottomLeft}</span>
        <span className="label-text-alt">{bottomRight}</span>
      </label>
    </div>
  );
}

export default InputWrapper;
