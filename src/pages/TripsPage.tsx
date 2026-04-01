import { useEffect } from 'react';
import { trips } from '../lib/data';
import { MapPin, Clock, Users, Car } from 'lucide-react';

export const TripsPage = () => {
  useEffect(() => {
    document.title = 'Day Trips Taghazout | Paradise Valley & Excursions - Fair Prices';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Best day trips from Taghazout: Paradise Valley, Imsouane, Essaouira. Compare prices and book trusted local guides directly via WhatsApp.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Day Trips & Excursions</h1>
          </div>
          <p className="text-green-100 text-lg max-w-2xl">
            Discover the best of Morocco with trusted local guides. From Paradise Valley to Essaouira.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Info Banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-2">🎒 What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-800">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Local guide/driver</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              <span>Transportation</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Flexible timing</span>
            </div>
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            
            return (
              <div
                key={trip.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Trip Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${
                  trip.name.includes('Paradise') ? 'from-green-200 to-blue-200' :
                  trip.name.includes('Imsouane') ? 'from-blue-200 to-cyan-200' :
                  trip.name.includes('Essaouira') ? 'from-purple-200 to-blue-200' :
                  trip.name.includes('Dunes') ? 'from-yellow-200 to-orange-200' :
                  'from-green-200 to-emerald-200'
                } flex items-center justify-center`}>
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-white font-semibold">{trip.location}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Trusted Badge */}
                  {trip.isTrusted && (
                    <div className="mb-3">
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Trusted Guide
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {trip.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {trip.description}
                  </p>

                  {/* Trip Details */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {trip.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {trip.location}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">€{trip.priceEUR}</span>
                      <span className="text-sm text-gray-500">({trip.priceMAD} MAD)</span>
                    </div>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>

                  {/* ✅ COMING SOON BUTTON */}
                  <button
                    disabled
                    className="block w-full bg-gray-300 text-gray-600 font-semibold py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Coming Soon
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Booking opening very soon
                  </p>

                </div>
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-green-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🗺️ Trip Planning Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What to Bring:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Comfortable walking shoes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Swimwear & towel (for Paradise Valley)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Sunscreen & water bottle
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Good to Know:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Most trips include lunch stops
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Guides speak English & French
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  Pickup from your accommodation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};