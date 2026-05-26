import React from 'react';
import { Link } from '@tanstack/react-router';
import { PACKAGES } from '../data';
import { Shield, Sparkles, Clock, Compass, Layers, Check, HelpCircle } from 'lucide-react';

export default function Services() {
  return (
    <div id="services-view" className="bg-black text-white pt-24 md:pt-32 pb-24 px-6 font-mono">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="text-center md:text-left mb-16 border-b border-[#121215] pb-10">
          <span className="text-xs text-gray-400 tracking-[0.25em] uppercase block mb-3">GLOSSDETAIL COMPARATIVE CATALOGUE</span>
          <h1 className="font-sans font-medium text-3xl md:text-5xl tracking-[0.1em] text-white uppercase mb-4">
            DETAILING SERVICES
          </h1>
          <p className="text-gray-500 text-xs md:text-sm tracking-wide max-w-2xl leading-relaxed uppercase">
            A comprehensive overview of our specialized coating-safe maintenance washes, deep cleanings, and target chemical treatments formulated with elite brands including CarPro, Koch Chemie, and Bilt Hamber.
          </p>
        </div>

        {/* PACKAGE CARDS LIST (MOBILE SCROLL / DESKTOP ROW) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-20" id="packages-spec-cards">
          {PACKAGES.map((pkg, idx) => {
            const isFlatRate = pkg.prices.small === pkg.prices.suv;
            return (
              <div 
                key={pkg.id} 
                className="border border-[#1a1a1f] bg-[#08080a] flex flex-col justify-between hover:border-white/20 transition-all duration-300"
              >
                {/* Image & Header */}
                <div className="relative h-44">
                  <img 
                    src={pkg.imageUrl} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover opacity-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-black/40" />
                  <div className="absolute bottom-4 left-6">
                    <span className="text-[10px] bg-white text-black font-semibold tracking-widest px-2 py-0.5 uppercase">
                      LEVEL 0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-sans text-lg tracking-widest text-white uppercase mb-2 min-h-[56px] flex items-center">
                      {pkg.name}
                    </h2>
                    <p className="text-gray-400 text-xs tracking-wider leading-relaxed mb-6 uppercase min-h-[50px]">
                      {pkg.tagline}
                    </p>

                    {/* Products Used Tagging */}
                    <div className="mb-4 bg-zinc-950 p-3 border border-white/5">
                      <span className="text-[9px] text-gray-500 tracking-wider block mb-1 uppercase">PRODUCTS EMPLOYED:</span>
                      <span className="text-xs text-white uppercase tracking-wider font-semibold block">
                        {pkg.products.join(', ')}
                      </span>
                    </div>

                    <div className="border-t border-[#121215] pt-4 mb-6">
                      <span className="text-[10px] text-gray-500 tracking-wider block mb-3 uppercase">CORE INCLUDED STEPS:</span>
                      <ul className="space-y-2">
                        {pkg.benefits.slice(0, 5).map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start text-[11px] text-gray-300 tracking-wide leading-relaxed">
                            <Check className="h-3.5 w-3.5 text-white shrink-0 mr-2.5 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="border-t border-[#1a1a1f] pt-4 mt-4">
                    <span className="text-[10px] text-gray-500 tracking-widest uppercase block mb-2">SIZE-BASED PRICING TIER:</span>
                    
                    <div className="flex flex-col gap-1.5 text-[11px] mb-6">
                      {isFlatRate ? (
                        <div className="flex justify-between items-center py-1">
                          <span className="text-gray-400">Flat Rate (All Sizes)</span>
                          <span className="text-white font-bold text-sm">RM {pkg.prices.small}</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center border-b border-white/5 pb-1">
                            <span className="text-gray-400">Small (Axia/Myvi)</span>
                            <span className="text-white font-semibold">RM {pkg.prices.small}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/5 py-1">
                            <span className="text-gray-400">Medium (Vios/City)</span>
                            <span className="text-white font-semibold">RM {pkg.prices.medium}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-gray-400">SUV / 4x4</span>
                            <span className="text-white font-semibold">RM {pkg.prices.suv}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <Link 
                      to="/booking"
                      search={{ preselect: pkg.id }}
                      className="w-full block text-center bg-white text-black text-xs font-semibold py-3 hover:bg-gray-200 transition-all uppercase tracking-widest"
                    >
                      SELECT CONFIG
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARISON SPECIFICATION MATRIX */}
        <div className="border border-[#1a1a1f] bg-[#060608] overflow-hidden" id="spec-matrix-table">
          <div className="p-6 md:p-8 border-b border-[#1a1a1f] bg-black">
            <h3 className="font-sans text-lg tracking-widest uppercase text-white">TECHNICAL SPECIFICATION MATRIX</h3>
            <p className="text-[10px] text-gray-500 uppercase mt-1">Authorized molecular and machine grading metrics</p>
          </div>

          <div className="overflow-x-auto font-mono">
            <table className="w-full text-left min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-[#1a1a1f] text-[10px] text-gray-400 uppercase tracking-[0.16em] bg-black">
                  <th className="py-5 px-8 font-medium">SPECIFICATION PARAMETER</th>
                  {PACKAGES.map(pkg => (
                    <th key={pkg.id} className="py-5 px-8 font-medium">{pkg.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs tracking-wider divide-y divide-[#121215] text-gray-300">
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">PRODUCT BASE</td>
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} className="py-5 px-8 font-medium text-white">{pkg.specs.mainProduct}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">WASH METHODOLOGY</td>
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} className="py-5 px-8 text-gray-400">{pkg.specs.washType}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">CHEMICAL pH VALUE</td>
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} className="py-5 px-8 font-semibold text-gray-300">{pkg.specs.phLevel}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">TREATMENT SCOPE</td>
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} className="py-5 px-8 text-gray-400">{pkg.specs.treatmentScope}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">ESTIMATED DURATION</td>
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} className="py-5 px-8 text-gray-400">{pkg.duration}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">SMALL VEHICLE</td>
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} className="py-5 px-8 font-bold text-white">RM {pkg.prices.small}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">MEDIUM VEHICLE</td>
                  {PACKAGES.map(pkg => (
                    <td key={pkg.id} className="py-5 px-8 font-bold text-white">RM {pkg.prices.medium}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-5 px-8 font-semibold text-white uppercase tracking-widest bg-black/25">SUV / 4X4 VEHICLE</td>
                  {PACKAGES.map(pkg => {
                    const isFlat = pkg.prices.small === pkg.prices.suv;
                    return (
                      <td key={pkg.id} className="py-5 px-8 font-bold text-white">
                        {isFlat ? `RM ${pkg.prices.suv} (Flat)` : `RM ${pkg.prices.suv}`}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* VEHICLE SCALE POLICY WARNING */}
        <div className="mt-8 border border-white/10 p-6 bg-black flex items-start space-x-4 max-w-4xl">
          <HelpCircle className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
          <div className="text-[10px] text-gray-500 tracking-wide uppercase leading-relaxed">
            <strong className="text-white">VEHICLE TIER SPECIFICATIONS:</strong> All service quotes are explicitly structured based on standard Malaysian vehicle sizing factors:
            <ul className="mt-2 space-y-1 text-gray-400 list-disc list-inside">
              <li><strong className="text-white">Small:</strong> Axia, Myvi, Picanto, I10 size compacts.</li>
              <li><strong className="text-white">Medium:</strong> Vios, City, Almera, Civic size sedans & hatchbacks.</li>
              <li><strong className="text-white">SUV / 4x4:</strong> Honda CR-V, Proton X50/X70, Hilux, Fortuner, and large luxury tourers.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
