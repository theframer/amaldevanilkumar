import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    option: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.option.trim()) newErrors.option = "Please select an option";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If valid, append to data.json using a simple API or local write simulation (see note below)
    try {
      await fetch('/data.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert('Form submitted!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Could not save. This simulation needs a backend or dev server.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="error">{errors.name}</small>}

          <input 
            type="email" 
            name="email" 
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <select 
            name="option"
            value={formData.option}
            onChange={handleChange}
          >
            <option value="">Select a reason</option>
            <option>Zoho Consulting/Strategy Call</option>
            <option>Networking / Collaboration</option>
            <option>Zoho Support & Troubleshooting</option>
            <option>Training & Workshops</option>
            <option>Project Inquiry</option>
            <option>Quotation / Pricing Request</option>
            <option>Partnership</option>
            <option>Opportunities</option>
            <option>General Inquiry</option>
          </select>
          {errors.option && <small className="error">{errors.option}</small>}

          <textarea 
            name="description" 
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
