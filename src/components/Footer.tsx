import React from 'react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  return (
    <footer 
      id="main-footer"
      className="bg-black border-t border-[#121215] text-gray-500 py-12 px-6 font-mono text-[10px] tracking-[0.12em]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
          <span className="text-gray-400 font-medium">GLOSSDETAIL © 2026</span>
          <span className="text-[#3a3a3e] hidden md:inline">|</span>
          <span className="text-[#8e8e93]">LAT: 3.1390° N, LON: 101.6869° E</span>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-gray-400 uppercase">
          <Link to="/" className="hover:text-white transition-all">HOME</Link>
          <span className="text-gray-700 font-normal">/</span>
          <Link to="/services" className="hover:text-white transition-all">PACKAGES</Link>
          <span className="text-gray-700 font-normal">/</span>
          <Link to="/booking" className="hover:text-white transition-all">BOOK APPOINTMENT</Link>
          <span className="text-gray-700 font-normal">/</span>
          <a href="mailto:ivanloong05@gmail.com" className="hover:text-white transition-all">CONTACT DIRECT</a>
        </div>
      </div>
    </footer>
  );
}
