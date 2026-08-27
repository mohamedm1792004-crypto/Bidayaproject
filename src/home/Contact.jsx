import React from 'react'

function Contact() {
  return (
    <div>
        <section className="contact" id="contact">
  <div className="container">
    <div className="contact-grid">
      <div className="contact-content">
        <p className="text-label">Visit Our Atelier</p>
        <h2 className="heading-display contact-title">
          Experience Maison Dorée
        </h2>
        <p className="text-body contact-text">
          We invite you to visit our atelier for a personal consultation.
          Discover our collections in an intimate setting and work with our
          designers to create something truly unique.
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <p className="contact-item-label">Address</p>
            <p className="contact-item-value">
              742 Fifth Avenue, Suite 1200
              <br />
              New York, NY 10019
            </p>
          </div>
          <div className="contact-item">
            <p className="contact-item-label">Hours</p>
            <p className="contact-item-value">
              Tuesday – Saturday, 10:00 AM to 06:00 PM
              <br />
              Sunday – Monday, By Appointment
            </p>
          </div>
          <div className="contact-item">
            <p className="contact-item-label">Contact</p>
            <p className="contact-item-value">
              <a href="tel:+12125551234">+1 (212) 555-1234</a>
              <br />
              <a href="mailto:hello@maisondoree.com">hello@maisondoree.com</a>
            </p>
          </div>
        </div>
      </div>
      <div className="contact-form-wrapper">
        <h3 className="form-title">Request an Appointment</h3>
        <form id="appointmentForm">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              required=""
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              required=""
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number
            </label>
            <input type="tel" id="phone" name="phone" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Tell Us About Your Visit
            </label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Interested in a specific collection? Planning a custom piece?"
              defaultValue={""}
            />
          </div>
          <button type="submit" className="form-submit">
            Request Appointment
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Contact