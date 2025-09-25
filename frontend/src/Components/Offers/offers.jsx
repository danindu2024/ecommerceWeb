import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './offers.css';
import Exclusive_img from '../Asserts/exclusive_image.png';

const Offers = () => {
  const navigate = useNavigate();

  const handleCheckNow = () => {
    navigate('/women'); // Navigate to /women page
    window.scrollTo(0, 0); // Scroll to top after navigation
  };

  return (
    <motion.section
      className="offers"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="offers-left"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Exclusive
        </motion.h1>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Offers For You
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 28px rgba(255,77,109,0.6)' }}
          onClick={handleCheckNow}
        >
          Check Now
        </motion.button>
      </motion.div>

      <motion.div
        className="offers-right"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <img src={Exclusive_img} alt="Exclusive Offer" />
      </motion.div>
    </motion.section>
  );
};

export default Offers;
