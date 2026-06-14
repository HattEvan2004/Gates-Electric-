import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useSiteContent } from '../sanity/useSiteContent';

export default function Contact() {
  const site = useSiteContent();
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-5/12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{site?.contactHeading || 'Need Electrical Work Done? Get a Free Quote Today.'}</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {site?.contactSubtitle || "Contact us to discuss your residential or commercial electrical needs. We\u2019re ready to provide expert advice and reliable service."}
            </p>

            <div className="space-y-8">
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-50 text-brand-red rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</h4>
                  <a href="tel:9022770458" className="text-xl font-bold text-slate-900 hover:text-brand-red transition-colors">{site?.phone || '(902) 277-0458'}</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-50 text-brand-red rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</h4>
                  <a href="mailto:kyledgates@hotmail.com" className="text-lg font-bold text-slate-900 hover:text-brand-red transition-colors truncate block max-w-[250px] sm:max-w-none">{site?.email || 'kyledgates@hotmail.com'}</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-50 text-brand-red rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-lg font-medium text-slate-900 leading-tight">
                    {(site?.address || '436 Highway 14\nChester, NS B0J 1J0').split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-50 text-brand-red rounded-lg flex items-center justify-center mr-5 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Hours</h4>
                  <p className="text-lg font-medium text-slate-900">
                    {(site?.hours || 'Monday to Friday, 8am\u20135pm').split('\n')[0]}<br />
                    <span className="text-slate-500 text-sm font-normal">Saturday &amp; Sunday Closed</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Quote</h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all"
                      placeholder="(902) 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                  <select 
                    id="service" 
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all bg-white"
                  >
                    <option value="" disabled>Select a project type...</option>
                    <option value="residential">Residential Service</option>
                    <option value="commercial">Commercial Service</option>
                    <option value="new-build">New Build / Construction</option>
                    <option value="renovation">Renovation</option>
                    <option value="panel">Panel Upgrade / Generator</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all resize-none"
                    placeholder="Tell us about your electrical needs..."
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Request Quote
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
