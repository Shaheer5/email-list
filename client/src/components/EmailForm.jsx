import React, { useState } from "react";
import "./EmailForm.css";
import validator from "validator";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Use validator to check if the email is valid
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validator.isEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isSubmitting) return; // prevent double clicks / DDOS attempts
      setIsSubmitting(true);
      try {
        setSubmitStatus({ submitted: true, success: false, message: "Sending..." });

        // Replace with your actual API endpoint
        const response = await fetch("https://email-list-server.vercel.app/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors",
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitStatus({
            submitted: true,
            success: true,
            message: "Thank you! Your message has been sent successfully.",
          });

          // Reset form
          setFormData({ name: "", email: "", message: "" });
        } else {
          throw new Error(data.message || "Something went wrong");
        }
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        setSubmitStatus({
          submitted: true,
          success: false,
          message: `Failed to send: ${error.message}`,
        });
      }
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Get in Touch</h2>
      <p className="form-subtitle">
        We'd love to hear from you. Fill out the form below and we'll get back to you soon.
      </p>

      {submitStatus.submitted && (
        <div className={`submit-message ${submitStatus.success ? "success" : "error"}`}>{submitStatus.message}</div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows="5"
            className={errors.message ? "error-input" : ""}
          ></textarea>
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {!isSubmitting ? "Submit" : "Submitting"}
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
