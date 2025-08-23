// 代码生成时间: 2025-08-23 19:35:54
import React, { useState } from 'react';

// Define a type for the form data
interface IFormData {
  name: string;
  email: string;
  age: number;
}

// Define a type for the form errors
interface IFormErrors {
  name?: string;
  email?: string;
  age?: string;
}

// Define a function to validate form data
function validateFormData(data: IFormData): IFormErrors {
  const errors: IFormErrors = {};

  // Validate name
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  // Validate email
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Validate age
  if (data.age < 0 || data.age > 130) {
    errors.age = 'Age must be between 0 and 130';
  }

  return errors;
}

// The FormValidator component
const FormValidator: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({ name: '', email: '', age: 0 });
  const [formErrors, setFormErrors] = useState<IFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
    } else {
      // Form is valid, submit data
      console.log('Form data:', formData);
      // Reset form or handle submission
      setFormData({ name: '', email: '', age: 0 });
      setFormErrors({});
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {formErrors.name && <p>{formErrors.name}</p>}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {formErrors.email && <p>{formErrors.email}</p>}

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      {formErrors.age && <p>{formErrors.age}</p>}

      <button type="submit" disabled={isSubmitting}>Submit</button>
    </form>
  );
};

export default FormValidator;