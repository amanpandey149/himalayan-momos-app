import React from 'react';
import FoodCard from "./FoodCard";

const Menu = ({ title, items, cart, addToCart, increaseQty, decreaseQty, isVeg, id }) => {
  return (
    <div className="mb-20 scroll-fade" id={id}>
      <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white border-b border-white/10 pb-4">
        <div className={`food-badge ${isVeg ? 'veg' : 'non-veg'}`}></div>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => (
          <FoodCard 
            key={item.id} 
            item={item} 
            qty={cart[item.id] ? cart[item.id].quantity : 0} 
            addToCart={() => addToCart(item)}
            increaseQty={() => increaseQty(item.id)}
            decreaseQty={() => decreaseQty(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default Menu;
