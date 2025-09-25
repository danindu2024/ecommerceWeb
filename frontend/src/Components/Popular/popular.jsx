import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './popular.css';
import Item from '../Item/item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popularwomen')
      .then((res) => res.json())
      .then((data) => setPopularProducts(data))
      .catch((err) => console.error("Failed to fetch popular products:", err));
  }, []);

  return (
    <motion.section
      className="popular"
      id="popular-brands"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} // triggers once when 20% visible
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Popular Brands
      </motion.h1>

      <motion.hr
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ transformOrigin: 'center' }}
      />

      <motion.div
        className="popular-items"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        {popularProducts.map((item, i) => (
        <Item 
          key={i} 
          id={item.id} 
          image={item.image} 
          name={item.name} 
          new_price={item.new_price} 
          old_price={item.old_price}
          index={i}   // pass index for stagger
        />
      ))}
      </motion.div>
    </motion.section>
  );
};

export default Popular;
