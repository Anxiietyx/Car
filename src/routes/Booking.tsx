import React, { useState, useEffect } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { PACKAGES, ADD_ONS } from '../data';
import { BookingSubmission } from '../types';
import { 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  Check, 
  Plus, 
  Minus, 
  AlertTriangle 
} from 'lucide-react';

export default function Booking() {
  const navigate = useNavigate();

  // Try to parse preselect parameter safely from URL
  let preselectId = '';
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      preselectId = params.get('preselect') || '';
    }
  } catch (err) {
    console.warn('URL params parsing fallback initiated:', err);
  }

  // --- COMPONENT FORM STATE ---
  const [selectedPackageId, setSelectedPackageId] = useState<string>(() => {
    const valid = PACKAGES.some(p => p.id === preselectId);
    return valid ? preselectId : PACKAGES[0].id; // Default to first package (Coating-Safe Maintenance Wash)
  });

  const [vehicleSize, setVehicleSize] = useState<'small' | 'medium' | 'suv'>('small');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [bookingDate, setBookingDate] = useState<string>(() => {
    // Default to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState<string>('midday'); // morning, midday, afternoon
  
  // Contacts
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Dynamic values based on selections
  const currentPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  
  const basePrice = currentPackage.prices[vehicleSize];
  
  const addOnsCost = selectedAddOns.reduce((sum, addOnId) => {
    const option = ADD_ONS.find(a => a.id === addOnId);
    return sum + (option?.price || 0);
  }, 0);
  
  const totalPrice = basePrice + addOnsCost;

  // Toggle modular add ons
  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Client legal name is required.';
    
    if (!email.trim()) {
      newErrors.email = 'Secure contact email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Provide a valid digital mail coordinate syntax.';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Contact communication telephone is required.';
    }

    const selectedDate = new Date(bookingDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (!bookingDate) {
      newErrors.bookingDate = 'Calendar targeting coordinate is required.';
    } else if (selectedDate < today) {
      newErrors.bookingDate = 'Dates inside historic continuum are invalid.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- TANSTACK QUERY MUTATION TO POST BOOKING ---
  const bookingMutation = useMutation({
    mutationFn: async (payload: BookingSubmission & { packageName: string }) => {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Server network reject. Formula failed to write.');
      }

      return response.json();
    },
  });

  // Handle finalize checkout booking
  const handleFinalizeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const addOnNames = selectedAddOns.map(id => {
      const item = ADD_ONS.find(a => a.id === id);
      return item ? `${item.name} (+RM ${item.price})` : id;
    });

    const submissionPayload: BookingSubmission & { packageName: string } = {
      name,
      email,
      phone,
      packageId: selectedPackageId,
      packageName: currentPackage.name,
      vehicleSize,
      bookingDate,
      bookingTime,
      addOns: addOnNames,
      specialNotes: specialNotes.trim() || undefined,
      totalPrice,
    };

    bookingMutation.mutate(submissionPayload);
  };

  // SUCCESS SCREEN
  if (bookingMutation.isSuccess) {
    const responseData = bookingMutation.data;
    const orderId = responseData?.bookingId || `CDS-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
      <div className="bg-black text-white min-h-screen pt-24 md:pt-32 pb-24 px-6 font-mono flex flex-col items-center justify-center">
        <div id="booking-success-card" className="max-w-2xl w-full border border-[#1a1a1f] bg-[#060608] p-8 md:p-12 text-center relative overflow-hidden">
          {/* Ambient matrix accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-gray-500 to-white" />
          
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-white/10 p-4 border border-white/20 animate-pulse">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>

          <span className="text-[10px] text-[#8e8e93] tracking-[0.25em] block uppercase mb-2">DYNAMIC ORDER TRANSMISSION // ONLINE</span>
          <h1 className="font-sans font-medium text-2xl md:text-3xl tracking-[0.14em] text-white uppercase mb-4">
            RECON ORDER FORMULATED
          </h1>
          <p className="text-gray-400 text-xs tracking-wider mb-8 uppercase leading-relaxed max-w-lg mx-auto">
            Your custom car detailing system configuration has been formulated and recorded. We have transmitted the telemetry data payload to the studio HQ registry.
          </p>

          {/* Electronic Receipt */}
          <div className="border border-[#1a1a1f] bg-black p-6 md:p-8 text-left mb-8 max-w-md mx-auto space-y-4">
            <div className="flex justify-between border-b border-[#111] pb-3 text-[10px] text-gray-500 font-semibold tracking-widest">
              <span>CONFIG-ID / RECEIPT</span>
              <span className="text-white font-mono">{orderId}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">CLIENT:</span>
                <span className="text-white font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">SPEC RECON:</span>
                <span className="text-white font-medium">{currentPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">SCALE RANGE:</span>
                <span className="text-white font-medium uppercase">{vehicleSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">APPOINTMENT:</span>
                <span className="text-white font-medium">{new Date(bookingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">SLOT:</span>
                <span className="text-white font-medium uppercase">{bookingTime}</span>
              </div>
            </div>

            <div className="border-t border-[#111] pt-3 flex justify-between items-baseline font-bold">
              <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase font-mono">COMMITTED PRICE</span>
              <span className="text-lg text-white font-mono">RM {totalPrice}</span>
            </div>
          </div>

          <div className="text-[10px] text-gray-500 tracking-wide uppercase leading-relaxed max-w-md mx-auto mb-8">
            <strong className="text-white">COCKPIT DIRECTIVE:</strong> Look for a receipt confirmation directly in your email <strong className="text-white">({email})</strong> soon. If your SMTP credentials are not active in our development environment, check your workspace backend server logs to verify the email payload!
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                bookingMutation.reset();
                setName('');
                setEmail('');
                setPhone('');
                setSpecialNotes('');
                setSelectedAddOns([]);
                navigate({ to: '/' });
              }}
              className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-all"
            >
              BACK TO COMPLEX
            </button>
            <a 
              href="mailto:ivanloong05@gmail.com"
              className="px-8 py-3.5 bg-white text-black font-mono text-xs tracking-widest uppercase hover:bg-gray-200 transition-all text-center"
            >
              CLIENT HELPDESK
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="booking-view" className="bg-black text-white pt-24 md:pt-32 pb-24 px-6 font-mono">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Head Title */}
        <div className="text-center md:text-left mb-12 border-b border-[#121215] pb-10">
          <span className="text-xs text-gray-400 tracking-[0.25em] uppercase block mb-3">APEX COCKPIT INTERACTIVE</span>
          <h1 className="font-sans font-medium text-3xl md:text-5xl tracking-[0.1em] text-white uppercase mb-4">
            CHECKOUT DESIGNER
          </h1>
          <p className="text-gray-500 text-xs md:text-sm tracking-wide max-w-2xl leading-relaxed uppercase">
            Define your surface gloss defense level, identify target dimensional scale, schedule queue coordinates, and review secure order formulations.
          </p>
        </div>

        {/* LOADING ENGINE MASK */}
        {bookingMutation.isPending && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center px-6">
            <div className="max-w-md w-full border border-[#232329] bg-[#08080a] p-8 text-center space-y-6">
              <Activity className="h-10 w-10 text-white animate-spin mx-auto" />
              <div>
                <span className="text-[10px] text-gray-500 tracking-[0.25em] block uppercase mb-1">TRANSMITTING TELEMETRY</span>
                <span className="text-sm font-semibold text-white tracking-widest uppercase font-mono">FORMULATING COATING MATRIX</span>
              </div>
              <div className="w-full bg-neutral-900 h-1.5 overflow-hidden">
                <div className="bg-white h-full animate-[pulse_1s_infinite] w-3/4 mx-auto" />
              </div>
              <p className="text-[9px] text-gray-400 leading-relaxed uppercase font-mono">
                Initiating clean-cell reservation protocols. Bundling specs into electronic receipt & dispatching confirmation logs via server transport...
              </p>
            </div>
          </div>
        )}

        {/* MAIN DUAL PANE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="checkout-panels">
          
          {/* LEFT COLUMN: ACTIVE DESIGN OPTIONS FORM (8 COLS) */}
          <form onSubmit={handleFinalizeBooking} className="lg:col-span-8 space-y-12">
            
            {/* STEP 1: SELECT COATING CORE */}
            <div className="border border-[#1a1a1f] bg-[#060608] p-6 md:p-8 space-y-6" id="form-step-1">
              <div className="flex items-center space-x-3 border-b border-[#121215] pb-4">
                <span className="font-sans font-bold text-sm bg-white text-black px-2 py-0.5">01</span>
                <h3 className="font-sans text-sm tracking-widest uppercase text-white font-semibold">SELECT COATING MATRIX</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PACKAGES.map(pkg => (
                  <div 
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`border p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 relative ${
                      selectedPackageId === pkg.id 
                        ? 'border-white bg-white/[0.03]' 
                        : 'border-[#1a1a1f] bg-black hover:border-white/30'
                    }`}
                  >
                    <div>
                      {/* Active radio dot */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">PACKAGE</span>
                        <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${selectedPackageId === pkg.id ? 'border-white' : 'border-gray-700'}`}>
                          {selectedPackageId === pkg.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <h4 className="font-sans text-xs tracking-wider text-white font-bold uppercase mb-1">{pkg.name}</h4>
                      <p className="text-[10px] text-gray-400 tracking-wide uppercase leading-normal mb-4 flex-1 min-h-[36px]">{pkg.tagline}</p>
                    </div>

                    <div className="border-t border-[#1a1a1f] pt-3 text-right">
                      <span className="text-[10px] block tracking-widest text-gray-500 uppercase">RATE</span>
                      <span className="text-sm font-bold text-white font-mono">RM {pkg.prices[vehicleSize]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 2: SELECT VEHICLE SCALE surcharge */}
            <div className="border border-[#1a1a1f] bg-[#060608] p-6 md:p-8 space-y-6" id="form-step-2">
              <div className="flex items-center space-x-3 border-b border-[#121215] pb-4">
                <span className="font-sans font-bold text-sm bg-white text-black px-2 py-0.5">02</span>
                <h3 className="font-sans text-sm tracking-widest uppercase text-white font-semibold">IDENTIFY VEHICLE SCALE</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'small', label: 'SMALL', desc: 'Axia / Myvi', price: currentPackage.prices.small },
                  { id: 'medium', label: 'MEDIUM', desc: 'Vios / City', price: currentPackage.prices.medium },
                  { id: 'suv', label: 'SUV / 4x4', desc: 'Large SUV / Hilux', price: currentPackage.prices.suv },
                ].map(size => (
                  <div 
                    key={size.id}
                    onClick={() => setVehicleSize(size.id as any)}
                    className={`border p-4 text-center cursor-pointer transition-all ${
                      vehicleSize === size.id 
                        ? 'border-white bg-white/[0.03]' 
                        : 'border-[#1a1a1f] bg-black hover:border-white/30'
                    }`}
                  >
                    <span className="text-[10px] text-white font-bold block tracking-widest uppercase mb-1">{size.label}</span>
                    <span className="text-[9px] text-gray-400 block uppercase tracking-wider mb-1">{size.desc}</span>
                    <span className="text-xs font-bold text-white font-mono">RM {size.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 3: ADD TECH MODULAR OTHERS */}
            <div className="border border-[#1a1a1f] bg-[#060608] p-6 md:p-8 space-y-6" id="form-step-3">
              <div className="flex items-center space-x-3 border-b border-[#121215] pb-4">
                <span className="font-sans font-bold text-sm bg-white text-black px-2 py-0.5">03</span>
                <h3 className="font-sans text-sm tracking-widest uppercase text-white font-semibold">TOGGLE MODULAR ADD-ONS</h3>
              </div>

              <div className="space-y-3">
                {ADD_ONS.map(addon => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <div 
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`border p-4 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                        isChecked 
                          ? 'border-white bg-white/[0.02]' 
                          : 'border-[#1a1a1f] bg-black hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start space-x-4 pr-4">
                        <div className={`mt-0.5 h-4 w-4 shrink-0 border flex items-center justify-center ${isChecked ? 'border-white bg-white text-black' : 'border-gray-700'}`}>
                          {isChecked && <Check className="h-3 w-3" />}
                        </div>
                        <div>
                          <h5 className="text-xs text-white uppercase font-bold tracking-widest">{addon.name}</h5>
                          <p className="text-[10px] text-gray-450 text-gray-500 uppercase leading-normal tracking-wide mt-1">{addon.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-white font-mono">+RM {addon.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: TIMING SELECTION COORDINATES */}
            <div className="border border-[#1a1a1f] bg-[#060608] p-6 md:p-8 space-y-6" id="form-step-4">
              <div className="flex items-center space-x-3 border-b border-[#121215] pb-4">
                <span className="font-sans font-bold text-sm bg-white text-black px-2 py-0.5">04</span>
                <h3 className="font-sans text-sm tracking-widest uppercase text-white font-semibold">SCHEDULE QUEUE COORDINATES</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] text-gray-500 tracking-widest uppercase font-medium block mb-2">TARGET CALENDAR DATE</label>
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-black border border-[#1a1a1f] hover:border-white/40 focus:border-white text-white px-4 py-3 text-xs tracking-wider uppercase rounded-none focus:outline-none"
                  />
                  {errors.bookingDate && <p className="text-[#ff453a] text-[10px] mt-1.5 uppercase font-semibold">{errors.bookingDate}</p>}
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 tracking-widest uppercase font-medium block mb-2">PREFERRED WORK SHIFT</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'morning', time: '09:00 AM - 12:00 PM' },
                      { id: 'midday', time: '12:00 PM - 03:00 PM' },
                      { id: 'afternoon', time: '03:00 PM - 5:00 PM' },
                    ].map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setBookingTime(slot.id)}
                        className={`py-3 text-[10px] font-bold border tracking-wider transition-all rounded-none uppercase ${
                          bookingTime === slot.id 
                            ? 'border-white bg-white text-black font-extrabold' 
                            : 'border-[#1a1a1f] bg-black text-gray-400 hover:border-white/30'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 5: CUSTOMER DIRECT CONTACT */}
            <div className="border border-[#1a1a1f] bg-[#060608] p-6 md:p-8 space-y-6" id="form-step-5">
              <div className="flex items-center space-x-3 border-b border-[#121215] pb-4">
                <span className="font-sans font-bold text-sm bg-white text-black px-2 py-0.5">05</span>
                <h3 className="font-sans text-sm tracking-widest uppercase text-white font-semibold">YOUR CONTACT</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] text-gray-500 tracking-widest uppercase font-medium block mb-2">FULL NAME</label>
                  <input 
                    type="text"
                    required
                    placeholder="ENTER FULL NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-[#1a1a1f] focus:border-white hover:border-white/40 text-white px-4 py-3 text-xs tracking-wider uppercase font-mono rounded-none focus:outline-none"
                  />
                  {errors.name && <p className="text-[#ff453a] text-[10px] mt-1.5 uppercase font-semibold">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 tracking-widest uppercase font-medium block mb-2">SECURE EMAIL COORDINATE</label>
                  <input 
                    type="email"
                    required
                    placeholder="CLIENT@EMAIL.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-[#1a1a1f] focus:border-white hover:border-white/40 text-white px-4 py-3 text-xs tracking-wider uppercase font-mono rounded-none focus:outline-none"
                  />
                  {errors.email && <p className="text-[#ff453a] text-[10px] mt-1.5 uppercase font-semibold">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] text-gray-500 tracking-widest uppercase font-medium block mb-2">TELEPHONE COMMUNICANT PHONE</label>
                  <input 
                    type="tel"
                    required
                    placeholder="013 456 7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black border border-[#1a1a1f] focus:border-white hover:border-white/40 text-white px-4 py-3 text-xs tracking-wider uppercase font-mono rounded-none focus:outline-none"
                  />
                  {errors.phone && <p className="text-[#ff453a] text-[10px] mt-1.5 uppercase font-semibold">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] text-gray-500 tracking-widest uppercase font-medium block mb-2">CLIENT NOTES & MEMORANDUM (OPTIONAL)</label>
                  <textarea 
                    rows={4}
                    placeholder="IDENTIFY RELEVANT PAINT SURFACE DAMAGES, PRIOR CERAMIC FILMS, AND EXTREME SPEC REQUIREMENTS HERE..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-black border border-[#1a1a1f] focus:border-white hover:border-white/40 text-white p-4 text-xs tracking-wider uppercase font-mono rounded-none focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* RIGHT COLUMN: STICKY CHECKOUT BILL SUMMARY (4 COLS) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6" id="summary-panel">
            <div className="border border-white/20 bg-[#08080a] p-6 md:p-8 space-y-6">
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white font-bold border-b border-[#121215] pb-4">
                CONFIGURED SUMMARY
              </h3>

              {/* Dynamic bill contents */}
              <div className="space-y-4 text-xs border-b border-[#121215] pb-6">
                
                {/* Core Package Rate */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-gray-500 text-[10px] block tracking-wide uppercase font-semibold">SELECTED SERVICE</span>
                    <span className="text-white uppercase tracking-wider font-semibold">{currentPackage.name}</span>
                  </div>
                  <span className="text-white font-semibold font-mono">RM {basePrice}</span>
                </div>

                {/* Sizing Details */}
                <div className="flex justify-between items-start border-t border-[#121215] pt-3">
                  <div>
                    <span className="text-gray-500 text-[10px] block tracking-wide uppercase font-semibold">VEHICLE TIER</span>
                    <span className="text-white uppercase tracking-wider">
                      {vehicleSize === 'small' ? 'Small (Axia/Myvi)' : vehicleSize === 'medium' ? 'Medium (Vios/City)' : 'SUV / 4x4'}
                    </span>
                  </div>
                  <span className="text-white font-bold text-[9px] bg-white/10 px-1.5 py-0.5">ACTIVE</span>
                </div>

                {/* AddOns */}
                {selectedAddOns.length > 0 && (
                  <div className="space-y-2 border-t border-dashed border-[#1a1a1f] pt-4">
                    <span className="text-gray-500 text-[10px] block tracking-wide uppercase font-semibold">MODULAR ADDITIONS</span>
                    {selectedAddOns.map(addonId => {
                      const item = ADD_ONS.find(a => a.id === addonId);
                      if (!item) return null;
                      return (
                        <div key={item.id} className="flex justify-between text-[11px] text-gray-300">
                          <span className="uppercase truncate max-w-[180px] hover:text-white transition-colors">+ {item.name}</span>
                          <span className="font-mono">RM {item.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dynamic Time Recap */}
              <div className="bg-black/35 py-3.5 px-4 text-[10px] border border-[#1a1a1f] space-y-2 uppercase text-gray-400">
                <div className="flex justify-between">
                  <span>QUEUE DATE:</span>
                  <span className="text-white font-bold">{bookingDate ? new Date(bookingDate).toLocaleDateString() : 'SELECT DATE'}</span>
                </div>
                <div className="flex justify-between">
                  <span>WORK SHIFT:</span>
                  <span className="text-white font-bold">{bookingTime}</span>
                </div>
              </div>

              {/* Secure Mutation Display Error */}
              {bookingMutation.isError && (
                <div className="border border-[#ff453a]/25 bg-[#ff453a]/5 p-4 flex items-start space-x-3 text-[10px] text-[#ff453a]">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="uppercase leading-normal font-semibold">
                    FAILSAFE SECURE REJECT: Failed to process reservation. Please retry configuration or contact support directly.
                  </p>
                </div>
              )}

              {/* Dynamic Total & Button */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">TOTAL PROPOSED AMOUNT</span>
                  <span className="text-3xl font-bold font-mono text-white tracking-widest">RM {totalPrice}</span>
                </div>
                
                <button
                  onClick={handleFinalizeBooking}
                  className="w-full bg-white text-black text-xs font-bold font-mono py-4 hover:bg-gray-200 transition-all uppercase tracking-[0.16em]"
                >
                  SUBMIT 
                </button>

                <p className="text-[9px] text-gray-500 uppercase text-center tracking-normal leading-relaxed">
                  There is no payment involved. Its just to let us know ur interested.
                </p>
              </div>

            </div>

            {/* STARLINK-STYLE SECURE METRIC PROMPT */}
            <div className="border border-[#1a1a1f] bg-[#060608] p-5 text-[9px] uppercase leading-relaxed text-gray-400">
              <strong className="text-white tracking-wider block mb-0.5">SMTP ELECTRONIC CONSPIRACY:</strong> Submitting this design triggers automatic email formulation. If coordinates are fully configured, it sends a direct message to ivanloong05@gmail.com.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
