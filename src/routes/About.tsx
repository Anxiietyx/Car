import React from 'react';
import { Shield, Hammer, MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

export default function About() {
  const FAQ_ITEMS = [
    {
      q: 'WHAT IS THE TIME FRAME FOR A MAINTENANCE WASH OR INTERIOR DETAILED CLEAN?',
      a: 'Our Coating-Safe Maintenance Wash generally takes 45 to 60 minutes. Basic Interior Cleaning takes approximately 1 to 1.5 hours, whereas our Signature Wash & Protect requires 2 to 3 hours as it involves deep chemical and mechanical clearcoat decontamination.'
    },
    {
      q: 'HOW DO YOU VALIDATE THAT THE PRODUCTS USED ARE SAFE FOR COATINGS?',
      a: 'We use high-grade CarPro Reset shampoo which is formulated with an ultra-slick pH-neutral composition to lift dirt particles without leaving custom waxes or wax-degrading salts. This ensures that previous Ceramic coatings stay 100% active and preserved.'
    },
    {
      q: 'WHAT BRANDS DO YOU UTILIZE IN YOUR SIGNATURE PROTECTION SUITE?',
      a: 'For our Signature protection solutions, we apply top-tier international formulations: Bilt Hamber for deep iron fallout & chemical decontamination, Koch Chemie GS for precision cleaning, CarPro Perl for matte cabin & tire shielding, and Turtle Wax to finalize of high hydrophobic paint beads.'
    },
    {
      q: 'DO I HAVE TO DISBURSE PAYMENT DURING CONFIGURATION?',
      a: 'No transaction or credit card details are requested in our booking workflow. Your select inputs reserve the hours on our service calendar. We will verify your car model scale (Axia/Myvi, Vios/City, or SUV/4x4) and finalize the booking directly upon check-in at the outlet.'
    }
  ];

  return (
    <div id="about-view" className="bg-black text-white pt-24 md:pt-32 pb-24 px-6 font-mono">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="text-center md:text-left mb-16 border-b border-[#121215] pb-10">
          <span className="text-xs text-gray-400 tracking-[0.25em] uppercase block mb-3">STUDIO PROFILE COORDINATES</span>
          <h1 className="font-sans font-medium text-3xl md:text-5xl tracking-[0.1em] text-white uppercase mb-4">
            STUDIO CORE
          </h1>
          <p className="text-gray-500 text-xs md:text-sm tracking-wide max-w-2xl leading-relaxed uppercase">
            A meticulously managed studio engineered for immaculate vehicle maintenance washes, paint decontamination, full engine bay treatments, and cabin detailing.
          </p>
        </div>

        {/* 2-COLUMN SPLIT: PHOTOS & CORE OBJECTIVE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs text-gray-400 tracking-widest uppercase block border-l-2 border-white pl-3">
              ESTABLISHED // ZERO DEFECT TARGET
            </span>
            <h2 className="font-sans text-2xl md:text-3xl tracking-widest text-white uppercase leading-normal">
              COATING PRESERVATION, DEEP METALLIC REFLECTIONS.
            </h2>
            <p className="text-xs text-gray-400 tracking-wider leading-relaxed uppercase">
              glossdetail. does not believe in rushed, automated tunnels or harsh chemical washes. We process every car with soft microfiber multi-bucket techniques and pristine product catalogs like CarPro and Koch Chemie. We maintain previous nano-wax and ceramic shell integrity to keep clearcoats glossier for longer.
            </p>
            <p className="text-xs tracking-wider leading-relaxed uppercase text-gray-500">
              Each vehicle is customized according to its precise scale factor: Small agile platforms (Axia, Myvi), Medium scale tourers (Vios, City), or spacious SUV / 4x4 cabins. All products are selected with optimal safety thresholds to deliver pristine car hygiene.
            </p>
          </div>

          <div className="relative h-96 border border-[#1a1a1f] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop" 
              alt="glossdetail Clean Studio"
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          </div>
        </div>

        {/* TECHNICAL COMPOUND SPECIFICATIONS GRID */}
         <div className="mb-24 border-t border-b border-[#1a1a1f] py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-5 w-5 text-white" />
                <h4 className="font-sans text-sm tracking-widest text-white uppercase font-bold">100% COATING SAFE</h4>
              </div>
              <p className="text-[11px] text-gray-400 tracking-wider leading-relaxed uppercase">
                Using pure pH-neutral compounds protects existing high-end ceramic membranes, guarding hydrophobic properties and paint-clash structures.
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Hammer className="h-5 w-5 text-white" />
                <h4 className="font-sans text-sm tracking-widest text-white uppercase font-bold">PREMIUM FORMULATIONS</h4>
              </div>
              <p className="text-[11px] text-gray-400 tracking-wider leading-relaxed uppercase">
                We strictly deploy world-renowned products including CarPro Reset, Koch Chemie GS, Bilt Hamber active reagents, and premium dressings.
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-5 w-5 text-white" />
                <h4 className="font-sans text-sm tracking-widest text-white uppercase font-bold">DYNAMIC SERVICE TIMECARDS</h4>
              </div>
              <p className="text-[11px] text-gray-400 tracking-wider leading-relaxed uppercase">
                Our team allocates focused, unhurried attention to each appointment slot, guaranteeing zero residue wash guidelines on every vehicle crease.
              </p>
            </div>
          </div>
         </div>

         {/* STUDIO COORDINATES & LOCATIONS */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24" id="studio-coordinates">
            <div className="border border-[#1a1a1f] p-8 bg-[#060608]">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-4 w-4 text-white" />
                <h3 className="font-sans text-xs tracking-widest text-white uppercase font-semibold">HQ OUTLET ADDR</h3>
              </div>
              <p className="text-xs text-white uppercase tracking-wider mb-2">glossdetail. HQ OUTLET</p>
              <p className="text-xs text-gray-400 tracking-wider uppercase leading-relaxed">
                LOT 23, JALAN UTAMA 2/1<br />
                BANDAR UTAMA, PETALING JAYA<br />
                47800 SELANGOR, MALAYSIA
              </p>
            </div>

            <div className="border border-[#1a1a1f] p-8 bg-[#060608]">
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="h-4 w-4 text-white" />
                <h3 className="font-sans text-xs tracking-widest text-white uppercase font-semibold">COMMS DIRECT</h3>
              </div>
              <p className="text-xs text-white uppercase tracking-wider mb-2">RESERVATION MANAGEMENT</p>
              <p className="text-xs text-gray-400 tracking-wider uppercase mb-1">TELEPHONE: +60 3-7728 9090</p>
              <p className="text-xs text-gray-400 tracking-wider uppercase">SUPPORT: ivanloong05@gmail.com</p>
            </div>

            <div className="border border-[#1a1a1f] p-8 bg-[#060608]">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-4 w-4 text-white" />
                <h3 className="font-sans text-xs tracking-widest text-white uppercase font-semibold">STUDIO HOURS</h3>
              </div>
              <p className="text-xs text-white uppercase tracking-wider mb-2">OPERATIONAL STATUS</p>
              <p className="text-xs text-gray-400 tracking-wider uppercase leading-relaxed">
                DAILY WASHEs: MON - SAT // 09:00 - 19:30<br />
                FULL DETAILEs: SUNDAY // 10:00 - 17:00<br />
                HOLIDAY RESET: PLANNED ANNOUNCEMENTS
              </p>
            </div>
          </div>

         {/* Q&A FREQUENT SYSTEM QUERIES */}
         <div id="studio-faq" className="border border-[#1a1a1f] bg-[#060608] p-8 md:p-12 mb-10">
           <div className="flex items-center space-x-3 mb-10 pb-4 border-b border-[#121215]">
             <HelpCircle className="h-5 w-5 text-white" />
             <h3 className="font-sans text-lg tracking-widest text-white uppercase">FREQUENT STUDIO QUERIES</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {FAQ_ITEMS.map((item, idx) => (
               <div key={idx} className="space-y-3">
                 <h4 className="text-xs text-white uppercase tracking-widest font-bold leading-normal">
                   {idx + 1}. {item.q}
                 </h4>
                 <p className="text-[11px] text-gray-400 tracking-wider leading-relaxed uppercase">
                   {item.a}
                 </p>
               </div>
             ))}
           </div>
         </div>

      </div>
    </div>
  );
}
