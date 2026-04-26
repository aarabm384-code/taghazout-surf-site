import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Waves, MapPin, Shield, Heart, MessageCircle, ArrowRight, CheckCircle2, Mail, X } from 'lucide-react';

const categories = [
  {
    href: '/taxi',
    title: 'Taxi Services',
    description: 'Airport transfers & local trips with verified rates.',
    icon: Car,
    color: 'bg-blue-50 text-blue-600',
    gradient: 'from-blue-50 to-blue-100'
  },
  {
    href: '/surf',
    title: 'Surf & Rentals',
    description: 'Professional coaching and quality equipment rentals.',
    icon: Waves,
    color: 'bg-cyan-50 text-cyan-600',
    gradient: 'from-cyan-50 to-cyan-100'
  },
  {
    href: '/trips',
    title: 'Day Trips',
    description: 'Paradise Valley, Imsouane, and local excursions.',
    icon: MapPin,
    color: 'bg-green-50 text-green-600',
    gradient: 'from-green-50 to-green-100'
  },
  {
  href: '/accommodation',
  title: 'Stays',
  description: 'Best apartments & hotels in Taghazout',
  icon: Shield, // تقدر تخليها Shield أو تبدلها بـ 'Home' إلا كنتي داير ليه Import
  color: 'bg-green-50 text-green-600',
  gradient: 'from-green-50 to-green-100'
}
];

const features = [
  {
    icon: Shield,
    title: 'Verified Partners',
    description: 'All services are provided by hand-picked and trusted local professionals.'
  },
  {
    icon: Heart,
    title: 'Zero Commission',
    description: 'We take nothing. 100% of your payment goes directly to the local provider.'
  },
  {
    icon: MessageCircle,
    title: 'Instant Booking',
    description: 'Connect instantly with providers and confirm your booking in minutes.'
  }
];

export const HomePage = () => {
  const [showModal, setShowModal] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Go Visit Taghazout | Official Local Guide 2026';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Go Visit Taghazout. Official guide for Taxis, Surf Lessons and Day Trips. Verified local partners, fair prices and direct booking via WhatsApp.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
     {/* --- Ultra Compact Live Report --- */}
<section className="px-0 pt-0 pb-0 max-w-4xl mx-auto -mb-12">  
  
<div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          
          {/* Header بسيط بزاف */}
          <div className="bg-blue-600 px-3 py-1.5 text-white flex justify-between items-center">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-tight">
              <Waves size={12} />
              Taghazout Live
            </div>
            <div className="text-[9px] font-medium bg-blue-500 px-2 py-0.5 rounded-full">
              22°C ☀️
            </div>
          </div>
          
          {/* ارتفاع صغير جداً 180px */}
          <div className="w-full h-[180px] bg-gray-50">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://embed.windy.com/embed2.html?lat=30.548&lon=-9.708&detailLat=30.548&detailLon=-9.708&width=650&height=180&zoom=9&level=surface&overlay=wind&product=ecmwf&menu=&message=false&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" 
              frameBorder="0"
              title="Taghazout Weather"
            ></iframe>
          </div>

          {/* زر واتساب في سطر واحد خفيف */}
          <a 
            href="https://wa.me/212619579732" 
            className="flex items-center justify-center gap-2 w-full py-2 bg-blue-50 text-blue-700 text-[10px] font-bold hover:bg-blue-100 transition-colors border-t border-blue-100"
          >
            <MessageCircle size={12} className="text-green-600" />
Book a Surf Lesson          </a>
        </div>
      </section>
        
      {/* MODALS FOR PRIVACY AND TERMS */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowModal(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>

            {showModal === 'privacy' && (
              <>
                <h2 className="text-2xl font-black mb-6 uppercase italic">Privacy Policy</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Go Visit Taghazout is an independent local guide service.</p>
                  <p>We do not collect, store or share any personal information. All booking communications happen directly between you and the local service provider via WhatsApp.</p>
                  <p>We do not use cookies, tracking scripts or any analytics tools that collect visitor data.</p>
                  <p>This website is provided as a free public service for the Taghazout community.</p>
                  <p className="text-sm text-gray-400">Last updated: June 2026</p>
                </div>
              </>
            )}

            {showModal === 'terms' && (
              <>
                <h2 className="text-2xl font-black mb-6 uppercase italic">Terms of Service</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Go Visit Taghazout is an independent information directory only.</p>
                  <p>We are not an agency, tour operator or travel agent. We do not provide any services directly. We only provide contact information for local independent service providers.</p>
                  <p>All bookings and agreements are made directly between you and the service provider. We are not responsible for any services provided by third parties listed on this website.</p>
                  <p>All prices shown are estimates and may vary at the discretion of the provider.</p>
                  <p className="text-sm text-gray-400">Last updated: June 2026</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 1. HERO SECTION - IMPROVED TITLE FOR MOBILE */}
      <div className="bg-white text-gray-900 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
          <div className="text-center">

            {/* Subtle trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-8 sm:mb-10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Official Local Guide • Updated June 2026</span>
            </div>

           {/* PROFESSIONAL TITLE - OPTIMIZED FOR PHONE */}
<div className="space-y-2">
  <h1 className="text-[42px] sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-gray-900 leading-none">
    Taghazout's Official
  </h1>

  <div className="flex items-center justify-center gap-2">
    <span className="text-[42px] sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-blue-600">
      Go
    </span>
    <span className="text-[42px] sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-gray-900">
      Visit
    </span>
  </div>

  <h1 className="text-[42px] sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-blue-600 leading-none">
    Taghazout
  </h1>
</div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mt-10 mb-12 leading-relaxed font-normal px-4">
              Your premium gateway to the best Taxis, Surf Lessons, and Day Trips in Taghazout. 
              Verified services from hand-picked local partners.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/taxi"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-10 py-4 rounded-xl transition-all shadow-md active:scale-95"
              >
                View Taxi Rates →
              </Link>
              <Link
                to="/surf"
                className="w-full sm:w-auto border-2 border-gray-200 hover:bg-gray-50 text-gray-700 text-lg font-bold px-10 py-4 rounded-xl transition-all active:scale-95"
              >
                Surf Lessons
              </Link>
            </div>

            <p className="text-gray-500 font-medium">
              ✅ Zero Commission. No Hidden Fees. 100% Free to use.
            </p>

          </div>
        </div>
      </div>

      {/* ✅ SOCIAL PROOF BANNER */}
      <div className="bg-gray-50 border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium">
            Trusted by <span className="font-bold text-gray-900">12,000+ visitors</span> every month
          </p>
        </div>
      </div>

      {/* 2. CATEGORY CARDS */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What do you need today?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a category to view premium services and book trusted local providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.href}
                  to={category.href}
                  className="group relative bg-white rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Verified
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-bold text-lg group-hover:text-blue-700">
                      Explore
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ✅ HOW IT WORKS SECTION */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparent and 100% free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black text-blue-600">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3">Choose a Service</h3>
              <p className="text-gray-600 text-lg">Browse verified local prices for Taxis, Surf and Trips.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black text-blue-600">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3">Message Directly</h3>
              <p className="text-gray-600 text-lg">Click the WhatsApp button and send a message to the provider.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black text-blue-600">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3">Book & Enjoy</h3>
              <p className="text-gray-600 text-lg">Confirm your booking and pay the provider directly when you arrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY VISIT TAGHAZOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Go Visit Taghazout?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect you with the most reliable local services for a perfect stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-3xl bg-white shadow-sm border border-gray-50"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mb-6">
                    <Icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to explore?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 font-medium">
            Book our most popular service - Airport Transfers
          </p>
          <Link
            to="/taxi"
            className="inline-flex items-center gap-4 bg-white text-blue-600 hover:bg-gray-50 font-bold text-xl px-12 py-5 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            Book Transfer Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* UPDATED PROFESSIONAL FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            <div className="md:col-span-2">
              <h3 className="font-bold text-xl text-gray-900 mb-4">Go Visit Taghazout</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We are an independent local guide run by Taghazout residents. We take zero commission, we are not affiliated with any business, and we publish only real verified local prices.
              </p>
              <p className="text-gray-500 text-sm">
                All prices last updated: June 2026
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/taxi" className="hover:text-blue-600 transition-colors">Taxi Prices</Link></li>
                <li><Link to="/surf" className="hover:text-blue-600 transition-colors">Surf Lessons</Link></li>
                <li><Link to="/trips" className="hover:text-blue-600 transition-colors">Day Trips</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Support & Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="mailto:support@govisittaghazout.com" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" /> support@govisittaghazout.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/212619579732" target="_blank" rel="noopener" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> +212 619 579 732
                  </a>
                </li>
                <li>
                  <button onClick={() => setShowModal('privacy')} className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowModal('terms')} className="hover:text-blue-600 transition-colors">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
            © 2026 Go Visit Taghazout Official Directory. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};