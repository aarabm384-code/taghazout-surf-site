import { useState, useEffect, useRef } from 'react';
import { Plane, Map, ShieldCheck, Loader2, Clock, Car, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // الأيقونة الرسمية
import { supabase } from '../lib/supabase';

const formatPrice = (madPrice: number) => {
  const eurPrice = (madPrice / 10).toFixed(0);
  return { mad: madPrice, eur: eurPrice };
};

interface Service {
  id: number;
  name: string;
  price: number;
  type: string;
  pro: boolean;
  rating: number;
  reviews: number;
  img: string;
  details: string;
  lastBooked: string;
  popular?: boolean;
  phone: string;
}

const airportServices: Service[] = [
  { id: 1, name: ' From Agadir Airport to taghazout  (Ismail)', price: 300, type: 'Private', pro: true, popular: true, rating: 4.9, reviews: 124, img: 'https://www.taxiagadirairport.com/sliders/slider%2002-768w.jpg', details: 'Private door-to-door transfer available 24/7, meet & greet included.', lastBooked: '2 hours ago', phone: "212600598885" },
  { id: 2, name: ' From Taghazout to agadir Airport (Standard)', price: 300, type: 'Private', pro: false, rating: 4.8, reviews: 86, img: 'taghazout.jpg', details: 'Professional airport pickup with flight tracking and on-time guarantee.', lastBooked: '45 minutes ago', phone: "212600598885" },
  { id: 3, name: 'Marrakech Airport or Any Area in Marrakech', price: 1100, type: 'Long Distance', pro: true, rating: 5.0, reviews: 42, img: 'marrakech.jpg', details: 'Comfortable long-distance ride to/from RAK with AC and water included.', lastBooked: '3 hours ago', phone: "212600598885" },
];

const localServices: Service[] = [
  { id: 4, name: 'Agadir Souk (Market)', price: 150, type: 'Day Trip', pro: false, rating: 4.7, reviews: 53, img: 'souk.jpg', details: 'Drop-off and pickup at the famous Agadir souk. Free time to shop and explore.', lastBooked: '1 hour ago', phone: "212600598885" },
  { id: 5, name: 'Paradise Valley', price: 500, type: 'Excursion', pro: true, rating: 4.9, reviews: 91, img: 'pari.jpg', details: 'Scenic canyon trip with swimming in natural pools return incuded.', lastBooked: '30 minutes ago', phone: "212600598885" },
  { id: 6, name: 'Imsouane Village ', price: 600, type: '2h drive', pro: true, rating: 4.9, reviews: 67, img: 'imss.jpg', details: 'Relax in the fishing village, enjoy the beach, and free time to explore at your own pace', lastBooked: '4 hours ago', phone: "212600598885" },
  { id: 7, name: 'Timlalin', price: 200, type: 'Local', pro: false, rating: 4.6, reviews: 38, img: 'tim.jpg', details: 'Timlalin: Scenic coastal spot with sand dunes and dramatic rock formations, perfect for photos, short walks, and relaxing by the ocean return incuded', lastBooked: '20 minutes ago', phone: "212600598885" },
  { id: 8, name: 'Essaouira Transfer', price: 700, type: ' 2h30 drive', pro: true, rating: 5.0, reviews: 29, img: 'ess.jpg', details: 'Direct drop-off in the blue city with free time to explore the medina. Return not included.', lastBooked: '5 hours ago', phone: "212600598885" },
  { id: 9, name: 'Crocoparc Agadir Visit', price: 600, type: 'Adventure', pro: true, rating: 4.8, reviews: 15, img: 'crocco.jpg', details: 'Visit the crocodile park with free time to explore the gardens and animals. return included', lastBooked: '5 hours ago', phone: "212600598885" },
];

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

export function TaxiPage() {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => { document.title = 'Taxi & Transfers | Go Visit Taghazout'; }, []);

  const handleBooking = async (service: Service) => {
    setLoadingId(service.id);
    try {
      await supabase.from('bookings').insert([{ service_name: service.name, provider_name: 'Taxi Service', price: service.price, status: 'pending' }]);
    } catch (err) { console.error(err); }
    finally {
      let message = service.name.toLowerCase().includes('airport')
        ? `Hello! I found you on Go Visit Taghazout.\nI would like to book ${service.name} for ${service.price} MAD.\n\nPlease can you confirm availability:\n✅ Flight Number:\n✅ Arrival Day:\n✅ Arrival Time:\n\nThank you!`
        : `Hello! I found you on Go Visit Taghazout. I would like to book ${service.name} for ${service.price} MAD. Is it available?`;
      
      // التعديل هنا لضمان العمل على iPhone
      window.location.href = `https://wa.me/${service.phone}?text=${encodeURIComponent(message)}`;
    }
    setLoadingId(null);
  };

  const renderCard = (service: Service, index: number) => {
    const price = formatPrice(service.price);
    const isLoading = loadingId === service.id;
    return (
      <div key={service.id} 
        className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-auto overflow-hidden hover:shadow-xl transition-shadow"
        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${index * 50}ms` }}
      >
        <div className="relative h-48 w-full flex-shrink-0">
          <img src={service.img} alt={service.name} className="w-full h-full object-cover" loading="lazy" />
          {service.pro && <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-full">PRO</div>}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-black text-lg uppercase italic mb-2 leading-tight">{service.name}</h3>
          <p className="text-gray-600 text-xs mb-4 line-clamp-2">{service.details}</p>
          
          <div className="mt-auto mb-4 border-t pt-3">
             <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">€{price.eur}</span>
                <span className="text-gray-500 font-bold text-sm">({price.mad} MAD)</span>
             </div>
          </div>

          <button 
            onClick={() => handleBooking(service)} 
            disabled={isLoading}
            className="w-max mx-auto bg-[#25D366] text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20C25A] transition-all shadow-sm active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-4 h-4" /> 
            ) : (
              <FaWhatsapp className="w-5 h-5" />
            )}
            {isLoading ? '...' : 'Book via WhatsApp'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 text-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 uppercase italic">Taxi & Transfers</h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">Verified drivers, fixed prices, no negotiation. Book directly via WhatsApp.</p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3"><Car className="w-6 h-6 text-blue-600" /><span className="font-bold text-gray-900">Private A/C Vehicle</span></div>
          <div className="flex items-center justify-center gap-3"><Clock className="w-6 h-6 text-blue-600" /><span className="font-bold text-gray-900">24/7 Availability</span></div>
          <div className="flex items-center justify-center gap-3"><ShieldCheck className="w-6 h-6 text-blue-600" /><span className="font-bold text-gray-900">Verified Drivers Only</span></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" ref={ref}>
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 uppercase italic tracking-tighter"><Plane className="text-blue-600 w-8 h-8" /> Airport Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{airportServices.map((s,i)=>renderCard(s,i))}</div>
        </section>
        <section className="mb-20">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 uppercase italic tracking-tighter"><Map className="text-blue-600 w-8 h-8" /> Local Trips & Excursions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{localServices.map((s,i)=>renderCard(s,i+3))}</div>
        </section>

        <section className="bg-blue-50 rounded-3xl p-8 sm:p-12 border border-blue-100">
          <h2 className="text-3xl font-black mb-10 text-center uppercase italic tracking-tighter">💡 Important Taxi Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-bold text-lg mb-1">All prices are PER CAR</h3><p className="text-gray-600">Not per person. Price is the same for 1, 2, 3 or 4 people.</p></div></div>
            <div className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-bold text-lg mb-1">No extra charge for luggage</h3><p className="text-gray-600">Surfboards, suitcases and bags are all included in the price.</p></div></div>
            <div className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-bold text-lg mb-1">Flight delays are covered</h3><p className="text-gray-600">Your driver will wait for you even if your flight is late.</p></div></div>
            <div className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-bold text-lg mb-1">No payment in advance</h3><p className="text-gray-600">You pay the driver directly in cash at the end of your trip.</p></div></div>
            <div className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-bold text-lg mb-1">Stops are allowed</h3><p className="text-gray-600">You can ask your driver to stop for water, food or ATM at no extra cost.</p></div></div>
            <div className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" /><div><h3 className="font-bold text-lg mb-1">Tipping is optional</h3><p className="text-gray-600">Tipping is not expected, but always appreciated for good service.</p></div></div>
          </div>
        </section>
      </div>

      <div className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 font-medium text-lg">✅ All prices are final. No hidden fees. No negotiation. 100% transparent.</p>
        </div>
      </div>
    </div>
  );
}