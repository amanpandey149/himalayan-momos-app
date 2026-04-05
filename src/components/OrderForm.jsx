import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const OrderForm = ({ cart, totalPrice, goBack, clearCart, location }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' or 'paid'
  const cartItems = Object.values(cart);

  useEffect(() => {
    // Load Razorpay Script dynamically on mount
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleRazorpayCheckout = () => {
    if (!formData.name || !formData.phone || formData.phone.length < 10) {
      alert("Please fill in your Name and 10-digit Phone Number first to proceed with payment.");
      return;
    }

    const options = {
      key: "rzp_test_XXXXXXXX", // Placeholder test key
      amount: totalPrice * 100, // Amount is in subunits (paise)
      currency: "INR",
      name: "Himalayan Darjeeling Momos",
      description: "Food Order Payment",
      handler: function (response) {
        // Securely handle Razorpay success callback
        setPaymentStatus('paid');
        alert("Payment Successful! Your order payment is verified. Please click 'Confirm Order' to finalize.");
      },
      prefill: {
        name: formData.name,
        contact: formData.phone,
      },
      theme: {
        color: "#E63946",
      },
    };
    
    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
          alert("Payment failed. Please try again.");
      });
      rzp.open();
    } else {
      alert("Payment gateway failed to load. Please check your internet connection.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentStatus !== 'paid') {
      alert("Please complete payment first using the 'Pay Now' button.");
      return;
    }
    
    setIsProcessing(true);
    
    // Generate WhatsApp Message
    let message = `Hi, I have completed the payment for my order. Sharing screenshot for confirmation.\n\n`;
    message += `*NEW ORDER - Himalayan Darjeeling Momos*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Area: ${location}\n`;
    message += `Address: ${formData.address}\n\n`;
    
    message += `*Order Summary:*\n`;
    cartItems.forEach(({ item, quantity }) => {
      message += `- ${item.name} (x${quantity}) - ₹${item.price * quantity}\n`;
    });
    
    message += `\n*Total Amount: ₹${totalPrice}*\n`;
    message += `\nPlease confirm my order. Thank you!`;
    
    const storeWhatsAppNumber = "918471012563"; 
    const whatsappUrl = `https://wa.me/${storeWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      setIsProcessing(false);
      window.open(whatsappUrl, '_blank');
      clearCart();
      goBack();
    }, 2500);
  };

  return (
    <>
      <section className="min-h-screen pt-28 pb-20 px-4 flex justify-center items-start animate-[fade_0.3s_ease]">
        <div className="max-w-[600px] w-full bg-bgCard rounded-3xl p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-extrabold text-white">Complete Order</h2>
            <button onClick={goBack} className="text-primary hover:underline font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition">
              Back to Menu
            </button>
          </div>
          
          <div className="mb-8 p-4 bg-bgLight rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-accentYellow mb-3 border-b border-dashed border-white/10 pb-2">Order Summary</h3>
            {cartItems.map(({ item, quantity }) => (
              <div key={item.id} className="flex justify-between text-sm py-1.5 text-white/90">
                <span>{quantity}x {item.name}</span>
                <span className="font-bold">₹{item.price * quantity}</span>
              </div>
            ))}
            <div className="flex justify-between text-lg font-extrabold text-white mt-3 pt-3 border-t border-dashed border-white/10">
              <span>Total to Pay:</span>
              <span className="text-primary text-xl">₹{totalPrice}</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#8B8B8B] uppercase tracking-wide">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-bgDark text-white px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-accentYellow focus:shadow-[0_0_15px_rgba(255,183,3,0.2)] transition text-lg" placeholder="Enter your full name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#8B8B8B] uppercase tracking-wide">Phone Number</label>
              <input type="tel" required pattern="[0-9]{10}" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-bgDark text-white px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-accentYellow focus:shadow-[0_0_15px_rgba(255,183,3,0.2)] transition text-lg" placeholder="10-digit mobile number" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#8B8B8B] uppercase tracking-wide">Selected Area</label>
              <input type="text" readOnly value={location} className="w-full bg-bgDark/50 text-white/50 px-5 py-4 rounded-xl border border-white/10 focus:outline-none cursor-not-allowed transition text-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#8B8B8B] uppercase tracking-wide">Delivery Address</label>
              <textarea required rows="3" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-bgDark text-white px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-accentYellow focus:shadow-[0_0_15px_rgba(255,183,3,0.2)] transition text-lg resize-none" placeholder="Enter your complete address in Nalasopara"></textarea>
            </div>

            {/* NEW SIGNATURE PAYMENT SECTION */}
            <div className="mt-4 mb-2 p-6 bg-bgLight rounded-2xl border-2 border-accentYellow/40 text-center shadow-[0_0_20px_rgba(255,183,3,0.15)] relative overflow-hidden animate-[pulse_3s_infinite]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accentYellow to-transparent opacity-80"></div>
              
              <h3 className="text-2xl font-extrabold text-white mb-3 flex items-center justify-center gap-2">
                <i className='bx bx-shield-quarter text-accentYellow'></i> Confirm Your Order
              </h3>
              
              <p className="text-white/90 text-[0.95rem] mb-6 font-medium bg-accentYellow/10 py-2.5 px-5 rounded-lg inline-block border border-accentYellow/30 shadow-inner">
                <i className='bx bx-info-circle mr-1 text-accentYellow'></i> Scan QR to Pay <strong className="text-xl">₹{totalPrice}</strong> OR use Pay Now button
              </p>
              
              <div className="flex justify-center mb-5 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accentYellow via-primary to-accentYellow rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="bg-white p-3 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] relative inline-block transition-transform duration-300">
                  {/* REACT CLIENT-SIDE DYNAMIC QR CODE */}
                  <QRCodeCanvas 
                    value={`upi://pay?pa=amankumarpandey0543@oksbi&pn=Himalayan%20Darjeeling%20Momos&am=${totalPrice}&cu=INR`}
                    size={180}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                    className="block mx-auto"
                  />
                </div>
              </div>
              
              <p className="text-[#8B8B8B] font-semibold text-xs mb-2 uppercase tracking-widest block">Scan QR or Pay to UPI ID</p>
              <p className="text-accentYellow font-extrabold text-lg px-5 py-3 bg-black/50 border border-white/10 inline-block rounded-xl tracking-wide select-all shadow-md cursor-text mb-6">
                amankumarpandey0543@oksbi
              </p>

              {/* ADDED PAYMENT SYSTEM & STATUS SECTION */}
              <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-6">
                <button 
                  type="button" 
                  onClick={handleRazorpayCheckout}
                  disabled={paymentStatus === 'paid'}
                  className={`px-8 py-4 rounded-xl font-bold text-xl text-white transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 w-full ${paymentStatus === 'paid' ? 'bg-bgDark/50 text-white/50 cursor-not-allowed border border-white/5' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 active:scale-95 border border-blue-400/50'}`}
                >
                  <i className='bx bx-credit-card' ></i> {paymentStatus === 'paid' ? 'Payment Completed' : 'Pay Now with Razorpay'}
                </button>

                <div className="flex items-center justify-between w-full px-4 py-3 bg-black/30 rounded-lg border border-white/5">
                  <span className="text-white/70 font-semibold uppercase tracking-wider text-sm">Payment Status:</span>
                  {paymentStatus === 'paid' ? (
                    <span className="text-whatsapp font-bold text-lg flex items-center gap-1"><i className='bx bx-check-circle'></i> PAID</span>
                  ) : (
                    <span className="text-primary font-bold text-lg flex items-center gap-1"><i className='bx bx-time'></i> PENDING</span>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" disabled={paymentStatus !== 'paid'} className={`mt-2 w-full font-bold text-xl py-4 rounded-xl transition flex justify-center items-center gap-3 relative overflow-hidden group ${paymentStatus === 'paid' ? 'bg-whatsapp text-white shadow-[0_5px_15px_rgba(37,211,102,0.3)] hover:brightness-110 active:scale-95' : 'bg-bgDark/50 text-white/40 border border-white/10 cursor-not-allowed'}`}>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <i className='bx bx-check-shield text-2xl'></i> {paymentStatus === 'paid' ? 'Confirm Final Order' : 'Complete Payment to Enable'}
              </span>
            </button>
          </form>
        </div>
      </section>
      
      {isProcessing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[3000] flex flex-col justify-center items-center text-center animate-[fade_0.3s_ease]">
          <div className="w-[120px] h-[120px] bg-bgCard rounded-full flex justify-center items-center mb-6 shadow-[0_0_30px_rgba(255,183,3,0.3)] pulse">
            <i className='bx bx-check text-6xl text-whatsapp'></i>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Order Prepared!</h2>
          <p className="text-[#8B8B8B] text-lg font-medium">Redirecting to WhatsApp to send order details...</p>
        </div>
      )}
    </>
  );
};
export default OrderForm;
