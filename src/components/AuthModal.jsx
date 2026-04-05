import { useState } from "react";

const AuthModal = ({ close, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("momos_users")) || [];

    if (isLogin) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLoginSuccess(user);
        close();
      } else {
        setError("Invalid email or password.");
      }
    } else {
      const userExists = users.find(u => u.email === formData.email);
      if (userExists) {
        setError("User already exists with this email.");
      } else {
        const newUser = { name: formData.name, email: formData.email, password: formData.password };
        localStorage.setItem("momos_users", JSON.stringify([...users, newUser]));
        onLoginSuccess(newUser);
        close();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[6000] flex items-center justify-center p-4">
      <div className="bg-bgCard border border-white/10 p-8 rounded-[2rem] max-w-md w-full shadow-2xl animate-[fade_0.4s_ease] relative">
        {close && (
          <button 
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 bg-white/5 rounded-full flex justify-center items-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <i className='bx bx-x text-2xl'></i>
          </button>
        )}

        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className={`bx ${isLogin ? 'bx-log-in' : 'bx-user-plus'} text-3xl text-primary`}></i>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-[#8B8B8B] mb-8 text-center text-sm">
          {isLogin ? "Login to track your orders and fast checkout." : "Sign up for delicious momos directly to your door."}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-primary/20 border border-primary/50 rounded-lg text-primary text-sm font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide">Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full bg-bgDark text-white px-5 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-accentYellow focus:shadow-[0_0_15px_rgba(255,183,3,0.2)] transition" 
                placeholder="John Doe" 
              />
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full bg-bgDark text-white px-5 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-accentYellow focus:shadow-[0_0_15px_rgba(255,183,3,0.2)] transition" 
              placeholder="name@example.com" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              required 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="w-full bg-bgDark text-white px-5 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-accentYellow focus:shadow-[0_0_15px_rgba(255,183,3,0.2)] transition" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            className="mt-4 w-full bg-primary text-white font-bold text-lg py-3 rounded-xl shadow-[0_5px_15px_rgba(230,57,70,0.3)] hover:brightness-110 active:scale-95 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#8B8B8B]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-accentYellow hover:underline font-bold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
