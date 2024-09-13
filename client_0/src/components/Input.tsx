import React from 'react';

interface InputProps {
  type: string;
  name: string;
  id?: string;
  value?: string;
  label?: string;
  style?: object;
  placeholder?: string;
  disabled?: boolean; // Marking as optional with '?'
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  value,
  label,
  placeholder,
  disabled = false,
}) => {
  return (
    <>
      <li>
        <label htmlFor={name}>{label}</label>
      </li>
      <li>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
      </li>
    </>
  );
};

export default Input;
