import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import CartSidebar from "./components/CartSidebar";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import { menuData } from "./data/menuData";

function App() {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Momos");
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "");
  const [showLocationPopup, setShowLocationPopup] = useState(!localStorage.getItem("userLocation"));
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("momos_currentUser")); } catch(e) { return null; }
  });

  const handleLogout = () => {
    localStorage.removeItem("momos_currentUser");
    setCurrentUser(null);
  };

  const handleLoginSuccess = (user) => {
    localStorage.setItem("momos_currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    localStorage.setItem("userLocation", loc);
    setShowLocationPopup(false);
  };


  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".scroll-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isCheckout, activeCategory]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev[item.id];
      if (existing) {
        return { ...prev, [item.id]: { ...existing, quantity: existing.quantity + 1 } };
      }
      return { ...prev, [item.id]: { item, quantity: 1 } };
    });
    // Trigger little bounce on cart button conceptually
  };

  const increaseQty = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: prev[id].quantity + 1 }
    }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id].quantity > 1) {
        newCart[id].quantity -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  const totalPrice = Object.values(cart).reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.item.price, 0);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-bgDark bg-[url('https://images.unsplash.com/photo-1541529086526-db283c563270')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <AuthModal 
          close={null} 
          onLoginSuccess={handleLoginSuccess} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans">
      <Navbar 
        currentUser={currentUser} 
        onLogoutClick={handleLogout} 
      />

      {!isCheckout ? (
        <>
          <Hero />
          
          <section className="py-20 px-4 md:px-8 bg-black/20" id="menu">
            <h2 className="text-center text-4xl font-extrabold mb-10 text-accentYellow relative pb-3 scroll-fade">
              Our Menu
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
            </h2>
            
            <div className="flex justify-center flex-wrap gap-4 mb-12 scroll-fade">
              {["Momos", "Rice", "Noodles", "Noodle Soup", "Combo"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full font-extrabold text-lg transition-all duration-300 ${activeCategory === cat ? "bg-primary text-white shadow-[0_4px_15px_rgba(230,57,70,0.4)]" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {activeCategory === "Momos" && (
              <>
                <Menu 
                  title="Veg Momos" 
                  items={menuData.vegMomos} 
                  cart={cart} 
                  addToCart={addToCart} 
                  increaseQty={increaseQty} 
                  decreaseQty={decreaseQty} 
                  isVeg={true}
                  id="momos-grid"
                />
                
                <Menu 
                  title="Non-Veg Momos" 
                  items={menuData.nonVegMomos} 
                  cart={cart} 
                  addToCart={addToCart} 
                  increaseQty={increaseQty} 
                  decreaseQty={decreaseQty} 
                  isVeg={false}
                />
              </>
            )}

            {activeCategory === "Rice" && (
              <Menu 
                title="Rice Items" 
                items={menuData.chinese.filter(item => item.name.toLowerCase().includes("rice"))} 
                cart={cart} 
                addToCart={addToCart} 
                increaseQty={increaseQty} 
                decreaseQty={decreaseQty}
                isVeg={true}
                id="rice-grid"
              />
            )}

            {activeCategory === "Noodles" && (
              <Menu 
                title="Noodles" 
                items={menuData.chinese.filter(item => item.name.toLowerCase().includes("noodles") || item.name.toLowerCase().includes("chawmining"))} 
                cart={cart} 
                addToCart={addToCart} 
                increaseQty={increaseQty} 
                decreaseQty={decreaseQty}
                isVeg={true}
                id="noodles-grid"
              />
            )}

            {activeCategory === "Noodle Soup" && (
              <Menu 
                title="Noodle Soup" 
                items={menuData.chinese.filter(item => item.name.toLowerCase().includes("thupka") || item.name.toLowerCase().includes("ramen"))} 
                cart={cart} 
                addToCart={addToCart} 
                increaseQty={increaseQty} 
                decreaseQty={decreaseQty}
                isVeg={true}
                id="soup-grid"
              />
            )}

            {activeCategory === "Combo" && (
              <Menu 
                title="Combos & Platters" 
                items={menuData.chinese.filter(item => item.name.toLowerCase().includes("platter") || item.name.toLowerCase().includes("combo") || item.name.toLowerCase().includes("triple"))} 
                cart={cart} 
                addToCart={addToCart} 
                increaseQty={increaseQty} 
                decreaseQty={decreaseQty}
                isVeg={true}
                id="combo-grid"
              />
            )}
          </section>

          {/* Floating cart button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-white text-3xl flex justify-center items-center shadow-[0_12px_30px_rgba(230,57,70,0.4)] z-50 hover:scale-110 transition-transform"
          >
            <i className='bx bx-cart'></i>
            <span className="absolute -top-1 -right-1 bg-accentYellow text-black text-sm font-extrabold w-6 h-6 rounded-full flex justify-center items-center shadow-md">
              {totalItems}
            </span>
          </button>
        </>
      ) : (
        <OrderForm 
          cart={cart} 
          totalPrice={totalPrice} 
          goBack={() => setIsCheckout(false)} 
          clearCart={() => setCart({})}
          location={location}
        />
      )}

      <CartSidebar 
        isOpen={isCartOpen} 
        close={() => setIsCartOpen(false)} 
        cart={cart} 
        totalPrice={totalPrice}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        proceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckout(true);
          window.scrollTo(0,0);
        }}
      />

      <Footer />

      {/* Location Selection Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[5000] flex items-center justify-center p-4">
          <div className="bg-bgCard border border-white/10 p-8 rounded-[2rem] max-w-md w-full text-center shadow-2xl animate-[fade_0.4s_ease]">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className='bx bx-map text-3xl text-primary'></i>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">Select Your Location</h2>
            <p className="text-[#8B8B8B] mb-8">We only deliver in Nalasopara, Virar & Vasai</p>
            <div className="flex flex-col gap-3">
              {["Nalasopara", "Virar", "Vasai"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocationSelect(loc)}
                  className="w-full py-4 bg-white/5 hover:bg-primary text-white font-bold rounded-xl border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <i className='bx bx-navigation text-xl'></i> {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
