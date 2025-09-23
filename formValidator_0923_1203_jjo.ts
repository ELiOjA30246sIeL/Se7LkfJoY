// 代码生成时间: 2025-09-23 12:03:20
import React, { useState } from 'react';

// Define a type for the form data to validate against.
interface FormData {
  username: string;
  email: string;
  password: string;
}

// Define the shape of the form rules for validation.
interface FormRules {
  [key: string]: (value: string) => boolean | string;
}

// Define the shape of the form validation errors.
interface ValidationErrors {
  [key: string]: string;
}

// A function to validate form data against a set of rules.
const validateFormData = (formData: FormData, rules: FormRules): ValidationErrors => {
  const errors: ValidationErrors = {};
  for (const [field, value] of Object.entries(formData)) {
    const rule = rules[field];
    if (rule && !rule(value)) {
      errors[field] = typeof rule === 'function' ? 'Invalid input' : rule;
    }
  }
  return errors;
};

// A component to render a form with validation.
const FormValidator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Define the form rules.
  const rules: FormRules = {
    username: (value) => value.length > 0,
    email: (value) => /^[^@]+@[^@]+\.[a-zA-Z]{2,6}$/.test(value),
    password: (value) => value.length >= 8,
  };

  // Handle form field changes.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validateFormData(formData, rules);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with form submission logic.
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default FormValidator;