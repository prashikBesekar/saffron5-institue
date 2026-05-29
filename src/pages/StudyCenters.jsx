import { Link } from 'react-router-dom';

const centers = [
  { 
    state: 'Maharashtra', 
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Amravati'], 
    icon: '🏙️',
    image: "/states/maharashtra.jpg" 
  },
  { 
    state: 'Delhi NCR', 
    cities: ['New Delhi', 'Gurgaon', 'Noida'], 
    icon: '🏛️',
    image: "/states/delhi.jpg" 
  },
    { 
    state: 'Bihar', 
    cities: ['Patna', 'Gaya', 'Bhagalpur'], 
    icon: '🏗️',
    image: "/states/Bihar.jpg" 
  },
    { 
    state: 'Haryana', 
    cities: ['Gurgaon', 'Faridabad', 'Ambala'], 
    icon: '🏗️',
    image: "/states/haryana.jpg" 
  },
  { 
    state: 'Karnataka', 
    cities: ['Bengaluru', 'Mysuru', 'Hubli'], 
    icon: '🌆',
    image: "/states/karnataka.jpg" 
  },
  { 
    state: 'Tamil Nadu', 
    cities: ['Chennai', 'Coimbatore', 'Madurai'], 
    icon: '🌴',
    image: "/states/tamilnadu.jpg" 
  },
  { 
    state: 'West Bengal', 
    cities: ['Kolkata', 'Siliguri', 'Durgapur'], 
    icon: '🎭',
    image: "/states/westbengal.jpg" 
  },
  { 
    state: 'Gujarat', 
    cities: ['Ahmedabad', 'Surat', 'Vadodara'], 
    icon: '🏗️',
    image: "/states/gujarat.jpg" 
  },
    { 
    state: 'Goa', 
    cities: ['Panaji', 'Margao', 'Mapusa'], 
    icon: '🏖️',
    image: "/states/goa.jpg" 
  },
    { 
    state: 'Sikkim', 
    cities: ['Gangtok', 'Namchi', 'Mangan'], 
    icon: '🏔️',
    image: "/states/sikkim.jpg" 
  },
    { 
    state: 'Assam', 
    cities: ['Guwahati', 'Dibrugarh', 'Silchar'], 
    icon: '🏗️',
    image: "/states/assam.jpg" 
  },
    { 
    state: 'Andhra Pradesh', 
    cities: ['Visakhapatnam', 'Vijayawada', 'Guntur'], 
    icon: '🏔️',
    image: "/states/andhrapradesh.jpg" 
  },
    { 
    state: 'Kerala', 
    cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode'], 
    icon: '🏖️',
    image: "/states/kerala.jpg" 
  },
    { 
    state: 'Punjab', 
    cities: ['Chandigarh', 'Amritsar', 'Ludhiana'], 
    icon: '🏔️',
    image: "/states/punjab.jpg" 
  },
    { 
    state: 'Rajasthan', 
    cities: ['Jaipur', 'Udaipur', 'Jodhpur'], 
    icon: '🏔️',
    image: "/states/rajasthan.jpg" 
  },
    { 
    state: 'Madhya Pradesh', 
    cities: ['Bhopal', 'Indore', 'Gwalior'], 
    icon: '🏗️',
    image: "/states/mp.jpg" 
  },
    { 
    state: 'Uttar Pradesh', 
    cities: ['Lucknow', 'Kanpur', 'Varanasi'], 
    icon: '🏗️',
    image: "/states/up.jpg" 
  },
    { 
    state: 'Manipur', 
    cities: ['Imphal', 'Churachandpur', 'Thoubal'], 
    icon: '🏔️',
    image: "/states/manipur.jpg" 
  },
    { 
    state: 'Himachal Pradesh', 
    cities: ['Shimla', 'Dharamshala', 'Manali'], 
    icon: '🏔️',
    image: "/states/himachal.jpg" 
  },
    { 
    state: 'Mizoram', 
    cities: ['Aizawl', 'Lunglei', 'Champhai'], 
    icon: '🏔️',
    image: "/states/mizoram.jpg" 
  },
    { 
    state: 'Meghalaya', 
    cities: ['Shillong', 'Tura', 'Jowai'], 
    icon: '🏔️',
    image: "/states/meghalaya.jpg" 
  },
    { 
    state: 'Chhattisgarh', 
    cities: ['Raipur', 'Bhilai', 'Korba'], 
    icon: '🏗️',
    image: "/states/chhattisgarh.jpg" 
  },
    { 
    state: 'Nagaland', 
    cities: ['Kohima', 'Dimapur', 'Mokokchung'], 
    icon: '🏔️',
    image: "/states/nagaland.jpg" 
  },
    { 
    state: 'Odisha', 
    cities: ['Bhubaneswar', 'Cuttack', 'Sambalpur'], 
    icon: '🏗️',
    image: "/states/odisha.jpg" 
  },
    { 
    state: 'Arunachal Pradesh', 
    cities: ['Itanagar', 'Naharlagun', 'Pasighat'], 
    icon: '🏔️',
    image: "/states/arunachalpradesh.jpg" 
  },
    { 
    state: 'Tripura', 
    cities: ['Agartala', 'Unakoti', 'Dhalai'], 
    icon: '🏗️',
    image: "/states/tripura.jpg" 
  },
  // Add more states with images as needed
];

function StudyCenters() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-green-800 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Pan India Network
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Our Study Centers
          </h1>
          <p className="text-green-100 text-base">
            We have support centers across 28 states in India
          </p>
        </div>
      </div>

      {/* Centers Grid with Images */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* State Image */}
                <div className="h-52 relative">
                  <img 
                    src={center.image} 
                    alt={center.state}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {center.state}
                  </div>
                </div>

                {/* Cities */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {center.cities.map((city, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-green-800 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Don't see your city?
            </h2>
            <p className="text-green-100 mb-6 max-w-md mx-auto">
              We are rapidly expanding. Contact us and we may open a center near you soon.
            </p>
            <a
              href="https://wa.me/917218315876"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-8 py-3.5 rounded-2xl hover:bg-amber-400 hover:text-green-900 transition-all"
            >
              💬 Connect on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCenters;