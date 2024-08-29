import React from 'react';
import { useParams } from 'react-router-dom';
import './Static.css'; // Your CSS file for styling

const Static = () => {
  const { page } = useParams();

  const renderContent = () => {
    switch (page) {
      case 'My account':
        return (
            <div className="page-content">
            <h1>My account</h1>
          </div>
        );
      case 'Privacy Policy':
        return (
          <div className="page-content">
            <h1>Privacy Policy</h1>
          </div>
        );
      case 'Track Your Order':
        return (
          <div className="page-content">
            <h1>Track Your Order</h1>
          </div>
        );
      case 'FAQs':
        return (
          <div className="page-content">
            <h1>FAQs</h1>
          </div>
        );
      case 'Payment Method':
        return (
          <div className="page-content">
            <h1>Payment Method</h1>
          </div>
        );
      case 'Shipping Guide':
        return (
          <div className="page-content">
            <h1>Shipping Guide</h1>
          </div>
        );
      case 'Product Support':
        return (
          <div className="page-content">
            <h1>Product Support</h1>
          </div>
        );
      case 'Gift Card Balance':
        return (
          <div className="page-content">
            <h1>Gift Card Balance</h1>
          </div>
        );
      case 'About us':
        return (
          <div className="page-content">
            <h1>About us</h1>
          </div>
        );
      case 'Our Guarantees':
        return (
          <div className="page-content">
            <h1>Our Guarantees</h1>
          </div>
        );
      case 'Terms and Conditions':
        return (
          <div className="page-content">
            <h1>Terms and Conditions</h1>
          </div>
        );
      case 'Return Policy':
        return (
          <div className="page-content">
            <h1>Return Policy</h1>
          </div>
        );
      case 'Delivery & Return':
        return (
          <div className="page-content">
            <h1>Delivery & Return</h1>
          </div>
        );
      case 'Sitemap':
        return (
          <div className="page-content">
            <h1>Sitemap</h1>
          </div>
        );
      default:
        return (
          <div className="page-content">
            <h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="consolidated-container">
      {renderContent()}
    </div>
  );
};

export default Static;
