import React, { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Let transparent background glow or fade to dark depending on scroll position or route
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use transparent on home page unless scrolled; on other pages use rich solid dark
  const isHome = currentPath === '/';
  const headerBg = isScrolled || !isHome 
    ? 'bg-black/90 border-b border-[#1c1c1e] backdrop-blur-md' 
    : 'bg-transparent';

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Sleek Starlink-inspired Wordmark */}
        <Link 
          to="/" 
          id="nav-logo"
          className="flex items-center space-x-2 text-white font-sans font-semibold tracking-[0.08em] text-lg hover:opacity-80 transition-opacity lowercase"
          onClick={() => setIsOpen(false)}
        >
          <span>glossdetail.</span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-xs font-mono tracking-[0.18em]" id="desktop-nav">
          <Link 
            to="/" 
            className={`text-white transition-all hover:text-gray-300 relative py-2 ${
              currentPath === '/' ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-white' : ''
            }`}
          >
            HOME
          </Link>
          <Link 
            to="/services" 
            className={`text-white transition-all hover:text-gray-300 relative py-2 ${
              currentPath === '/services' ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-white' : ''
            }`}
          >
            PACKAGES
          </Link>
          <Link 
            to="/about" 
            className={`text-white transition-all hover:text-gray-300 relative py-2 ${
              currentPath === '/about' ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-white' : ''
            }`}
          >
            STUDIO CORE
          </Link>
        </nav>

        {/* Right Action CTA Button */}
        <div className="hidden md:flex items-center">
          <Link 
            to="/booking"
            id="nav-cta-booking"
            className="border border-white/80 text-white font-mono text-[10px] tracking-[0.2em] px-5 py-2 hover:bg-white hover:text-black transition-all duration-300 rounded-none uppercase"
          >
            BOOK APPOINTMENT
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-300 focus:outline-none p-2"
            aria-label="Toggle navigation menu"
            id="mobile-nav-toggle"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Starlink full-screen overlay style) */}
      {isOpen && (
        <div 
          id="mobile-nav-drawer"
          className="md:hidden fixed inset-0 top-16 bg-black z-40 flex flex-col justify-between px-8 py-12 transition-all duration-300 ease-in-out border-t border-[#111]"
        >
          <div className="flex flex-col space-y-8">
            <Link
              to="/"
              className="text-white hover:text-gray-300 text-sm font-mono tracking-[0.2em] pb-3 border-b border-[#111]"
              onClick={() => setIsOpen(false)}
            >
              HOME VIEW
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-gray-300 text-sm font-mono tracking-[0.2em] pb-3 border-b border-[#111]"
              onClick={() => setIsOpen(false)}
            >
              SERVICE PACKAGES
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 text-sm font-mono tracking-[0.2em] pb-3 border-b border-[#111]"
              onClick={() => setIsOpen(false)}
            >
              STUDIO CORE
            </Link>
            <Link
              to="/booking"
              className="text-white hover:text-gray-300 text-sm font-mono tracking-[0.2em] pb-3 border-b border-[#111]"
              onClick={() => setIsOpen(false)}
            >
              BOOK APPOINTMENT
            </Link>
          </div>

          <div className="flex flex-col space-y-6 pt-6">
            <Link
              to="/booking"
              className="w-full text-center border border-white text-white font-mono text-xs tracking-[0.18em] py-3 uppercase hover:bg-white hover:text-black transition-all"
              onClick={() => setIsOpen(false)}
            >
              BOOK SESSION
            </Link>
            <div className="text-[10px] text-gray-500 font-mono tracking-wider text-center">
              GLOSSDETAIL // RESERVATIONS 2026
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
