const Footer = () => {
    return (
      <footer className="bg-black/40 border-t border-white/5 pt-16 pb-6">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <h3 className="text-primary text-2xl font-bold font-display mb-2">Himalayan Darjeeling Momos</h3>
            <p className="text-[#8B8B8B] mb-4">Nalasopara, Palghar</p>
            <p className="mt-4 italic text-accentYellow font-medium text-[1.05rem]">Managed by Kajal, Rohit & Sailendra</p>
          </div>
            <div className="flex flex-col md:items-end md:text-right gap-4">
              <a href="https://www.instagram.com/himalayan_darjeeling_momos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300">
                Follow Himalayan Darjeeling Momos on Instagram 📸
              </a>
              <div className="space-y-1">
                <p className="text-white/80"><i className='bx bx-phone text-accentYellow'></i> <a href="tel:+918471012563" className="hover:text-white transition">+91 84710 12563</a></p>
                <p className="text-white/80"><i className='bx bx-time-five text-accentYellow'></i> 11 AM – 11 PM (Daily)</p>
              </div>
              <div className="flex gap-4 mt-2 text-[1.8rem]">
              <a href="#" className="text-white/60 hover:text-white hover:-translate-y-1 transition"><i className='bx bxl-facebook-circle'></i></a>
              <a href="https://www.instagram.com/himalayan_darjeeling_momos" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white hover:-translate-y-1 transition"><i className='bx bxl-instagram-alt'></i></a>
              <a href="#" className="text-whatsapp hover:brightness-125 hover:-translate-y-1 transition"><i className='bx bxl-whatsapp'></i></a>
            </div>
          </div>
        </div>
        <div className="text-center text-white/40 text-sm border-t border-white/5 pt-6">
          <p>&copy; 2026 Himalayan Darjeeling Momos. Built with ❤️ in React.</p>
        </div>
      </footer>
    );
  };
export default Footer;
