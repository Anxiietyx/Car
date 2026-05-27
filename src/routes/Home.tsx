import React from 'react';
import { motion } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { ArrowDown, CheckCircle2, Shield, Sparkles, Compass } from 'lucide-react';
import { PACKAGES } from '../data';

export default function Home() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('package-coating-safe-wash');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home-view" className="bg-black text-white relative">
      {/* SECTION 1: MASTER LANDING HERO */}
      <section 
        id="hero-master"
        className="relative h-screen flex flex-col justify-between items-center text-center px-6 pt-24 pb-12 overflow-hidden snap-start"
      >
        {/* Background Image with Dark Gradient Vignette */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
            alt="glossdetail Porsche 911 Detail"
            className="w-full h-full object-cover object-center opacity-65 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
        </div>


        {/* Center Logo & Taglines */}
        <div className="z-10 max-w-4xl flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-sans font-semibold text-4xl md:text-6xl lg:text-7xl tracking-[0.16em] text-white uppercase drop-shadow-xl select-none"
          >
            glossdetail.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mt-4 font-mono text-xs md:text-sm tracking-[0.2em] text-gray-300 uppercase"
          >
            Coating-Safe Maintenance Washes & Detailing Connoisseurs
          </motion.p>

          {/* Quick Technical Specs Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-x-8 md:gap-x-16 mt-12 border-t border-b border-white/20 py-4 max-w-lg w-full font-mono text-center"
          >
            <div>
              <div className="text-xl md:text-2xl font-bold tracking-tight">100%</div>
              <div className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mt-1">COATING SAFE</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold tracking-tight">RM 20</div>
              <div className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mt-1">ENTRY RATE</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold tracking-tight">PREMIUM</div>
              <div className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mt-1">CHEMICALS USED</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Booking & Arrow Prompts */}
        <div className="z-10 flex flex-col items-center space-y-8 w-full max-w-md px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link 
              to="/booking"
              className="bg-white text-black font-mono text-xs tracking-widest px-8 py-3.5 hover:bg-gray-200 transition-all text-center uppercase"
            >
              BOOK APPOINTMENT
            </Link>
            <Link 
              to="/services"
              className="bg-transparent border border-white text-white font-mono text-xs tracking-widest px-8 py-3.5 hover:bg-white hover:text-black transition-all text-center uppercase"
            >
             SERVICES
            </Link>
          </motion.div>

          <motion.button 
            onClick={handleScrollDown}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white hover:text-gray-400 transition-colors p-2 focus:outline-none"
            aria-label="Scroll to first package"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.button>
        </div>
      </section>

      {/* RENDER FULL-SCREEN SLIDES FOR EACH DETAILED PACKAGE */}
      {PACKAGES.map((pkg, idx) => {
        const isFlatRate = pkg.prices.small === pkg.prices.suv;
        const priceDisplay = isFlatRate 
          ? `RM ${pkg.prices.small} FLAT RATE` 
          : `RM ${pkg.prices.small} - RM ${pkg.prices.suv}`;

        return (
          <section
            key={pkg.id}
            id={`package-${pkg.id}`}
            className="relative h-screen flex flex-col justify-between items-center text-center px-6 pt-24 pb-16 overflow-hidden snap-start border-t border-[#121215]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={pkg.imageUrl}
                alt={pkg.name}
                className="w-full h-full object-cover object-center opacity-45 scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            </div>

            {/* Spec Subtitle Header */}
            <div className="z-10 font-mono text-[10px] tracking-[0.22em] text-gray-400 mt-4 uppercase">
              SPECIFICATION INDEX // 0{idx + 1} CORE SERVICES
            </div>

            {/* Core Description Area */}
            <div className="z-10 max-w-3xl px-4">
              <h2 className="font-sans font-medium text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] text-white uppercase">
                {pkg.name}
              </h2>
              <p className="mt-4 text-xs md:text-sm font-mono tracking-[0.15em] text-gray-350 max-w-xl mx-auto uppercase">
                {pkg.tagline}
              </p>

              {/* Technical Specifications Overlay Line */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-xs font-mono text-gray-400 uppercase tracking-widest border-t border-white/10 pt-4">
                <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-white" /> {pkg.specs.phLevel}</span>
                <span className="text-gray-600">/</span>
                <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-white" /> {pkg.specs.washType}</span>
                <span className="text-gray-600">/</span>
                <span className="flex items-center gap-2"><Compass className="h-3.5 w-3.5 text-white" /> {pkg.specs.mainProduct.split(' + ')[0]}</span>
              </div>
            </div>

            {/* Price & Action CTA */}
            <div className="z-10 w-full max-w-md px-4 flex flex-col items-center">
              <div className="mb-6 font-mono">
                <span className="text-[10px] text-gray-400 block tracking-widest uppercase mb-1">TIER PRICING SIZE MATRIX</span>
                <span className="text-3xl font-medium tracking-wide text-white">{priceDisplay}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link 
                  to="/booking"
                  search={{ preselect: pkg.id }}
                  className="bg-white text-black font-mono text-xs tracking-widest px-8 py-3.5 hover:bg-gray-200 transition-all text-center uppercase flex-1 rounded-none"
                >
                  SELECT & BOOK
                </Link>
                <Link 
                  to="/services"
                  className="bg-transparent border border-white text-white font-mono text-xs tracking-widest px-8 py-3.5 hover:bg-white hover:text-black transition-all text-center uppercase flex-1 rounded-none"
                >
                  FULL SHEET DETAIL
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* APEX METHODOLOGY CAROUSEL PREVIEW CARD */}
      <section 
        className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 py-24 bg-gradient-to-b from-[#060608] to-black border-t border-[#121215]"
        id="methodology-intro"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-mono text-xs text-gray-500 tracking-[0.25em] uppercase mb-4">GLOSSDETAIL PURITY PROTOCOLS</span>
          <h2 className="font-sans font-light text-2xl md:text-4xl tracking-[0.16em] uppercase">HOW WE REACH THE ABSOLUTE PINNACLE</h2>
          <div className="w-16 h-[1.5px] bg-white my-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 text-left max-w-5xl">
            <div className="border border-[#1a1a1f] p-8 bg-[#09090b] hover:border-white/30 transition-all duration-300">
              <span className="font-mono text-[11px] text-gray-400 block tracking-widest mb-4">PHASE 01 // PURIFY</span>
              <h4 className="font-sans text-lg tracking-wider text-white uppercase mb-2">Mechanical Claying</h4>
              <p className="font-mono text-xs text-gray-500 tracking-wide leading-relaxed">
                Industrial paint fallout, iron bits, and airborne rail dust are organically broken down and mechanically clayed before any machine polish begins.
              </p>
            </div>
            
            <div className="border border-[#1a1a1f] p-8 bg-[#09090b] hover:border-white/30 transition-all duration-300">
              <span className="font-mono text-[11px] text-gray-400 block tracking-widest mb-4">PHASE 02 // RE-LEVEL</span>
              <h4 className="font-sans text-lg tracking-wider text-white uppercase mb-2">Micro-Polishing</h4>
              <p className="font-mono text-xs text-gray-500 tracking-wide leading-relaxed">
                We measure clear coat depth via precise ultrasonic ultrasonic gauges to safely balance paint scratches and maximize gloss thickness with Italian-designed Rupes machinery.
              </p>
            </div>

            <div className="border border-[#1a1a1f] p-8 bg-[#09090b] hover:border-white/30 transition-all duration-300">
              <span className="font-mono text-[11px] text-gray-400 block tracking-widest mb-4">PHASE 03 // MOLECULE CROSS-LINK</span>
              <h4 className="font-sans text-lg tracking-wider text-white uppercase mb-2">Double Nanotechnology</h4>
              <p className="font-mono text-xs text-gray-500 tracking-wide leading-relaxed">
                Silica (SiO2) molecules are cross-linked onto the paint at a molecular level, curing into a hard glass-like crystalline armor that rejects water and chemical corrosion.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link 
              to="/services" 
              className="text-white hover:text-gray-300 font-mono text-xs tracking-[0.2em] border-b border-white hover:border-white/40 pb-2 transition-all uppercase"
            >
              LEARN ABOUT ALL CORE PROCESSES & FEATURES →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
