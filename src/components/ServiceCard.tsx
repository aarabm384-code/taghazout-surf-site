import { WhatsAppLogo } from './WhatsAppLogo';
import { ShieldCheck } from 'lucide-react';
import { generateWhatsAppMessage } from '../lib/data';
import { supabase } from '../lib/supabase';

interface ServiceCardProps {
  providerName: string;
  serviceName: string;
  priceEUR: number;
  priceMAD: number;
  isTrusted?: boolean;
  details?: string;
  phoneNumber?: string;
  image?: string;
}

export const ServiceCard = ({
  providerName,
  serviceName,
  priceEUR,
  priceMAD,
  isTrusted = false,
  details,
  phoneNumber = '+212600000000',
  image = "/images/default-surf.jpg",
}: ServiceCardProps) => {
  
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const message = generateWhatsAppMessage(serviceName, providerName);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const handleBooking = async () => {
    try {
      // تسجيل الحجز فـ سوباباز (فقط الحقول اللي متوفرة فـ الجدول عندك)
      await supabase
        .from('bookings')
        .insert({
          service_name: serviceName,
          price: priceMAD
        });
    } catch (err) {
      console.error('Supabase error:', err);
    }
    
    // فتح واتساب ديريكت
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-1">
      <div className="relative h-56 bg-gray-900 overflow-hidden">
        <img 
          src={image} 
          alt={providerName} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {isTrusted && (
          <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>Trusted</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-900">{providerName}</h3>
          <p className="text-gray-600 mt-1">{serviceName}</p>
        </div>

        {details && (
          <div className="mb-6">
            <span className="text-xs text-gray-500">{details}</span>
          </div>
        )}

        <div className="flex items-baseline mb-7">
          <span className="text-3xl font-black text-gray-900">€{priceEUR}</span>
          <span className="ml-2 text-sm text-gray-500">({priceMAD} MAD)</span>
        </div>

        <button 
          onClick={handleBooking} 
          className="w-full bg-[#25D366] hover:bg-[#20C25A] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all"
        >
          <WhatsAppLogo className="w-6 h-6" />
          Book via WhatsApp
        </button>
      </div>
    </div>
  );
};