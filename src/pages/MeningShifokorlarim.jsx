import React from 'react';
import { Link } from 'react-router-dom';
import { IoInformationCircleOutline } from 'react-icons/io5'; // Vizual qo'shimcha uchun icon

function MeningShifokorlarim() {
    
    // Eslatma: useEffect, useState va localStorage logikalari olib tashlandi.
    // hasAppointments doimo false deb hisoblanadi.

    return (
        // min-h-[90vh] o'rniga min-h-screen/min-h-full ishlatish tavsiya etiladi.
        <div className="w-full min-h-screen p-5 md:px-10 lg:px-[70px] xl:px-[100px] bg-gray-50 flex flex-col items-center mb-[71px]">
            
            {/* Sarlavha */}
            <h1 className="text-2xl md:text-3xl font-bold mb-10 mt-5 text-gray-800 flex items-center gap-2">
                Mening Qabullarim
            </h1>

            {/* Doimiy ko'rsatiladigan Kontent bloki */}
            <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full">
                
                <IoInformationCircleOutline size={60} className="text-cyan-500 mb-4 animate-pulse-slow" />
                
                <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
                    Qabul Ro'yxati Bo'sh
                </h3>
                
                <p className="text-lg font-medium text-gray-700 mb-4">
                    Siz hali birorta shifokor qabuliga yozilmagansiz.
                </p>
                
                <p className="text-gray-500 max-w-md mb-6">
                    Qabulga yozilish orqali shifokoringizni bu yerda ko'rishingiz mumkin.
                </p>
                
                <Link 
                    to="/boshsaxifa" // Bosh sahifa yo'li
                    className="mt-2 px-8 py-3 bg-cyan-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-cyan-600 transition-all transform hover:scale-[1.02]"
                >
                    Bosh sahifaga o'tish
                </Link>
            </div>
            
        </div>
    );
}

export default MeningShifokorlarim;