import React from "react";

export default function Footer() {
  return (
    <div className="bg-main-light py-4">
      <div className="container">
        <h3 className="text-center mb-3">Get the FreshCart app</h3>
        <p className="text-center mb-3">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="d-lg-flex justify-content-between align-items-center border-bottom pb-4 text-center">
          <input
            type="email"
            className="form-control me-lg-3 me-md-0 mb-3 mb-md-0"
            placeholder="Enter your email"
          />
          <button className="btn bg-main text-white d-inline-block">Share App Link</button>
        </div>
        <div className="d-lg-flex justify-content-center align-items-center mb-3 border-bottom gap-lg-5">
          <div className="Payment-logo py-3 text-center">
            <p className="fw-bold mb-3">Payment Partners</p>
            <div className="d-flex justify-content-center align-items-center">
              <i className="fab fa-cc-visa fa-2x mx-2"></i>
              <i className="fab fa-cc-mastercard fa-2x mx-2"></i>
              <i className="fab fa-cc-amazon-pay fa-2x mx-2"></i>
              <i className="fab fa-paypal fa-2x mx-2"></i>
            </div>
          </div>
          <div className="app-logo py-3 text-center">
            <p className="fw-bold mb-3">Get deliveries with FreshCart</p>
            <div className="d-flex justify-content-center align-items-center">
              <i className="fab fa-google-play fa-2x mx-2"></i>
              <i className="fab fa-apple fa-2x mx-2"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
