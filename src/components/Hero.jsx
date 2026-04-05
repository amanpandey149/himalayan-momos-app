const Hero = () => {
    return (
      <section className="min-h-screen pt-32 pb-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden" id="home">
        <div className="absolute top-[10%] left-[-15%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(230,57,70,0.15)_0%,rgba(18,18,18,0)_70%)] rounded-full -z-10"></div>
        
        <div className="flex-1 max-w-[650px] z-10 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
            Order Delicious Momos<br/><span className="text-2xl md:text-3xl text-textSecondary font-medium">& Chinese Online</span>
          </h1>
          <p className="text-xl md:text-2xl text-accentYellow font-semibold mb-8 tracking-wide">
            Hot, fresh, and delivered fast in Nalasopara
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
            <a href="#menu" className="inline-flex items-center justify-center gap-2 py-3.5 px-7 text-base font-bold rounded-full uppercase tracking-wide transition duration-300 bg-primary text-white hover:bg-primaryHover shadow-[0_6px_20px_rgba(230,57,70,0.35)] hover:shadow-[0_12px_40px_rgba(230,57,70,0.3)] hover:-translate-y-1">
              <i className='bx bx-restaurant'></i> Order Now
            </a>
            <a href="tel:+918471012563" className="inline-flex items-center justify-center gap-2 py-3.5 px-7 text-base font-bold rounded-full uppercase tracking-wide transition duration-300 bg-transparent text-accentYellow border-2 border-accentYellow hover:bg-accentYellow/10 hover:-translate-y-1">
              <i className='bx bx-phone-call'></i> Call Now
            </a>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-center relative z-10">
          <img 
            src="/banner.png" 
            alt="Delicious Momos" 
            className="w-full max-w-[600px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] object-cover animate-floating border border-white/5" 
            loading="lazy" 
          />
        </div>
      </section>
    );
  };
  export default Hero;
