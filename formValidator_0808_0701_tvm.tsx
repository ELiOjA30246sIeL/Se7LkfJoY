// 代码生成时间: 2025-08-08 07:01:25
 * Features:
 * - Validates form data against a set of rules.
 * - Provides error messages for invalid input.
 * - Easy to extend with additional validation rules.
 */

import React, { useState, useCallback } from 'react';

// Define a type for the form data
interface FormData {
  username: string;
  email: string;
  password: string;
}

// Define a type for the validation errors
interface ValidationErrors {
  [K in keyof FormData]?: string;
}

// Define the validation rules
const validationRules: Record<keyof FormData, (value: any) => string | null> = {
  username: (value) => {
    if (!value) return 'Username is required.';
    if (value.length < 3) return 'Username must be at least 3 characters long.';
    return null;
  },
  email: (value) => {
    if (!value) return 'Email is required.';
    const pattern = /^\S+@\S+\.\S+$/;
    if (!pattern.test(value)) return 'Email is invalid.';
    return null;
  },
  password: (value) => {
    if (!value) return 'Password is required.';
    if (value.length < 6) return 'Password must be at least 6 characters long.';
    return null;
  },
};

// FormValidator component
const FormValidator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    },
    [],
  );

  const validate = useCallback(
    (name: keyof FormData) => {
      const rule = validationRules[name];
      if (rule) {
        const error = rule(formData[name]);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      }
    },
    [formData],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: ValidationErrors = {};
      for (const key in formData) {
        const error = validationRules[key](formData[key]);
        if (error) newErrors[key as keyof FormData] = error;
      }
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
      } else {
        console.log('Form data is valid:', formData);
      }
    },
    [formData],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <div>{errors.username}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormValidator;