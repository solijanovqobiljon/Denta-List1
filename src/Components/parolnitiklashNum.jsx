import React, { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; 

function Royhatdanotish() {
    
    const navigate = useNavigate(); 
    
    const [phoneNumber, setPhoneNumber] = useState('');

    
    const formatPhoneNumber = (value) => {
        const cleaned = ('' + value).replace(/\D/g, ''); 
        
        const digits = cleaned.startsWith('998') ? cleaned.substring(3) : cleaned;
        
        if (digits.length >= 9) {
            const match = digits.substring(0, 9).match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
            if (match) {
                return `+998 ${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
            }
        }
        
        if (cleaned.length > 0 && cleaned.length < 12) {
             return cleaned;
        }

        return ''; 
    };

    const handleInputChange = (event) => {
        const input = event.target.value;
        const formatted = formatPhoneNumber(input);
        
        const rawDigits = ('' + input).replace(/\D/g, '');

        if (rawDigits.length <= 12) { 
            setPhoneNumber(formatted);
        }
    };
    
    const handleNext = () => {
       
        if (phoneNumber.replace(/\D/g, '').length === 12) {
           
            navigate('/Parol_tiklash', { state: { phone: phoneNumber } }); 
        } else {
            alert("Iltimos, telefon raqamingizni to'liq kiriting.");
        }
    };

    const primaryColor = '#3353FF'; // Input border rangi
    const secondaryTextColor = '#6155F5'; // Input matn rangi
    const buttonColor = '#00BCE4'; // Tugma rangi

    return (
        <div className='flex flex-col items-center pt-[150px] min-h-screen bg-white'>
            <h1 className='text-center text-[28px] font-bold text-[#272937] mb-[40px]'>Parolni tiklash</h1>
            
            <div className='w-[300px]'>
                <label htmlFor="inp" className='w-full text-[#272937] text-[16px] font-medium'>
                    Telefon raqamingizni kiriting
                </label>
                
                <div className='mt-[3px] relative'>
                    
                    <FaPhoneAlt 
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] text-[18px]' 
                    />
                    
                    <input
                        id="inp"
                        type="tel" 
                        value={phoneNumber}
                        onChange={handleInputChange}
                        maxLength={19} 
                        placeholder="+998 99 111-44-56"
                        className={`w-full h-[50px] border-[2px] border-[#3353FF] rounded-[13px] pl-[40px] 
                                    text-[20px] font-semibold text-[${secondaryTextColor}] 
                                    focus:border-[#3353FF] focus:outline-none placeholder:text-[#6155F5]`}
                    />
                </div>
            </div>
            
            <button 
                className={`w-[300px] h-[55px] bg-[${buttonColor}] text-white text-[18px] font-semibold 
                            rounded-[13px] mt-[25px] shadow-lg hover:bg-opacity-90 transition`}
                onClick={handleNext} 
            >
                Keyingi
            </button>
            
            <div className='mt-[50px] text-center'>
                <p className='text-[#A3AED0] text-[16px] mb-1'>Akkountingiz yo'qmi?</p>
                <Link 
                    to="/royhatdanotish" 
                    className='text-[#00BCE4] text-[18px] font-semibold hover:underline'
                >
                    Ro'yhatdan o'ting
                </Link>
            </div>
            
        </div>
    )
}

export default Royhatdanotish;