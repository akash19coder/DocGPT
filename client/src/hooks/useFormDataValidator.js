import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState();
  console.log(errors);

  const validate = (values) => {
    let newErrors = {};

    // Check for empty fields
    Object.keys(values).forEach((key) => {
      if (!values[key].trim()) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } cannot be empty.`;
      }
    });

    // Name: Only letters and spaces
    if (
      "name" in values &&
      values.name.trim() &&
      !/^[a-zA-Z\s]+$/.test(values.name)
    ) {
      newErrors.name = "Name should only contain letters and spaces.";
    }

    // Username: Letters, numbers, and underscores but not only underscores or only numbers or only a mix of underscores and numbers
    if (
      "username" in values &&
      values.username.trim() &&
      !/^(?!_+$)(?!\d+$)(?![_\d]+$)[a-zA-Z0-9_]+$/.test(values.username)
    ) {
      newErrors.username =
        "Username can contain letters, numbers, and underscores but cannot be only underscores, only numbers, or only a mix of underscores and numbers.";
    }

    // Email: Basic email format validation
    if (
      "email" in values &&
      values.email.trim() &&
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)
    ) {
      newErrors.email = "Invalid email format.";
    }

    // Password: At least one uppercase, one lowercase, one number, one special character, and min length 6
    if (
      "password" in values &&
      values.password.trim() &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(values.password)
    ) {
      newErrors.password =
        "Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  return { errors, validate };
};

export default useValidation;
