const CartSidebar = ({ isOpen, close, cart, totalPrice, increaseQty, decreaseQty, proceedToCheckout }) => {
  const cartItems = Object.values(cart);
  
  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={close}></div>
      <div className={`fixed top-0 right-0 h-full w-[400px] max-w-full bg-bgCard z-[2001] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'translate-x-0' : 'translate-x-[110%]'}`}>
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-bgDark">
          <h2 className="text-2xl font-bold text-accentYellow flex items-center gap-2">
            <i className='bx bx-shopping-bag'></i> Your Order
          </h2>
          <button onClick={close} className="text-3xl text-textSecondary hover:text-primary transition-colors hover:rotate-90">
            <i className='bx bx-x'></i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-textSecondary mt-10">
              <i className='bx bx-cart text-6xl mb-4 opacity-50'></i>
              <p>Your cart is empty.</p>
              <button onClick={close} className="mt-6 text-primary underline">Browse Menu</button>
            </div>
          ) : (
            cartItems.map(({ item, quantity }) => (
              <div key={item.id} className="flex gap-4 p-4 bg-bgLight rounded-2xl border border-white/5 relative">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-[1.1rem] font-bold text-white leading-tight mb-2">{item.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-accentYellow font-extrabold pb-0.5">₹{item.price * quantity}</span>
                    <div className="flex items-center gap-3 bg-bgCard rounded-full px-2 py-1 border border-white/5">
                      <button onClick={() => decreaseQty(item.id)} className="w-[26px] h-[26px] bg-white/5 rounded-full flex justify-center items-center hover:bg-white/10 text-[1.1rem]">
                        <i className={`bx ${quantity === 1 ? 'bx-trash text-primary' : 'bx-minus'}`}></i>
                      </button>
                      <span className="font-bold w-[20px] text-center text-[0.95rem]">{quantity}</span>
                      <button onClick={() => increaseQty(item.id)} className="w-[26px] h-[26px] bg-white/5 rounded-full flex justify-center items-center hover:bg-white/10 text-[1.1rem]">
                        <i className='bx bx-plus'></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-bgDark">
            <div className="flex justify-between items-center mb-6 text-[1.35rem] font-bold text-white">
              <span>Total Amount:</span>
              <span className="text-accentYellow text-2xl drop-shadow-[0_0_5px_rgba(255,183,3,0.5)]">₹{totalPrice}</span>
            </div>
            <button onClick={proceedToCheckout} className="relative group w-full font-bold text-lg py-4 rounded-xl shadow-[0_4px_15px_rgba(230,57,70,0.3)] transition-all overflow-hidden duration-300">
              <div className="absolute inset-0 bg-primary group-hover:bg-primaryHover transition-colors"></div>
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] rotate-[45deg] group-hover:duration-75"></div>
              <span className="relative z-10 text-white flex items-center justify-center gap-2">
                Proceed to Order <i className='bx bx-right-arrow-alt text-2xl'></i>
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default CartSidebar;
