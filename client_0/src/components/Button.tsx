import React from 'react'

interface ButtonProps {
  buttonName: string;
  type?: "submit";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonName, type, onClick }) => {
  return (
    <>
      <button type={type} onClick={onClick}>
        {buttonName}
      </button>
    </>
  )
}

export default Button