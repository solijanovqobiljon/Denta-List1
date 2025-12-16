import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaChevronLeft, 
    FaSearch, 
    FaRegBell, 
    FaStar, 
    FaHeart,
    } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuMessageSquareText } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";

// Rasm importlari
import doctor1Img from "../assets/denta1.jpg"; 
import doctor2Img from "../assets/denta2.jpg"; 
import { FaUserGroup } from 'react-icons/fa6';

// Rang konstantalari
const primaryTeal = '#00BCE4';
const darkText = '#272937';
const accentRed = '#FF6F47';

function Yoqtirishlar() {
    const navigate = useNavigate();

    // === STATE LAR ===
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [doctorToDeleteId, setDoctorToDeleteId] = useState(null);
    
    // Shifokorlar ro'yxati
    const [favoriteDoctors, setFavoriteDoctors] = useState([
        {
            id: 2,
            name: "Dr. Jamshid Rahmonov",
            specialty: "Ortoped",
            rating: 4.9,
            distance: 5,
            patients: 254,
            experience: 12,
            price: "250 000",
            image: doctor1Img,
            phone: "+998901234567",
            clinic: "Smile Dental clinic"
        },
        {
            id: 3,
            name: "Dr. O'tkir Rustamov",
            specialty: "Terapevt",
            rating: 4.9,
            distance: 4,
            patients: 124,
            experience: 10,
            price: "255 000",
            image: doctor2Img,
            phone: "+998901234568",
            clinic: "Shifo Nur Clinic"
        },
    ]);
    
    // === FUNKSIYALAR ===
    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoToNotifications = () => {
        navigate('/Notification'); 
    };
    
    // Qabulga yozilish
    const handleAppointment = (doctorId) => {
        const doctor = favoriteDoctors.find(doc => doc.id === doctorId);
        navigate('/qabulgayozilish', { 
            state: { 
                doctorId: doctorId,
                doctor: doctor
            } 
        }); 
    };
    
    // Chat funksiyasi
    const handleChat = (doctorId) => {
        const doctor = favoriteDoctors.find(doc => doc.id === doctorId);
        navigate(`/chat/${doctorId}`, { 
            state: { doctor: doctor }
        }); 
    };
    
    // Qo'ng'iroq funksiyasi
    const handleCall = (doctorId) => {
        const doctor = favoriteDoctors.find(doc => doc.id === doctorId);
        if (doctor && doctor.phone) {
            const confirmCall = window.confirm(`${doctor.name} ga qo'ng'iroq qilishni xohlaysizmi?\n${doctor.phone}`);
            if (confirmCall) {
                window.location.href = `tel:${doctor.phone}`;
            }
        } else {
            console.log(`Shifokor ${doctorId} ga qo'ng'iroq`);
        }
    };

    // Yoqtirishdan olib tashlash modalini ochish
    const handleRemoveFavoriteModalOpen = (doctorId) => {
        setDoctorToDeleteId(doctorId);
        setIsDeleteModalOpen(true);
    };

    // Yoqtirishdan olib tashlashni tasdiqlash
    const handleConfirmRemoveFavorite = () => {
        if (doctorToDeleteId !== null) {
            setFavoriteDoctors(currentDoctors => 
                currentDoctors.filter(doctor => doctor.id !== doctorToDeleteId)
            );
        }
        setIsDeleteModalOpen(false);
        setDoctorToDeleteId(null);
    };

    // Yoqtirishdan olib tashlashni bekor qilish
    const handleCancelRemoveFavorite = () => {
        setIsDeleteModalOpen(false);
        setDoctorToDeleteId(null);
    };

    // Chat sahifasiga o'tish
    const handleGoToChat = () => {
        navigate('/chats');
    };

    return (
        <div className='min-h-screen bg-gray-50 pb-[80px]'> 
            
            {/* Yuqori Sarlavha */}
            <header 
                className="p-4 pb-16 pt-8 rounded-b-[40px] shadow-lg relative"
                style={{backgroundColor: primaryTeal}}
            >
                <div className="flex justify-between items-center mb-6">
                    <FaChevronLeft 
                        className="text-white text-2xl cursor-pointer" 
                        onClick={handleGoBack}
                    />
                    <LuMessageSquareText 
                        className="text-white text-2xl cursor-pointer" 
                        onClick={handleGoToChat}
                    /> 
                </div>

                <h1 className="text-white text-2xl font-bold mb-4">
                    Menga yoqqan shifokorlar
                </h1>

                <div className='relative'>
                    <input 
                        type="text"
                        placeholder="Shifokor yoki klinika qidirish..."
                        className="w-full h-12 bg-white rounded-xl shadow-md pl-12 pr-12 text-sm focus:outline-none"
                    />
                    <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    <FaRegBell 
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg cursor-pointer'
                        onClick={handleGoToNotifications}
                    />
                </div>
            </header>

            {/* Asosiy Kontent - Shifokorlar Ro'yxati */}
            <div className='p-4 space-y-5'>
                {favoriteDoctors.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                        <FaHeart className="text-gray-300 text-5xl mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Yoqtirilgan shifokorlar yo'q
                        </h3>
                        <p className="text-gray-500">
                            Shifokorlarni yoqtirish uchun ♥ tugmasini bosing
                        </p>
                    </div>
                ) : (
                    favoriteDoctors.map((doctor) => (
                        <div 
                            key={doctor.id} 
                            className='bg-white rounded-2xl shadow-md p-4 flex flex-col'
                        >
                            {/* Shifokorning asosiy ma'lumotlari */}
                            <div className='flex items-center space-x-4 mb-4'>
                                <div className='relative flex-shrink-0'>
                                    <img 
                                        src={doctor.image || "https://via.placeholder.com/100"}
                                        alt={doctor.name}
                                        className="w-24 h-24 rounded-2xl object-cover"
                                    />
                                    <div className='absolute top-2 right-2 p-1 rounded-full bg-white opacity-90'>
                                        <FaHeart className="text-red-500 text-base" /> 
                                    </div>
                                    <div className='absolute bottom-1 right-1 px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full'>
                                        24/7
                                    </div>
                                </div>

                                <div className='flex-grow'>
                                    <h3 
                                        className="text-lg font-bold" 
                                        style={{color: darkText}}
                                    >
                                        {doctor.name}
                                    </h3>
                                    <p className='text-gray-500 text-sm mb-2'>{doctor.specialty}</p>

                                    <div className='flex items-center space-x-3 text-sm text-gray-600 mb-2'>
                                        <div className='flex items-center'>
                                            <FaStar className='text-yellow-500 text-xs mr-1' />
                                            <span>{doctor.rating}</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <span className='mr-1'>📍</span> 
                                            <span>{doctor.distance} km</span>
                                        </div>
                                    </div>

                                    <div className='text-xs text-gray-500 space-y-1'>
                                        <div className='flex items-center space-x-2'>
                                            <FaUserGroup className='text-gray-400' />
                                            <span>{doctor.patients} ta bemor</span>
                                            <span>|</span>
                                            <span>{doctor.experience}+ tajriba</span>
                                        </div>
                                        <p className='font-semibold text-sm'>
                                            {doctor.price} so'm o'rtacha narx
                                        </p>
                                        <p className='text-gray-400 text-xs'>
                                            {doctor.clinic}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pastki tugmalar qismi */}
                            <div className='flex items-center space-x-3 pt-3 border-t border-gray-100'>
                                <button
                                    onClick={() => handleAppointment(doctor.id)}
                                    className="flex-1 h-12 border text-base font-semibold rounded-full hover:bg-cyan-50 transition"
                                    style={{borderColor: primaryTeal, color: primaryTeal}}
                                >
                                    Qabulga yozilish
                                </button>
                                
                                <button
                                    onClick={() => handleChat(doctor.id)}
                                    className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-purple-200 transition"
                                    style={{backgroundColor: '#7B7BFF'}}
                                >
                                    <LuMessageSquareText className="text-white text-lg" /> 
                                </button>
                                
                                <button
                                    onClick={() => handleCall(doctor.id)}
                                    className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-green-600 transition"
                                    style={{backgroundColor: '#00E42A'}}
                                >
                                    <FiPhone className="text-white text-lg" /> 
                                </button>

                                <button
                                    onClick={() => handleRemoveFavoriteModalOpen(doctor.id)}
                                    className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-red-500 transition"
                                    style={{backgroundColor: accentRed}}
                                >
                                    <RiDeleteBin6Line className="text-white text-lg" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Yoqtirishdan olib tashlash modali */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl mx-6 p-6 w-11/12 max-w-sm">
                        <h3 
                            className="text-center text-lg font-semibold mb-6"
                            style={{color: darkText}}
                        >
                            Rostdan ham o'chirmoqchimisiz?
                        </h3>

                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={handleCancelRemoveFavorite}
                                className="w-full h-12 text-white text-base font-semibold rounded-xl hover:bg-cyan-600 transition"
                                style={{backgroundColor: primaryTeal}}
                            >
                                Yo'q
                            </button>

                            <button
                                onClick={handleConfirmRemoveFavorite}
                                className="w-full h-12 border text-base font-semibold rounded-xl hover:bg-gray-100 transition"
                                style={{borderColor: primaryTeal, color: primaryTeal}}
                            >
                                Ha
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Yoqtirishlar;