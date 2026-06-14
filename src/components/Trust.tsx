import React from 'react';
import { Home, MapPin, BadgeDollarSign } from 'lucide-react';

export default function Trust() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Serving Chester, the South Shore, and surrounding areas of Nova Scotia, <strong className="text-slate-900 font-semibold">Gates Electric Ltd.</strong> helps homeowners and businesses with dependable electrical work, upgrades, installations, and service calls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center mb-6">
              <Home className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Residential & Commercial</h3>
            <p className="text-slate-600">
              Expert solutions tailored for your home or business infrastructure.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Local South Shore Service</h3>
            <p className="text-slate-600">
              Proudly based in Chester, NS, and serving the surrounding communities.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center mb-6">
              <BadgeDollarSign className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Free Quotes Available</h3>
            <p className="text-slate-600">
              Transparent, upfront communication and pricing on all local projects.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
