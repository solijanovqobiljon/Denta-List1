import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaCamera, FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa'; 
// useNavigate ni import qilishni unutmang, bu router versiyasiga bog'liq
import { Link, useNavigate } from 'react-router-dom'; 

// *************************************************************************
// Xarita komponentlari: react-leaflet
// *************************************************************************
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet uchun asosiy CSS
import L from 'leaflet'; 

// Marker ikonkalari
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// Xarita belgisining default koordinatalari
const DEFAULT_CENTER = [40.9995, 71.6444]; // Namangan markazi

// =========================================================================
// JOY TANLASH FUNKSIONAL KOMPONENTASI
// =========================================================================
function LocationMarker({ onLocationSelected }) {
    const [position, setPosition] = useState(DEFAULT_CENTER);
    const map = useMapEvents({});

    // Xaritada ixtiyoriy joy bosilganda ishlaydigan funksiya
    map.on('click', (e) => {
        const newPos = [e.latlng.lat, e.latlng.lng];
        setPosition(newPos);
        
        // Manzilni simulyatsiya qilish
        const simulatedAddress = `Tanlangan joy: Lat ${newPos[0].toFixed(4)}, Lng ${newPos[1].toFixed(4)}`;
        onLocationSelected(newPos, simulatedAddress); 
    });

    // Marker Xaritada tanlangan joyni ko'rsatadi
    return position ? (
        <Marker position={position} icon={L.divIcon({ 
             className: 'custom-div-icon', 
             html: `<div style="background-color: ${'#00BCE4'}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`, 
             iconSize: [20, 20], 
             iconAnchor: [10, 10] 
        })}>
        </Marker>
    ) : null;
}

// =========================================================================
// ASOSIY PROFILE KOMPONENTASI
// =========================================================================
function Profile() {
    const navigate = useNavigate(); // Navigatsiya hooki
    
    // --- Ranglar va Ref lar ---
    const primaryBlue = '#00BCE4'; 
    const darkText = '#272937';
    const lightText = '#A3AED0';
    const inputBorder = '#3353FF';
    const activeCameraBg = '#00E42A';
    const fileInputRef = useRef(null);
    
    // ================== MAJBURRIY MAYDONLAR STATE'LARI ===================
    const [profileImage, setProfileImage] = useState(null); 
    const [firstName, setFirstName] = useState(''); // 👈 Yangi
    const [lastName, setLastName] = useState(''); // 👈 Yangi
    
    // Manzil state'lari
    const [address, setAddress] = useState("Namangan vil., Namangan tumani, Lola ko'chasi, 77-uy");
    const [isMapOpen, setIsMapOpen] = useState(false); 
    const [selectedMapAddress, setSelectedMapAddress] = useState("Manzilni belgilash uchun xaritani bosing");
    const [selectedCoordinates, setSelectedCoordinates] = useState(DEFAULT_CENTER);
    const [isAddressSelected, setIsAddressSelected] = useState(false); // 👈 Manzil tanlanganligini belgilash

    // Saqlash tugmasi faoliyatini hisoblash
    const isFormValid = firstName.trim() !== '' && lastName.trim() !== '' && isAddressSelected;
    
    // =========================================================================
    // FUNKSIYALAR
    // =========================================================================

    // Xarita bosilganda yoki siljitilganda ishlaydi
    const handleLocationSelected = (coords, newAddress) => {
        setSelectedCoordinates(coords);
        setSelectedMapAddress(newAddress);
        setIsAddressSelected(true); // Manzil tanlandi
    };

    // 1. Hozirgi joylashuvni tanlash funksiyasi (GPS)
    const handleSelectCurrentLocation = () => {
        const currentAddress = `Hozirgi joylashuv: Lat ${selectedCoordinates[0].toFixed(4)}, Lng ${selectedCoordinates[1].toFixed(4)} (Taxminiy)`;
        setAddress(currentAddress); // Asosiy manzilni yangilash
        setIsAddressSelected(true);
        handleMapClose(); 
    };

    // 2. Ko'rsatilgan joylashuvni tanlash funksiyasi (Xarita belgisi)
    const handleSelectShownLocation = () => {
        setAddress(selectedMapAddress); 
        setIsAddressSelected(true);
        handleMapClose(); 
    };
    
    // Saqlash funksiyasi - faqat forma haqiqiy bo'lsa ishlaydi
    const handleSave = () => {
        if (isFormValid) {
            console.log("Ma'lumotlar saqlandi:", { firstName, lastName, address, profileImage });
            // 'Saqlandi.jsx' ga o'tish
            navigate('/saqlandi'); 
        } else {
            alert("Iltimos, Ism, Familiya va Manzilni to'ldiring!");
        }
    };


    // Rasm yuklash funksiyalari (o'zgarmadi)
    const handleImageClick = () => { if (fileInputRef.current) fileInputRef.current.click(); };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };
    const handleMapOpen = () => setIsMapOpen(true);
    const handleMapClose = () => setIsMapOpen(false);


    return (
        <div className='min-h-screen bg-gray-100 flex justify-center'>
            
            <div className='w-full max-w-[450px] bg-white shadow-xl overflow-hidden'>
                
                {/* YUQORI QISM */}
                <div className={`h-[200px] bg-[${primaryBlue}] relative p-5 rounded-b-[40px]`}> 
                        <FaChevronLeft className='absolute top-5 left-5 text-white text-2xl cursor-pointer'
                        onClick={() => navigate(-1)}
                        />
                    <h2 className='text-white text-xl font-semibold text-center mt-[130px]'>
                        Ma'lumotlarni kiriting
                    </h2>
                    {/* Profil Rasmi Maydoni */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 bottom-[65px]'>
                        <div 
                            className='w-[111px] h-[111px] bg-white rounded-full flex items-center justify-center border-4 border-white shadow-md cursor-pointer'
                            onClick={handleImageClick}
                        >
                            <div className='w-full h-full rounded-full bg-gray-300 overflow-hidden'>
                                {profileImage ? (
                                    <img src={profileImage} alt="Profil rasmi" className="w-full h-full object-cover" />
                                ) : (
                                    <FaUserAlt className=' text-[70px] ml-[17px] mt-[16px] text-gray-500 p-2' />
                                )}
                            </div>
                            <div 
                                className={`absolute top-0 right-[-25px] w-[50px] h-[30px] bg-[${activeCameraBg}] rounded-full flex items-center justify-center cursor-pointer`}
                                onClick={handleImageClick}
                            >
                                <FaCamera className={`text-[20px] text-white`} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                
                {/* ASOSIY KIRITISH FORMASI */}
                <div className='pt-[30px] p-6'>
                    {/* Ism Inputi */}
                    <div className='mb-6'>
                        <label className={`block text-sm font-medium text-[${lightText}] mb-1`}>Ism</label>
                        <input 
                            type="text" 
                            placeholder="Ism" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`w-full h-[50px] border-[1px] border-gray-300 rounded-[10px] px-4 text-[${darkText}] font-medium text-lg focus:border-[${inputBorder}] focus:outline-none`} 
                        />
                    </div>
                    {/* Familiya Inputi */}
                    <div className='mb-6'>
                        <label className={`block text-sm font-medium text-[${lightText}] mb-1`}>Familiya</label>
                        <input 
                            type="text" 
                            placeholder="Familiya" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`w-full h-[50px] border-[1px] border-gray-300 rounded-[10px] px-4 text-[${darkText}] font-medium text-lg focus:border-[${inputBorder}] focus:outline-none`} 
                        />
                    </div>
                    
                    {/* 3. Manzil qismi */}
                    <div className='mb-8 '>
                        <label className={`block text-sm font-medium text-[${lightText}] mb-1 `}>Manzil</label>
                        <p className={`text-[${darkText}]  font-medium text-[15px] mb-3 `}>
                             {address.replace(/, /g, ', \n').split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}  
                                </React.Fragment>
                            ))}
                        </p>
                        
                        {/* O'zgartirish tugmasi: Modalni ochadi */}
                        <button
                            className={`w-full h-[50px] border-2 border-[${primaryBlue}] text-[${primaryBlue}] 
                                        rounded-[10px] flex items-center justify-center font-semibold text-lg hover:bg-gray-50 transition`}
                            onClick={handleMapOpen} 
                        >
                            <FaMapMarkerAlt className='mr-2' />
                            O'zgartirish
                        </button>
                    </div>

                    {/* 4. Saqlash tugmasi - Dinamik rang va faollik */}
                    <button
                        className={`w-full h-[55px] text-white text-[18px] font-semibold rounded-[10px] shadow-sm transition 
                                    ${isFormValid ? 'bg-green-500 hover:bg-green-600 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
                        onClick={handleSave}
                        disabled={!isFormValid}
                    >
                        Saqlash
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* XARITA MODALI KOMPONENTASI (REACT-LEAFLET BILAN) */}
            {/* ========================================================================= */}
            {isMapOpen && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-end z-50'>
                    
                    <div className='w-full max-w-[450px] h-[70vh] bg-white shadow-2xl rounded-t-[40px] flex flex-col overflow-hidden'>
                        
                        {/* Modal Tepasi */}
                        <div className='p-6 pt-0 flex-shrink-0'>
                            
                            <div className='flex justify-between items-center py-4'>
                                <FaChevronLeft className='text-2xl text-gray-500 cursor-pointer' onClick={handleMapClose} />
                                <h3 className='text-xl font-semibold text-gray-800'>Manzilni tanlash</h3>
                                <div className='w-6'></div> 
                            </div>

                            {/* Dinamik tanlangan manzil matni */}
                            <p className={`text-[${darkText}] font-medium text-[15px] mb-3 leading-5 text-center p-2 bg-gray-50 rounded-lg border border-gray-200`}>
                                Tanlangan manzil: <br/> **{selectedMapAddress}**
                            </p>
                        </div>

                        {/* XARITA MAYDONI */}
                        <div className='flex-grow px-6 -mt-3'>
                            <div className='h-full relative mb-6 rounded-lg overflow-hidden border border-gray-300'>
                                <MapContainer 
                                    center={selectedCoordinates} 
                                    zoom={14} 
                                    scrollWheelZoom={true} 
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationMarker onLocationSelected={handleLocationSelected} />
                                </MapContainer>
                            </div>
                        </div>

                        {/* Tugmalar */}
                        <div className='p-6 pt-0 flex-shrink-0'>
                            <div className='space-y-3'> 
                                <button
                                    className={`w-full h-[50px] border-2 border-green-500 text-green-500 
                                                rounded-[10px] flex items-center justify-center font-semibold text-lg hover:bg-green-50 transition`}
                                    onClick={handleSelectCurrentLocation} 
                                >
                                    Hozirgi joylashuvni tanlash
                                </button>
                                
                                <button
                                    className={`w-full h-[50px] border-2 border-sky-400 text-sky-400 
                                                rounded-[10px] flex items-center justify-center font-semibold text-lg hover:bg-sky-50 transition`}
                                    onClick={handleSelectShownLocation} 
                                >
                                    Ko'rsatilgan joylashuvni tanlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default Profile;