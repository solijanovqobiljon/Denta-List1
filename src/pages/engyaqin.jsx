import React, { useState } from 'react';
import { MapPin, Star, MessageCircle, Calendar, Search, Mic, X, Clock, Baby } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import Map from "../assets/map.png"

const doctors = [
  {
    id: 11,
    name: "Dr. Nodira Karimova",
    specialty: "Ortodont",
    rating: 5.0,
    clinic: "Tibbiy Klinika",
    distance: "350 m",
    nextAvailable: "Dushanba, 6 Iyul 2023 • 07:00",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    position: { top: '30%', left: '50%' },
    gender: 'female',
    region: 'Toshkent',
    fullImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    patients: "180 ta bemor",
    exp: "8+ yil",
    price: "300 000 so'm",
    location: "Toshkent sh., Yunusobod t., 15-uy",
    is247: true,
    isOnline: true,
    job: "Ortodont"
  },
  {
    id: 12,
    name: "Dr. Jahongir Ergashev",
    specialty: "Umumiy Stomatolog",
    rating: 4.7,
    clinic: "Tish Davolash Markazi",
    distance: "520 m",
    nextAvailable: "Seshanba, 7 Iyul 2023 • 09:00",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
    position: { top: '55%', left: '25%' },
    gender: 'male',
    region: 'Samarqand',
    fullImg: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    patients: "220 ta bemor",
    exp: "10+ yil",
    price: "280 000 so'm",
    location: "Samarqand sh., Registon ko'chasi, 25-uy",
    is247: false,
    isOnline: true,
    job: "Umumiy Stomatolog"
  },
  {
    id: 13,
    name: "Dr. Malika Nurmatova",
    specialty: "Ortodont",
    rating: 4.9,
    clinic: "Tabassum Klinikasi",
    distance: "780 m",
    nextAvailable: "Dushanba, 6 Iyul 2023 • 14:00",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop",
    position: { top: '20%', left: '75%' },
    gender: 'female',
    region: 'Buxoro',
    fullImg: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    patients: "150 ta bemor",
    exp: "6+ yil",
    price: "320 000 so'm",
    location: "Buxoro sh., Labi Hovuz ko'chasi, 10-uy",
    is247: true,
    isOnline: false,
    job: "Ortodont"
  },
  {
    id: 14,
    name: "Dr. Aziz Rakhimov",
    specialty: "Bolalar Stomatolgi",
    rating: 4.8,
    clinic: "Bolalar Tish Klinikasi",
    distance: "420 m",
    nextAvailable: "Chorshanba, 8 Iyul 2023 • 10:00",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop",
    position: { top: '25%', left: '30%' },
    gender: 'male',
    region: 'Toshkent',
    fullImg: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    patients: "200 ta bemor",
    exp: "9+ yil",
    price: "290 000 so'm",
    location: "Toshkent sh., Chilonzor t., 45-uy",
    is247: false,
    isOnline: true,
    job: "Bolalar Stomatolgi"
  },
  {
    id: 15,
    name: "Dr. Dilnoza Sharipova",
    specialty: "Kosmetik Stomatolog",
    rating: 4.6,
    clinic: "Estetik Tabassum",
    distance: "890 m",
    nextAvailable: "Payshanba, 9 Iyul 2023 • 13:00",
    avatar: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=100&h=100&fit=crop",
    position: { top: '50%', left: '80%' },
    gender: 'female',
    region: 'Farg\'ona',
    fullImg: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
    patients: "170 ta bemor",
    exp: "7+ yil",
    price: "350 000 so'm",
    location: "Farg'ona sh., Mustaqillik ko'chasi, 33-uy",
    is247: true,
    isOnline: true,
    job: "Kosmetik Stomatolog"
  },
  {
    id: 16,
    name: "Dr. Jamshid Ismoilov",
    specialty: "Ortodont",
    rating: 4.9,
    clinic: "Zamonaviy Stomatologiya",
    distance: "650 m",
    nextAvailable: "Juma, 10 Iyul 2023 • 11:00",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop",
    position: { top: '65%', left: '55%' },
    gender: 'male',
    region: 'Andijon',
    fullImg: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    patients: "210 ta bemor",
    exp: "11+ yil",
    price: "310 000 so'm",
    location: "Andijon sh., Boburshox ko'chasi, 18-uy",
    is247: false,
    isOnline: false,
    job: "Ortodont"
  },
  {
    id: 17,
    name: "Dr. Sevara Abdullayeva",
    specialty: "Umumiy Stomatolog",
    rating: 4.7,
    clinic: "Sog'lom Tish",
    distance: "480 m",
    nextAvailable: "Shanba, 11 Iyul 2023 • 08:00",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    position: { top: '45%', left: '15%' },
    gender: 'female',
    region: 'Namangan',
    fullImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    patients: "190 ta bemor",
    exp: "8+ yil",
    price: "270 000 so'm",
    location: "Namangan sh., Navoiy ko'chasi, 22-uy",
    is247: true,
    isOnline: true,
    job: "Umumiy Stomatolog"
  }
];

function DoctorAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [regionFilter, setRegionFilter] = useState('all');
  const [secondaryFilter, setSecondaryFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listeningText, setListeningText] = useState('');
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter(doctor => {
    // Region filteri har doim qo'llaniladi
    const regionMatch = regionFilter === 'all' || doctor.region === regionFilter;

    // Secondary filter (gender, specialty, 247, search)
    let secondaryMatch = true;

    if (secondaryFilter) {
      switch (secondaryFilter.type) {
        case 'gender':
          secondaryMatch = doctor.gender === secondaryFilter.value;
          break;
        case 'specialty':
          if (secondaryFilter.value === 'pediatric') {
            secondaryMatch = doctor.specialty === "Bolalar Stomatolgi";
          }
          // Qo'shimcha specialty filterlarni qo'shishingiz mumkin
          break;
        case '247':
          secondaryMatch = doctor.is247 === true;
          break;
        case 'search':
          secondaryMatch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase());
          break;
        default:
          secondaryMatch = true;
      }
    }

    return regionMatch && secondaryMatch;
  });

  const regions = ['Toshkent', 'Samarqand', 'Buxoro', 'Farg\'ona', 'Andijon', 'Namangan', 'Xorazm', 'Navoiy', 'Qashqadaryo', 'Surxondaryo', 'Jizzax', 'Sirdaryo', 'Qoraqalpog\'iston'];

  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value);
    // Region o'zgarganda search query tozalanadi
    if (secondaryFilter?.type === 'search') {
      setSearchQuery('');
      setSecondaryFilter(null);
    }
  };

  const handleGenderChange = (genderType) => {
    // Agar gender filter allaqachon tanlangan bo'lsa, o'chirish
    if (secondaryFilter?.type === 'gender' && secondaryFilter.value === genderType) {
      setSecondaryFilter(null);
    } else {
      setSecondaryFilter({ type: 'gender', value: genderType });
    }
    setSearchQuery('');
  };

  const handleSpecialtyChange = (specialtyType) => {
    // Agar specialty filter allaqachon tanlangan bo'lsa, o'chirish
    if (secondaryFilter?.type === 'specialty' && secondaryFilter.value === specialtyType) {
      setSecondaryFilter(null);
    } else {
      setSecondaryFilter({ type: 'specialty', value: specialtyType });
    }
    setSearchQuery('');
  };

  const handle247FilterToggle = () => {
    // Agar 247 filter allaqachon tanlangan bo'lsa, o'chirish
    if (secondaryFilter?.type === '247') {
      setSecondaryFilter(null);
    } else {
      setSecondaryFilter({ type: '247', value: true });
    }
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      setSecondaryFilter({ type: 'search', value: value });
    } else {
      // Agar search bo'sh bo'lsa, secondary filter ni o'chirish
      setSecondaryFilter(null);
    }
  };

  const clearAllFilters = () => {
    setRegionFilter('all');
    setSecondaryFilter(null);
    setSearchQuery('');
  };

  const clearSecondaryFilter = () => {
    setSecondaryFilter(null);
    setSearchQuery('');
  };

  const goBack = () => {
    navigate(-1);
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Kechirasiz, brauzeringiz ovozli qidiruvni qo\'llab-quvvatlamaydi.');
      return;
    }

    // Secondary filterni tozalash
    setSecondaryFilter(null);
    setSearchQuery('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'uz-UZ';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setListeningText('Gapiring...');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (interimTranscript) setListeningText(interimTranscript);
      else if (finalTranscript) setListeningText(finalTranscript);

      if (finalTranscript) {
        setSearchQuery(finalTranscript);
        setSecondaryFilter({ type: 'search', value: finalTranscript });
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setListeningText('');
    };

    recognition.onend = () => {
      setIsListening(false);
      setListeningText('');
    };

    recognition.start();
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-100 font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Map})`,
          filter: 'brightness(0.95)'
        }}
      />
      <div className="absolute inset-0 bg-white/10" />

      <button onClick={goBack} className="absolute w-[50px] cursor-pointer bg-white flex items-center justify-center h-[50px] top-4 left-4 rounded-full">
        <IoMdArrowBack className='text-2xl text-gray-400' />
      </button>

      <div className="absolute top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-2/3 lg:w-1/2 z-20">
  <div className={`bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 transition-all duration-300 ${isListening ? 'ring-4 ring-purple-200 border-purple-500' : ''}`}>
    <Search className="w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="Shifokor nomini qidiring..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="flex-1 outline-none text-sm bg-transparent"
    />
    {(searchQuery || secondaryFilter) && (
      <button
        onClick={clearSecondaryFilter}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        <X className="w-4 h-4" />
      </button>
    )}
    <button
      onClick={startVoiceSearch}
      className={`transition-all p-2 rounded-full ${isListening ? 'bg-red-50 text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#00C1F3] hover:bg-purple-50'}`}
    >
      <Mic className="w-5 h-5" />
    </button>
  </div>

  {/* FILTERLAR - flex-wrap qo'shildi */}
 <div className="flex flex-wrap gap-2 mt-3 pb-2">
  <button
    onClick={clearAllFilters}
    className={`px-4 py-2 rounded-full text-xs shadow-md whitespace-nowrap transition font-medium flex-shrink-0 ${regionFilter === 'all' && !secondaryFilter ? 'bg-[#00C1F3] text-white' : 'bg-white text-gray-700 hover:bg-purple-50'}`}
  >
    Hammasi
  </button>

  <div className="flex-shrink-0">
    <select
      value={regionFilter}
      onChange={handleRegionChange}
      className="px-4 py-2 bg-white rounded-full text-xs shadow-md whitespace-nowrap hover:bg-blue-50 transition border-none outline-none cursor-pointer appearance-none pr-8 text-gray-700 font-medium flex-shrink-0 min-w-[160px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1rem'
      }}
    >
      <option value="all">Barcha Viloyatlar</option>
      {regions.map((region) => (
        <option key={region} value={region}>{region}</option>
      ))}
    </select>
  </div>

  <button
    onClick={() => handleGenderChange('female')}
    className={`px-4 py-2 rounded-full text-xs shadow-md whitespace-nowrap transition font-medium flex-shrink-0 ${secondaryFilter?.type === 'gender' && secondaryFilter.value === 'female' ? 'bg-[#00C1F3] text-white' : 'bg-white text-gray-700 hover:bg-purple-50'}`}
  >
    Ayol Doktor
  </button>

  <button
    onClick={() => handleGenderChange('male')}
    className={`px-4 py-2 rounded-full text-xs shadow-md whitespace-nowrap transition font-medium flex-shrink-0 ${secondaryFilter?.type === 'gender' && secondaryFilter.value === 'male' ? 'bg-[#00C1F3] text-white' : 'bg-white text-gray-700 hover:bg-purple-50'}`}
  >
    Erkak Doktor
  </button>

  <button
    onClick={handle247FilterToggle}
    className={`px-4 py-2 rounded-full text-xs shadow-md whitespace-nowrap transition font-medium flex items-center justify-center gap-1 flex-shrink-0 ${secondaryFilter?.type === '247' ? 'bg-[#00C1F3] text-white' : 'bg-white text-gray-700 hover:bg-purple-50'}`}
  >
    <Clock className="w-3 h-3" />
    24/7
  </button>

  <button
    onClick={() => handleSpecialtyChange('pediatric')}
    className={`px-4 py-2 rounded-full text-xs shadow-md whitespace-nowrap transition font-medium flex items-center justify-center gap-1 flex-shrink-0 ${secondaryFilter?.type === 'specialty' && secondaryFilter.value === 'pediatric' ? 'bg-[#00C1F3] text-white' : 'bg-white text-gray-700 hover:bg-purple-50'}`}
  >
    <Baby className="w-3 h-3" />
    Bolalar Doktori
  </button>
</div>

  {/* Active Filters ko'rsatish */}
  <div className="flex flex-wrap gap-2 mt-2"> {/* flex-wrap qo'shildi */}
    {regionFilter !== 'all' && (
      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
        Viloyat: {regionFilter}
        <button
          onClick={() => setRegionFilter('all')}
          className="ml-1.5 text-blue-700 hover:text-blue-900"
        >
          <X className="w-3 h-3" />
        </button>
      </span>
    )}

    {secondaryFilter && (
      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
        {secondaryFilter.type === 'gender' && `Jins: ${secondaryFilter.value === 'female' ? 'Ayol' : 'Erkak'}`}
        {secondaryFilter.type === 'specialty' && `Mutaxassislik: ${secondaryFilter.value === 'pediatric' ? 'Bolalar Doktori' : secondaryFilter.value}`}
        {secondaryFilter.type === '247' && `24/7 Doktorlar`}
        {secondaryFilter.type === 'search' && `Qidiruv: "${searchQuery}"`}
        <button
          onClick={clearSecondaryFilter}
          className="ml-1.5 text-green-700 hover:text-green-900"
        >
          <X className="w-3 h-3" />
        </button>
      </span>
    )}
  </div>
</div>

      <div className="absolute m-auto w-[70%] mt-[120px] h-[40%] inset-0">
        {filteredDoctors.map((doctor) => {
          const isSelected = selectedDoctor?.id === doctor.id;
          return (
            <div
              key={doctor.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 hover:z-50 ${isSelected ? 'z-[60] scale-125' : 'z-10'}`}
              style={{ top: doctor.position.top, left: doctor.position.left }}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="relative group">
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg border-2 overflow-hidden transition-all ${isSelected ? 'border-purple-600 ring-4 ring-purple-600/20' : 'border-white bg-white group-hover:border-[#00C1F3]'}`}>
                  <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white shadow-sm border border-white">
                  {doctor.rating}
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                  {doctor.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isListening && (
        <div className="absolute bottom-32 md:bottom-20 left-1/2 transform -translate-x-1/2 z-[90] w-full max-w-md px-4">
          <div className="bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Eshitilmoqda...</span>
            </div>
            <p className="text-lg md:text-xl font-semibold text-center leading-tight">
              "{listeningText}"
            </p>
            <div className="flex gap-1 mt-3 h-3 items-end">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 bg-white/50 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 md:hidden z-[70] pb-4 px-4 bg-gradient-to-t from-gray-100/50 to-transparent">
        <div className="flex justify-center">
          <DoctorCard doctor={selectedDoctor || filteredDoctors[0]} compact />
        </div>
      </div>

      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[70]">
        <DoctorCard doctor={selectedDoctor || filteredDoctors[0]} />
      </div>
    </div>
  );
}

function DoctorCard({ doctor, compact = false }) {
  if (!doctor) return null;

  return (
    <div className={`bg-white/90 mb-[60px] backdrop-blur-sm rounded-2xl shadow-xl border-white/50 py-3 px-4 ${compact ? 'w-full max-w-sm' : 'w-96'} transition-all hover:shadow-2xl`}>
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-100"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-400 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs  text-[#00C1F3] bg-purple-50 px-2 py-0.5 rounded-full font-medium">{doctor.specialty}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-700">{doctor.rating}</span>
            </div>
            {doctor.is247 && (
              <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                24/7
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
        <MapPin className="w-4 h-4 text-[#00C1F3] shrink-0" />
        <span className="truncate flex-1">{doctor.clinic}</span>
        <span className=" text-[#00C1F3] font-bold whitespace-nowrap">{doctor.distance}</span>
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <Calendar className="w-3 h-3" />
        <span>{doctor.nextAvailable}</span>
      </div>

      <div className="flex gap-3 mt-4">
        <Link to={`/chat/${doctor.id}`} className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition">
            <MessageCircle className="w-4 h-4" />
            Xabar
          </button>
        </Link>
        <Link to={"/qabulgayozilish"} className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00C1F3] rounded-xl text-sm font-medium text-white transition shadow-lg shadow-purple-500/20">
            <Calendar className="w-4 h-4" />
            Band qilish
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DoctorAppointment;
