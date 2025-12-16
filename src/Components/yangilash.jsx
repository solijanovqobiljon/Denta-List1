import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 

function Yangilash() {
    const navigate = useNavigate();
    
    const primaryBlue = '#00BCE4'; 
    const darkText = '#272937'; 
    const inputBorderBlue = '#3353FF'; 
    const grayText = '#A3AED0'; 
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        if (newPassword === confirmPassword && newPassword.length >= 6) { 
            console.log("Parol muvaffaqiyatli yangilandi. Yangi Parol:", newPassword);
            alert("Parolingiz muvaffaqiyatli yangilandi!");
            navigate('/login'); 
        } else if (newPassword !== confirmPassword) {
            alert("Parollar mos kelmadi. Iltimos, tekshiring.");
        } else {
             alert("Parol kamida 6 belgidan iborat bo'lishi kerak.");
        }
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        console.log("Parolni yangilash bekor qilindi. Kirish sahifasiga qaytish.");
        navigate('/login'); 
    };

    return (
        <div className='min-h-screen bg-white flex justify-center items-center p-6'>
            
            <div className='w-full max-w-[400px]'>
                
                <h1 className={`text-2xl font-bold text-center mb-10 text-[${darkText}]`}>
                    Parolni yangilang
                </h1>
                
                <form onSubmit={handleSave}>
                    
                    <div className="mb-6">
                        <label htmlFor="new-password" className={`block text-md font-medium text-[${darkText}] mb-2`}> 
                            Yangi parolni kiriting
                        </label>
                        <div className='relative'>
                            <input 
                                id="new-password"
                                type={showNewPassword ? "text" : "password"} 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="" 
                                className={`w-full h-[55px] border-[2px] border-gray-300 rounded-[15px] pl-4 pr-12 text-lg 
                                            focus:border-[${inputBorderBlue}] focus:outline-none transition`}
                                required
                            />
                            <div 
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 text-xl'
                                onClick={toggleNewPasswordVisibility}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-10">
                        <label htmlFor="confirm-password" className={`block text-md font-medium text-[${darkText}] mb-2`}>
                            Parolni takrorlang
                        </label>
                        <div className='relative'>
                            <input 
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"} 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="" 
                                className='w-full h-[55px] border-[2px] border-gray-300 rounded-[15px] pl-4 pr-12 text-lg focus:border-gray-300 focus:outline-none bg-white'
                                required
                            />
                            <div 
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 text-xl'
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full h-[55px] bg-[${primaryBlue}] text-white text-[18px] font-semibold 
                                    rounded-[15px] shadow-md hover:opacity-90 transition duration-200 mb-4`}
                    >
                        Saqlash
                    </button>
                </form>

                <button
                    onClick={handleCancel}
                    className={`w-full h-[55px] border-2 border-[${primaryBlue}] text-[${primaryBlue}] text-[18px] font-semibold 
                                rounded-[15px] bg-white hover:bg-gray-50 transition duration-200`}
                >
                    Bekor qilish
                </button>
            </div>
        </div>
    );
}

export default Yangilash;