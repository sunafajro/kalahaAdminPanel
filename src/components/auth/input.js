import React from "react";
import { bool, func, string } from "prop-types";

Input.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  placeholder: string.isRequired,
  disabled: bool.isRequired,
  onChange: func.isRequired
};

function Input({ label, name, value, placeholder, disabled, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name + "Input"}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={name + "Input"}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={e => {
          onChange(name, e.target.value);
        }}
      />
    </div>
  );
}

export default Input;
