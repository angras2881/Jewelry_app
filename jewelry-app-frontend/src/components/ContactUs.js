import React from 'react';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, feedback, or need help, please reach out to us.</p>

      <form className="contact-form">
        <label>Name:</label>
        <input type="text" placeholder="Your name" />

        <label>Email:</label>
        <input type="email" placeholder="Your email" />

        <label>Message:</label>
        <textarea rows="4" placeholder="Your message"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactUs;
