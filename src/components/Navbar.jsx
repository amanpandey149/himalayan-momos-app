const Navbar = ({ currentUser, onLoginClick, onLogoutClick }) => {
    return (
      <header className="fixed top-0 left-0 w-full py-4 px-6 md:px-12 flex justify-between items-center bg-bgDark/85 backdrop-blur-md z-[1000] border-b border-white/5">
        <div className="flex items-center gap-3 text-2xl font-extrabold text-accentYellow font-display">
          <i className='bx bxs-bowl-hot text-primary text-3xl'></i>
          <span className="hidden sm:inline">Himalayan Darjeeling Momos</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-textSecondary bg-white/5 py-2 px-4 rounded-full border border-white/10">
            <i className='bx bx-time-five'></i> 11 AM – 11 PM
          </div>
          
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white/80 hidden lg:inline">
                Hi, {currentUser.name || currentUser.email.split('@')[0]}
              </span>
              <button 
                onClick={onLogoutClick}
                className="bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-2 px-4 rounded-full border border-white/10 transition-colors flex items-center gap-2"
              >
                <i className='bx bx-log-out'></i> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-primary hover:brightness-110 text-white text-sm font-bold py-2 px-5 md:px-6 rounded-full border border-transparent shadow-[0_4px_15px_rgba(230,57,70,0.3)] transition-all flex items-center gap-2"
            >
              <i className='bx bx-user'></i> Login
            </button>
          )}
        </div>
      </header>
    );
  };
  export default Navbar;
