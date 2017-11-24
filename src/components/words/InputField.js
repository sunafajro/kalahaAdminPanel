import React from "react";
import { bool, func, string } from 'prop-types';

InputField.propTypes = {
  disabled: bool.isRequired,
  name: string.isRequired,
  handleUpdate: func.isRequired,
  title: string.isRequired,
  value: string
}

export default function InputField({ disabled, name, handleUpdate, title, value }) {
  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control form-control-sm"
        value={ value }
        placeholder={ title }
        onChange={(e) => {
          handleUpdate(name, 'word', e.target.value);
        }}
        disabled={disabled}
      />
    </div>
  );
}
