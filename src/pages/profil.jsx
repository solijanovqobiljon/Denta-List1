import React, { useState } from 'react'; // useState import qilindi
import { useNavigate } from 'react-router-dom';
// React Icons'dan kerakli ikonkalarni import qilamiz
import { FaChevronLeft, FaSearch, FaRegBell, FaRegCommentDots } from "react-icons/fa";
import { FiUser, FiHeart, FiLogOut } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsChatText } from "react-icons/bs"; // Chat Ikonkasi
import { MdOutlineModeEdit } from "react-icons/md"; // O'zgartirish uchun
import { FaUserDoctor } from "react-icons/fa6";
import profileImg from "../assets/denta1.jpg" // Rasm fayli importi

function Profil_pages() {
    const navigate = useNavigate();
    
    // Modal holatini boshqarish uchun state
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); 

    // Ranglar konstantalari
    const primaryTeal = '#00BCE4'; // Moviy-firuzarang
    const darkText = '#272937'; // Asosiy matn
    const white = '#FFFFFF';

    // Tizimdan chiqishni tasdiqlash funksiyasi
    const handleConfirmLogout = () => {
        // Hozirgi modalni yopamiz
        setIsLogoutModalOpen(false);
        // Tizimdan chiqish logikasi (masalan, token o'chirish)
        console.log("Foydalanuvchi tizimdan chiqdi.");
        // Login sahifasiga yo'naltirish
        navigate('/login');
    };
    
    // Tizimdan chiqishni bekor qilish funksiyasi
    const handleCancelLogout = () => {
        setIsLogoutModalOpen(false); // Modalni yopish
    };


    // Menyu elementlari ro'yxati (Tizimdan chiqish tugmasi endi modalni ochadi)
    const menuItems = [
        { Icon: FaUserDoctor, label: 'Mening shifokorlarim', path: '/mening-shifokorlarim' },
        { Icon: IoIosHeartEmpty, label: 'Yoqtirishlar', path: '/yoqtirishlar' },
        { Icon: BsChatText, label: 'Sharhlar', path: '/sharhlar' },
        { Icon: MdOutlineModeEdit, label: "Ma'lumotlarni o'zgartirish", path: '/profile' }, 
        // "Tizimdan chiqish" tugmasini bosganda modalni ochish uchun
        { Icon: FiLogOut, label: 'Tizimdan chiqish', action: () => setIsLogoutModalOpen(true) }, 
    ];

    // Orqaga qaytish funksiyasi
    const handleGoBack = () => {
        navigate(-1);
    };
    
    // Notification sahifasiga o'tish funksiyasi
    const handleGoToNotifications = () => {
        navigate('/Notification'); 
    };
    const sendsMessages = () => {
        navigate('/chats'); 
    };

    return (
        <div className='min-h-screen bg-white pb-[80px]'> 
            
            {/* Yuqori Sarlavha (Header) */}
            <header className={`bg-[${primaryTeal}] p-4 pb-16 pt-8 rounded-b-[40px] shadow-lg relative`}>
                <div className="flex justify-between items-center mb-6">
                    <FaChevronLeft 
                        className={`text-white text-2xl cursor-pointer`}
                        onClick={handleGoBack}
                    />
                    <BsChatText className={`text-white text-2xl cursor-pointer`}
                    onClick={sendsMessages}
                    /> 
                </div>

                <div className="flex items-center space-x-4 relative">
                    <div className="relative">
                        <img 
                            src={profileImg} 
                            alt="Profil rasmi"
                            className="w-20 h-20 rounded-full border-4 border-white object-cover"
                            style={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex justify-center items-center border border-white">
                            <FaRegCommentDots className="text-white text-xs"/> 
                        </div>
                    </div>
                    
                    <div>
                        <h2 className={`text-white text-xl font-bold`}>Tohirov Azamat</h2>
                        <p className={`text-white text-sm opacity-90`}>
                            📍 Namangan, O'zbekiston
                        </p>
                    </div>
                </div>
            </header>

            {/* Asosiy Kontent */}
            <div className='p-4 pt-0'>
                
                <div className='relative -mt-8 mb-8'>
                    <input 
                        type="text"
                        placeholder="Shifokor yoki klinika qidirish..."
                        className="w-full h-12 bg-white rounded-full shadow-md pl-12 pr-12 text-sm focus:outline-none focus:border-blue-600 focus:ring-opacity-50"
                    />
                    <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    
                    <FaRegBell 
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg cursor-pointer'
                        onClick={handleGoToNotifications}
                    />
                </div>

                <ul className="bg-white rounded-xl">
                    {menuItems.map((item, index) => (
                        <li 
                            key={index} 
                            className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 transition ${index < menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                            // Agar action bo'lsa actionni, aks holda navigate ni chaqiradi
                            onClick={item.action ? item.action : () => navigate(item.path)}
                        >
                            <item.Icon className={`text-xl text-[${darkText}] mr-4`} />
                            <span className={`text-base text-[${darkText}]`}>{item.label}</span>
                        </li>
                    ))}
                </ul>

                <div className='h-4'></div>
            </div>

            {/* >>> TIZIMDAN CHIQISH MODALI <<< */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl mx-6 p-6 w-11/12 max-w-sm">
                        
                        {/* Modal matni */}
                        <h3 className={`text-center text-lg font-semibold text-[${darkText}] mb-6`}>
                            Rostdan ham tizimdan chiqmoqchimisiz?
                        </h3>

                        <div className="flex flex-col space-y-3">
                            {/* Yo'q / Bekor qilish tugmasi */}
                            <button
                                onClick={handleCancelLogout}
                                className={`w-full h-12 bg-[${primaryTeal}] text-white text-base font-semibold rounded-xl hover:bg-cyan-600 transition`}
                            >
                                Yo'q
                            </button>

                            {/* Ha / Tasdiqlash tugmasi */}
                            <button
                                onClick={handleConfirmLogout}
                                className={`w-full h-12 border border-[${primaryTeal}] text-[${primaryTeal}] text-base font-semibold rounded-xl hover:bg-gray-100 transition`}
                            >
                                Ha
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* >>> MODAL TUGADI <<< */}

        </div>
    );
}

export default Profil_pages;