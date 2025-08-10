// 代码生成时间: 2025-08-10 15:50:37
import React, { useState } from 'react';

type FormValues = {
  name: string;
  email: string;
  age: string;
};

// Validates the form data
const validateFormData = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!values.age.trim()) {
    errors.age = 'Age is required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Age must be a number';
  } else if (Number(values.age) < 18 || Number(values.age) > 99) {
    errors.age = 'Age must be between 18 and 99';
  }
  
  return errors;
};

interface FormValidatorProps {
  // Props interface (if any)
};

const FormValidator: React.FC<FormValidatorProps> = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    age: '',
  });
  
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateFormData(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle submission
      console.log('Form data is valid:', formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormValidator;
