// Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import "./footer.css";
import Ig_icon from '../Asserts/instagram_icon.png';
import Whatsapp_icon from '../Asserts/whatsapp_icon.png';
import Pintester_icon from '../Asserts/pintester_icon.png';

const Footer = () => {
  const fadeUp = { 
    hidden: { opacity: 0, y: 30 }, 
    visible: { opacity: 1, y: 0 } 
  };

  return (
    <footer className="footer">
      <motion.div 
        className="footer-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {/* About Section */}
        <motion.div className="footer-section about" variants={fadeUp}>
          <h2>About Us</h2>
          <p>
            Shopper is your go-to online fashion hub bringing you the latest 
            trends for men, women, and kids. We focus on style, quality, and 
            affordability to keep you looking fresh every day.
          </p>
        </motion.div>

        {/* Customer Service */}
        <motion.div className="footer-section service" variants={fadeUp}>
          <h2>Customer Service</h2>
          <p>📦 Easy 7-day returns</p>
          <p>💳 Secure payment methods</p>
          <p>❓ FAQs available for quick help</p>
          <p>👩‍💻 24/7 support team</p>
        </motion.div>

        {/* Contact Section */}
        <motion.div className="footer-section contact" variants={fadeUp}>
          <h2>Contact Us</h2>
          <p>📍 123 Fashion Street, Colombo, Sri Lanka</p>
          <p>📞 +94 77 123 4567</p>
          <p>✉️ support@shopper.com</p>
        </motion.div>

        {/* Social Media */}
        <motion.div className="footer-section social" variants={fadeUp}>
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://www.instagram.com" target="blank"><img src={Ig_icon} alt="Instagram" /></a>
            <a href="https://www.whatsapp.com" target="blanck"><img src={Whatsapp_icon} alt="WhatsApp" /></a>
            <a href="https://www.pintester.com" target="blanck"><img src={Pintester_icon} alt="Pinterest" /></a>
          </div>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p>© {new Date().getFullYear()} Shopper. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
