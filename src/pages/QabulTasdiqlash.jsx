import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack, IoCalendarOutline, IoTimeOutline, IoLocation, IoStar, IoCheckmarkCircle } from 'react-icons/io5';
import { CiHeart } from "react-icons/ci";

function QabulTasdiqlash() {
    const navigate = useNavigate();
    const location = useLocation();

    // appointment ni useLocation orqali yoki localStorage dan oxirgi yozuvni olish
    const appointment = location.state?.appointment || (() => {
        try {
            const arr = JSON.parse(localStorage.getItem('myAppointments') || '[]');
            // Eng oxirgi yozuvni qaytaradi
            return arr.length ? arr[arr.length - 1] : null;
        } catch (e) {
            console.error("LocalStorage ma'lumotlarini o'qishda xato:", e);
            return null;
        }
    })();

    // Ma'lumotlar to'liq kelmaganda (Xatolik sahifasi)
    if (!appointment || !appointment.doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
                    <p className="text-2xl font-extrabold text-red-600 mb-4">Ma'lumot topilmadi!</p>
                    <p className="text-gray-600 mb-6">Iltimos, qabulga yozilish jarayonini qayta boshlang.</p>
                    <button 
                        onClick={() => navigate('/boshsaxifa')} 
                        className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-colors shadow-lg"
                    >
                        Bosh sahifaga qaytish
                    </button>
                </div>
            </div>
        );
    }

    // Obyektdagi ma'lumotlarni xavfsiz dekonstruksiya qilish
    const { doctor, date, time, note } = appointment;

    return (
        // Asosiy konteyner: Har doim kamida ekran balandligicha bo'ladi va ichidagi kontentni vertikal joylashtiradi
        <div id='dd' className="h-[200vh] sm:h-[180vh]   bg-gray-50 flex flex-col">
            
            {/* Header qismi: O'lchami o'zgarmas (flex-shrink-0) */}
            <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-b-[40px] pt-6 pb-24 shadow-xl flex-shrink-0">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => navigate('/boshsaxifa')} 
                            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                        >
                            <IoArrowBack size={24} />
                        </button>
                        <h1 className="text-white text-xl sm:text-2xl font-bold">Qabul tasdiqlandi</h1>
                        <div className="w-6"></div> 
                    </div>

                    {/* Tasdiqlash xabari */}
                    <div className="text-center mt-8">
                        <IoCheckmarkCircle size={60} className="text-white mx-auto animate-bounce-slow" />
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Muvaffaqiyatli! 🎉</h2>
                        <p className="text-cyan-100 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mt-2">
                            Qabulingiz **{time}** ga, **{doctor.name}**ga muvaffaqiyatli ro'yxatdan o'tkazildi.
                        </p>
                    </div>
                </div>
            </div>

            {/* Asosiy kontent: Qolgan bo'sh joyni egallaydi (flex-1) */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full -mt-16 pb-12">
                
                {/* 1. Asosiy ma'lumotlar bloki (Sana & Vaqt) */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl mb-8 border-t-8 border-emerald-500">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-5 border-b pb-3">Qabul tafsilotlari</h3>
                    
                    {/* Sana va Vaqt kartochkalari gridi. Mobil va kichik ekranlarda vertikal, undan kattasida gorizontal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Sana kartochkasi */}
                        <div className="p-4 bg-blue-50 rounded-xl flex items-center gap-4">
                            <div className="bg-blue-200 p-3 rounded-full flex-shrink-0">
                                <IoCalendarOutline size={24} className="text-blue-700" />
                            </div>
                            <div>
                                <div className="text-gray-600 font-medium text-sm">Sana</div>
                                <div className="text-blue-700 font-extrabold text-lg">{date}</div>
                            </div>
                        </div>

                        {/* Vaqt kartochkasi */}
                        <div className="p-4 bg-cyan-50 rounded-xl flex items-center gap-4">
                            <div className="bg-cyan-200 p-3 rounded-full flex-shrink-0">
                                <IoTimeOutline size={24} className="text-cyan-700" />
                            </div>
                            <div>
                                <div className="text-gray-600 font-medium text-sm">Vaqt</div>
                                <div className="text-cyan-700 font-extrabold text-lg">{time}</div>
                            </div>
                        </div>
                    </div>

                    {/* Qo'shimcha Izoh (agar mavjud bo'lsa) */}
                    {note && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-xl border border-gray-200">
                            <h4 className="text-gray-900 font-bold mb-1">Izoh / Shikoyat:</h4>
                            <p className="text-gray-700 text-sm italic leading-relaxed">"{note}"</p>
                        </div>
                    )}
                </div>

                {/* 2. Shifokor kartochkasi */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">Shifokor ma'lumoti</h3>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col sm:flex-row border">
                    
                    {/* Rasm qismi: Mobil/vertikal ekranda to'liq kenglik, katta ekranda 1/3 qism */}
                    <div className="relative w-full sm:w-1/3 flex-none h-48 sm:h-auto min-h-[200px] flex justify-center items-center bg-gray-100 p-4 sm:p-0">
                        {doctor.img ? (
                            <img 
                                src={doctor.img} 
                                alt={doctor.name} 
                                className="w-full h-full object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl sm:rounded-tr-none" 
                            />
                        ) : (
                            <div className="w-full h-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold">Rasm yo'q</div>
                        )}
                        <div className="absolute top-3 right-3 text-gray-400 text-2xl"><CiHeart /></div>
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-md">
                            <IoStar size={14} className="text-yellow-400" />
                            <span>{doctor.rating || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Ma'lumot qismi: Katta ekranda qolgan 2/3 qismni egallaydi */}
                    <div className="p-4 sm:p-6 flex-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{doctor.name}</h3>
                        <p className="text-cyan-600 font-semibold text-lg mb-4">{doctor.job}</p>

                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex items-center gap-3">
                                <IoLocation size={18} className="text-gray-400" />
                                <span className='font-medium'>Manzil: **(Manzil kiritilmagan)**</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                <span className='text-gray-500'>👤 {doctor.patients} ta bemor</span>
                                <span className='text-gray-500'>| {doctor.exp}+ yillik tajriba</span>
                            </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100">
                             <p className="text-xl font-extrabold text-gray-900">
                                {doctor.price} so'm
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Qabulning o'rtacha narxi</p>
                        </div>
                    </div>
                </div>

                {/* Tugma: Kontent ostida, o'rtada va har doim ekranga sig'adigan o'lchamda */}
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => navigate('/boshsaxifa')} 
                        // Mobil ekranda to'liq kenglik, katta ekranda maksimal 448px (max-w-md)
                        className="w-full max-w-md py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-lg rounded-full shadow-xl shadow-cyan-300/50 transition-all transform hover:scale-[1.02]"
                    >
                        Bosh sahifaga qaytish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QabulTasdiqlash;