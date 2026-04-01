import { WhatsAppLogo } from './WhatsAppLogo';
import { ShieldCheck } from 'lucide-react';
import { generateWhatsAppMessage } from '../lib/data';
import { supabase } from '../lib/supabase';
import React from 'react';

interface ServiceCardProps {
  providerName: string;
  serviceName: string;
  priceEUR: number;
  priceMAD: number;
  isTrusted?: boolean;
  duration?: string;
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
  duration,
  details,
  phoneNumber = '+212600000000',
  image = "/images/default-surf.jpg",   // ← Safe local fallback
}: ServiceCardProps) => {
  const message = generateWhatsAppMessage(serviceName, providerName);
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const handleBooking = async () => {
    try {
      await supabase
        .from('bookings')
        .insert({
          service_name: serviceName,
          provider_name: providerName,
          price: priceMAD,
          status: 'pending',
          source: 'website',
          page_url: window.location.href,
        });
    } catch (err) {
      console.error('Supabase error:', err);
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="relative overflow-hidden h-56 bg-gray-900">
        <img 
          src={image} 
          alt={providerName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/800/520?random=1"; // safe public fallback
          }}
        />
        
        {isTrusted && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <ShieldCheck className="w-3 h-3" />
              <span>Trusted</span>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
            {providerName}
          </h3>
          <p className="text-gray-600 mt-1">{serviceName}</p>
        </div>

        {(duration || details) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {duration && (
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-xl font-medium">
                {duration}
              </span>
            )}
            {details && <span className="text-xs text-gray-500">{details}</span>}
          </div>
        )}

        <div className="flex items-baseline mb-7">
          <span className="text-3xl font-black text-gray-900">€{priceEUR}</span>
          <span className="ml-2 text-sm text-gray-500">({priceMAD} MAD)</span>
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-[#25D366] hover:bg-[#20C25A] active:bg-[#1EB850] 
                     text-white font-black uppercase tracking-wider 
                     py-4 rounded-2xl flex items-center justify-center gap-3 
                     transition-all duration-200 shadow-lg hover:shadow-xl 
                     hover:scale-[1.03] active:scale-[0.97]"
        >
          <WhatsAppLogo className="w-6 h-6" />
          Book via WhatsApp
        </button>
      </div>
    </div>
  );
};