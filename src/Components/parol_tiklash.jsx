import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function SmsVerification() {
    const navigate = useNavigate();
    
    const primaryBlue = '#00BCE4'; 
    const darkText = '#272937'; 
    const inputFocusBlue = '#3353FF'; 
    const linkBlueText = '#40CCEB'; 
    
    const [smsCode, setSmsCode] = useState('');

  
    const handleCodeChange = (e) => {
        let value = e.target.value;
        
        const rawNumbers = value.replace(/\D/g, ''); 
        
        const limitedNumbers = rawNumbers.substring(0, 6);
        
        let formatted = '';

        if (limitedNumbers.length > 0) {
            formatted += limitedNumbers.substring(0, 3);
        }
        if (limitedNumbers.length > 3) {
            formatted += '-' + limitedNumbers.substring(3, 6);
        }

        setSmsCode(formatted);
    };


    const handleNext = (e) => {
        e.preventDefault();
        
        const codeForValidation = smsCode.replace(/-/g, '');
        
        if (codeForValidation.length === 6) {
            console.log("Kod tasdiqlandi. Yangi parol yaratish (Yangilash) sahifasiga o'tilmoqda...");
            
            navigate('/yangilash'); 
            
        } else {
            alert("Iltimos, to'liq 6 xonali kodni kiriting.");
        }
    };
    
    const handleResendCode = (e) => {
        e.preventDefault();
        console.log("Kod qayta yuborish so'rovi yuborildi.");
    };

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            
            <div className='w-full max-w-[450px] bg-white p-8 rounded-[30px] shadow-2xl mx-4'>
                
                <h1 className={`text-2xl font-bold text-center mb-10 text-[${darkText}]`}>
                    SMS orqali yuborilgan kodni kiriting
                </h1>
                
                <form onSubmit={handleNext}>
                    
                    <div className="mb-8 flex justify-center">
                        <div className='relative w-full'>
                            <input 
                                type="text" 
                                value={smsCode}
                                onChange={handleCodeChange}
                                placeholder=" - - - - -" 
                                className={`w-full h-[60px] border-2 border-[${inputFocusBlue}] rounded-[10px] 
                                            text-[${inputFocusBlue}] text-2xl tracking-[0.5em] text-center font-medium focus:outline-none transition bg-white`}
                                style={{ letterSpacing: '0.4em' }} 
                                required
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className={`w-full h-[55px] bg-[${primaryBlue}] text-white text-[18px] font-semibold 
                                    rounded-[10px] shadow-md hover:bg-cyan-600 transition duration-200 mb-4`}
                    >
                        Keyingi
                    </button>

                    <div className='text-center mt-4'>
                        <p className='text-gray-500 mb-1'>Kod kelmadimi?</p>
                        <a 
                            href="#" 
                            className={`text-[${linkBlueText}] font-bold text-base hover:underline transition`}
                            onClick={handleResendCode}
                        >
                            Qayta yuborish
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SmsVerification;