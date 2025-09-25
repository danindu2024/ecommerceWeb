import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './newCollections.css';
import Item from '../Item/item';

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollection')
      .then(res => res.json())
      .then(data => setNewCollection(data));
  }, []);

  return (
    <motion.section
      className="new-collections"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        NEW COLLECTIONS
      </motion.h1>
      <motion.hr
        initial={{ width: 0 }}
        whileInView={{ width: '180px' }}
        transition={{ duration: 0.6 }}
      />
      <div className="collections">
        {newCollection.map((item, index) => (
          <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            index={index} // for staggered motion
          />
        ))}
      </div>
    </motion.section>
  );
};

export default NewCollections;
