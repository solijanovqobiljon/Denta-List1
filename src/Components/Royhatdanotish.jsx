import React, { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
// 1. useNavigate hookini import qilamiz
import { Link, useNavigate } from 'react-router-dom'; 

function Royhatdanotish() {
    
    // 2. useNavigate hookini ishga tushiramiz
    const navigate = useNavigate(); 
    
    // Telefon raqami holatini saqlash
    const [phoneNumber, setPhoneNumber] = useState('');

    /**
     * Kiritilgan raqamni +998 XX XXX-XX-XX formatiga avtomatik o'tkazish
     */
    const formatPhoneNumber = (value) => {
        // 1. Raqamlardan boshqa hamma narsani (bo'sh joy, chiziq, + belgisi) o'chiramiz
        const cleaned = ('' + value).replace(/\D/g, ''); 
        
        // 2. Formatlash uchun faqat 9 ta asosiy raqamni olamiz
        const digits = cleaned.startsWith('998') ? cleaned.substring(3) : cleaned;
        
        // Agar 9 ta raqam bo'lsa yoki undan ko'p bo'lsa
        if (digits.length >= 9) {
            const match = digits.substring(0, 9).match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
            if (match) {
                // Formatlash: +998 XX XXX-XX-XX
                return `+998 ${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
            }
        }
        
        // Agar raqamlar 998 kodini o'z ichiga olsa, uni qaytaramiz (agar hali formatlanmagan bo'lsa)
        if (cleaned.length > 0 && cleaned.length < 12) {
             // Raqamlar soni 12 tadan oshsa ham formatlashga urinib ko'rish
             return cleaned;
        }

        return ''; // Boshida bo'sh qaytaramiz
    };

    const handleInputChange = (event) => {
        const input = event.target.value;
        const formatted = formatPhoneNumber(input);
        
        // Input raqam qismini to'liq o'chirib yuborishga yo'l qo'ymaslik
        const rawDigits = ('' + input).replace(/\D/g, '');

        if (rawDigits.length <= 12) { // 998 + 9 ta raqam = 12
            setPhoneNumber(formatted);
        }
    };
    
    // 3. Keyingi sahifaga o'tish funksiyasi
    const handleNext = () => {
        // Bu yerda raqam tekshirilishi kerak (agar raqam to'g'ri kiritilgan bo'lsa)
        if (phoneNumber.replace(/\D/g, '').length === 12) {
            // Agar raqam to'g'ri formatlangan bo'lsa, 'sms' sahifasiga o'tamiz
            navigate('/sms', { state: { phone: phoneNumber } }); 
            // Iltimos, routingizda '/sms' yo'nalishi Sms.jsx komponentasiga bog'langanligiga ishonch hosil qiling.
        } else {
            alert("Iltimos, telefon raqamingizni to'liq kiriting.");
        }
    };

    // Rasmda ko'rsatilgan ranglar va uslublar
    const primaryColor = '#3353FF'; // Input border rangi
    const secondaryTextColor = '#6155F5'; // Input matn rangi
    const buttonColor = '#00BCE4'; // Tugma rangi

    return (
        <div className='flex flex-col items-center pt-[150px] min-h-screen bg-white'>
            <h1 className='text-center text-[28px] font-bold text-[#272937] mb-[40px]'>Ro'yxatdan o'tish</h1>
            
            {/* INPUT BO'LIMI */}
            <div className='w-[300px]'>
                <label htmlFor="inp" className='w-full text-[#272937] text-[16px] font-medium'>
                    Telefon raqamingizni kiriting
                </label>
                
                <div className='mt-[3px] relative'>
                    
                    {/* Ikonka rasmga moslab absolute joylashtirildi */}
                    <FaPhoneAlt 
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] text-[18px]' 
                    />
                    
                    <input
                        id="inp"
                        type="tel" // Mobilda raqamli klaviaturani chaqirish uchun
                        value={phoneNumber}
                        onChange={handleInputChange}
                        maxLength={19} // "+998 99 111-44-56" uzunligi
                        placeholder="+998 99 111-44-56"
                        className={`w-full h-[50px] border-[2px] border-[#3353FF] rounded-[13px] pl-[40px] 
                                    text-[20px] font-semibold text-[${secondaryTextColor}] 
                                    focus:border-[#3353FF] focus:outline-none placeholder:text-[#6155F5]`}
                    />
                </div>
            </div>
            
            {/* KEYINGI TUGMASI */}
            <button 
                className={`w-[300px] h-[55px] bg-[${buttonColor}] text-white text-[18px] font-semibold 
                            rounded-[13px] mt-[25px] shadow-lg hover:bg-opacity-90 transition`}
                // 4. onClick ishlovchi beruvchisini handleNext funksiyasiga o'zgartirdik
                onClick={handleNext} 
            >
                Keyingi
            </button>
            
            {/* HAVOLA QISMI */}
            <div className='mt-[50px] text-center'>
                <p className='text-[#A3AED0] text-[16px] mb-1'>Ilovadan avval foydalanganmisiz?</p>
                <Link 
                    to="/login" // Login sahifasiga yo'naltiring (Sizning routingizga bog'liq)
                    className='text-[#00BCE4] text-[18px] font-semibold hover:underline'
                >
                    Akkauntga kirish
                </Link>
            </div>
            
        </div>
    )
}

export default Royhatdanotish;