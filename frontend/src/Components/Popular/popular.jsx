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
    <section className="popular" id="popular-brands">
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

      <div className="popular-items">
        {popularProducts.map((item, i) => (
          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            index={i} // for staggered motion inside Item
          />
        ))}
      </div>
    </section>
  );
};

export default Popular;
