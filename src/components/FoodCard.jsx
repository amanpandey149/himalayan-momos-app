import React from 'react';

const FoodCard = ({ item, qty, addToCart, increaseQty, decreaseQty }) => {
  return (
    <div className="bg-bgCard rounded-3xl flex flex-col border border-white/5 transition-all duration-400 relative overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-white/15 group">
      {(item.bestSeller || item.popular) && (
        <div className={`absolute top-4 -right-8 ${item.popular ? 'bg-primary text-white' : 'bg-accentYellow text-black'} text-[0.75rem] leading-none font-extrabold py-2 px-9 uppercase rotate-45 z-10 shadow-lg`}>
          {item.popular ? 'Popular' : 'Best Seller'}
        </div>
      )}
      
      <div className="w-full h-56 overflow-hidden relative">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110" loading="lazy" />
      </div>
      
      <div className="p-6 flex flex-col gap-3 flex-grow">
        <div className="flex justify-between items-start">
          <div className="text-[1.35rem] font-bold text-white flex items-center">
            <div className={`food-badge ${item.veg ? 'veg' : 'non-veg'}`}></div>
            {item.name}
          </div>
        </div>
        <div className="text-2xl font-extrabold text-accentYellow">₹{item.price}</div>
        <p className="text-textSecondary text-[0.95rem] flex-grow leading-relaxed">{item.desc}</p>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed border-white/10">
          {qty === 0 ? (
            <button onClick={addToCart} className="w-full bg-white/5 text-white border border-white/10 py-2.5 px-5 rounded-full font-bold transition duration-200 flex items-center justify-center gap-2 hover:bg-primary hover:border-primary hover:shadow-[0_4px_15px_rgba(230,57,70,0.4)]">
              <i className='bx bx-plus'></i> Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between w-full bg-bgLight rounded-full p-1 border border-primary">
              <button onClick={decreaseQty} className="w-8 h-8 rounded-full flex justify-center items-center text-white hover:bg-white/10 transition-colors">
                <i className='bx bx-minus'></i>
              </button>
              <span className="font-bold w-6 text-center">{qty}</span>
              <button onClick={increaseQty} className="w-8 h-8 rounded-full flex justify-center items-center text-white hover:bg-white/10 transition-colors">
                <i className='bx bx-plus'></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FoodCard;
