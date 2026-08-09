import Link from 'next/link';

export const metadata = {
  title: 'TOPROP | Property Management in Israel',
  description: 'Full-service property management for Israeli properties — long-term rentals, Airbnb, commercial, and investments.',
};

export default function EnglishPage() {
  return (
    <div>
      <section className="bg-navy text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
          Managing Property. Maximizing Investment.
        </h1>
        <p className="text-white/70 text-xl max-w-3xl mx-auto mb-8">
          TOPROP provides full-service property management for residential and commercial properties in Israel — for local and overseas owners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/property-360" className="bg-gold hover:bg-gold-soft text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
            Check My Property
          </Link>
          <Link href="/contact" className="border-2 border-white/50 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Long-Term Rentals', body: 'Professional tenant management, contracts, maintenance and monthly reporting.' },
            { title: 'Airbnb & Short Term', body: 'Feasibility analysis first, then full Airbnb management and optimization.' },
            { title: 'Commercial Properties', body: 'Offices, retail and warehouses managed with business-first thinking.' },
          ].map((item) => (
            <div key={item.title} className="p-6">
              <h3 className="font-semibold text-navy text-lg mb-2">{item.title}</h3>
              <p className="text-brand-muted text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
