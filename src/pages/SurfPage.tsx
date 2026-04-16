import { useEffect, useState, useRef, useCallback } from 'react';
import { Waves, Clock, Users, Award, MapPin, Star, User, CheckCircle2, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import { surfServices } from '../lib/data';

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

export const SurfPage = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    document.title = 'Surf Lessons & Rentals Taghazout | Certified Instructors';
  }, []);

  const handleBooking = useCallback(async (item: any) => {
    setLoadingId(item.id);
    
    const isRental = item.service?.toLowerCase().includes('rental');
    const message = isRental
      ? `Hello! I found you on Go Visit Taghazout. I want to rent ${item.service} from ${item.name} for ${item.priceMAD} MAD. Is it available?`
      : `Hello! I found you on Go Visit Taghazout. I would like to book a surf lesson with ${item.name} for ${item.priceMAD} MAD. Is it available?`;
    
    const whatsappUrl = `https://wa.me/${item.phone}?text=${encodeURIComponent(message)}`;

    try {
      await Promise.race([
        supabase.from('bookings').insert([{
          service_name: item.service || `Surf Lesson with ${item.name}`,
          provider_name: item.name,
          price: item.priceMAD,
          status: 'pending',
          source: 'website'
        }]),
        new Promise((_, reject) => setTimeout(() => reject('timeout'), 1500))
      ]);
    } catch (err) {
      console.error("Supabase record skipped to prioritize WhatsApp redirection.");
    } finally {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
      setLoadingId(null);
    }
  }, []);

  const instructors = [
    { id: 'i1', name: "Momo", specialty: "Beginner Whisperer", bio: "10+ years teaching first-timers. Patient, fun, and fluent in 4 languages.", rating: 5.0, image: "/momo.jpg", languages: ["English", "French", "Arabic", "Spanish"], experience: "10+ years", priceEUR: 25, priceMAD: 250, tag: "Best for Newbies", popular: true, phone: "212642257347" },
    { id: 'i2', name: "Abdou", specialty: "Wave Technician", bio: "Ex-competitor turned coach. Perfect for intermediates looking to level up.", rating: 4.9, image: "/abdo.jpg", languages: ["English", "French", "Arabic"], experience: "8 years", priceEUR: 30, priceMAD: 300, tag: "Progress Fast", phone: "212642257347" },
    { id: 'i3', name: "Lahsen", specialty: "Advanced Shredder", bio: "Grew up surfing Anchor Point. Teaches power turns & tube rides.", rating: 5.0, image: "/zilla.jpg", languages: ["English", "Arabic", "French"], experience: "12 years", priceEUR: 35, priceMAD: 350, tag: "Pro-Level Coaching", phone: "212642257347" }
  ];

  const features = [
    { icon: Award, title: 'Certified Pros', desc: 'ISA & Moroccan Federation certified' },
    { icon: Clock, title: 'Flexible Hours', desc: 'Lessons daily 8AM - 6PM' },
    { icon: Users, title: 'Small Groups', desc: 'Max 4 students per instructor' },
    { icon: MapPin, title: 'Best Breaks', desc: "Panorama, Banana, Devil's Rock" },
  ];

  const tips = [
    { title: 'Free cancellation', desc: 'Cancel up to 24h before' },
    { title: 'All levels welcome', desc: 'From first-timer to pro' },
    { title: 'Local prices guaranteed', desc: 'No tourist markup' },
    { title: 'Pay after lesson', desc: 'No advance payment' },
  ];

  const rentals = surfServices.filter(s => s.service.toLowerCase().includes('rental'));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Taghazout Surf Lessons",
    "description": "Certified surf instructors in Taghazout with 10+ years experience",
    "priceRange": "€25-€35",
    "address": { "@type": "PostalAddress", "addressLocality": "Taghazout", "addressCountry": "MA" }
  };

  return (
    <div className="min-h-screen bg-white pb-[env(safe-area-inset-bottom)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 uppercase italic">Surf Lessons & Rentals</h1>
          <p className="text-xl sm:text-2xl text-cyan-100 max-w-3xl mx-auto font-medium">Certified local instructors, quality equipment, no tourist prices.</p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <Icon className="w-7 h-7 text-cyan-600" />
                <span className="font-bold text-gray-900">{f.title}</span>
                <span className="text-sm text-gray-600">{f.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" ref={ref}>
        {/* Instructors */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 uppercase italic tracking-tighter">
            <User className="text-purple-600 w-8 h-8" /> Meet Your Local Surf Instructors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden bg-gray-900">
                  <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" width={400} height={300} loading="eager" />
                  {instructor.popular && <div className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg animate-pulse">⭐ Popular</div>}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-xl uppercase italic">{instructor.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-black">{instructor.rating}</span>
                    </div>
                  </div>
                  <p className="text-purple-600 font-bold text-sm mb-3">{instructor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{instructor.bio}</p>
                  <div className="mt-auto space-y-4">
                    <div className="flex flex-wrap items-baseline gap-2 border-t border-gray-50 pt-4">
                      <span className="text-3xl font-black text-gray-900">{instructor.priceEUR}€</span>
                      <span className="text-gray-500 font-bold">≈ {instructor.priceMAD} MAD</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block w-full">per 3 hour lesson</span>
                    </div>
                    <button onClick={() => handleBooking(instructor)} disabled={loadingId === instructor.id}
                      className="w-full bg-[#25D366] hover:bg-[#20C25A] active:scale-95 text-white font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-md touch-manipulation disabled:opacity-50">
                      {loadingId === instructor.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <FaWhatsapp className="w-6 h-6" />}
                      {loadingId === instructor.id ? 'Connecting...' : 'Book via WhatsApp'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rentals */}
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 uppercase italic tracking-tighter">
            <Waves className="text-blue-600 w-8 h-8" /> Equipment Rentals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rentals.map((rental) => (
              <div key={rental.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 flex flex-col overflow-hidden hover:-translate-y-1 transition-all">
                <div className="relative h-64 bg-gray-900">
                  <img src={rental.image || "https://picsum.photos/800/520"} alt={rental.name} className="w-full h-full object-cover" width={600} height={400} loading="eager" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full">RENTAL</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-black text-xl uppercase italic mb-2">{rental.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">Board + Wetsuit – 100 MAD / whole day. Premium equipment, all sizes available.</p>
                  <div className="flex items-baseline gap-2 mb-4 border-t border-gray-50 pt-4">
                    <span className="text-3xl font-black text-gray-900">{rental.priceEUR}€</span>
                    <span className="text-gray-500 font-bold">≈ {rental.priceMAD} MAD</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">/ day</span>
                  </div>
                  <button onClick={() => handleBooking(rental)} disabled={loadingId === rental.id}
                    className="w-full bg-[#25D366] hover:bg-[#20C25A] active:scale-95 text-white font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-md touch-manipulation disabled:opacity-50">
                    {loadingId === rental.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <FaWhatsapp className="w-6 h-6" />}
                    {loadingId === rental.id ? 'Connecting...' : 'Rent via WhatsApp'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Essential Tips */}
        <section className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
          <h2 className="text-2xl font-black mb-6 text-center uppercase">Essential Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
                <div><h4 className="font-bold">{t.title}</h4><p className="text-sm text-gray-600">{t.desc}</p></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trust Banner */}
      <div className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 font-medium text-lg">✅ No tourist markups • Pay directly • 100% transparent</p>
        </div>
      </div>
    </div>
  );
};