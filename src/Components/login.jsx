import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const navigate = useNavigate(); 
    
    // Kirish ma'lumotlari uchun state
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    // Qo'shimcha statelar
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(''); // Xato xabari uchun state

    // Ranglar va stil konstantalari
    const primaryBlue = '#00BCE4'; 
    const darkText = '#272937'; 
    const linkBlue = '#3353FF'; 
    const grayText = '#A3AED0';
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Kirish tugmasi bosilganda ishlaydi.
     * Faqat Login="111" va Parol="111" bo'lsa, /boshsaxifa ga o'tadi.
     */
    const handleLogin = (e) => {
        e.preventDefault();
        
        // Tekshirish logikasi: Faqat "111" / "111" uchun ruxsat berish
        if (login === '111' && password === '111') {
            setError(''); // Xatoni tozalash
            console.log("Kirish muvaffaqiyatli. Bosh sahifaga yo'naltirilmoqda...");
            // Muvaffaqiyatli holat
            navigate('/boshsaxifa'); 
        } else {
            // Muvaffaqiyatsiz holat
            setError("Bunday akkaunt mavjud emas"); // Qizil xato xabarini o'rnatish
            console.log("Kirish muvaffaqiyatsiz. Xato xabari ko'rsatildi.");
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        navigate('/Parol_tiklashNum');
    };
    
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/royhatdanotish'); 
    };


    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-start pt-16'>
            
            <div className='w-full max-w-[450px] bg-white p-8 rounded-[30px] shadow-2xl mx-4'>
                
                <h1 className={`text-2xl font-bold text-center mb-10 text-[${darkText}]`}>
                    Tizimga kirish
                </h1>
                
                <form onSubmit={handleLogin}>
                    
                    {/* Login maydoni */}
                    <div className="mb-6">
                        <label htmlFor="login-input" className={`block text-sm font-medium text-[${grayText}] mb-2`}> 
                            Login
                        </label>
                        <div className='relative'>
                            <input 
                                id="login-input"
                                type="text" 
                                value={login} // State'ga bog'landi
                                onChange={(e) => setLogin(e.target.value)} // Ma'lumotni saqlash
                                placeholder="Kiriting" 
                                className={`w-full h-[50px] border-[1px] border-gray-300 rounded-[10px] pl-12 pr-4 text-[${darkText}] text-lg focus:border-[${linkBlue}] focus:outline-none transition`}
                                required
                            />
                            <FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                        </div>
                    </div>
                    
                    {/* Parol maydoni */}
                    <div className="mb-3">
                        <label htmlFor="password-input" className={`block text-sm font-medium text-[${grayText}] mb-2`}>
                            Parol
                        </label>
                        <div className='relative'>
                            <input 
                                id="password-input"
                                type={showPassword ? "text" : "password"} 
                                value={password} // State'ga bog'landi
                                onChange={(e) => setPassword(e.target.value)} // Ma'lumotni saqlash
                                placeholder="Kiriting" 
                                className='w-full h-[50px] border-[1px] border-gray-200 rounded-[10px] pl-12 pr-12 text-lg focus:border-gray-300 focus:outline-none bg-gray-50'
                                required
                            />
                            <FaLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                            
                            <div 
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 text-xl'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    
                    {/* Xato xabari (faqat error state'i mavjud bo'lsa ko'rsatiladi) */}
                    {error && (
                        <p className="text-red-500 text-sm font-medium mt-3 text-center mb-5">
                            {error}
                        </p>
                    )}


                    <div className={`text-center ${error ? 'mb-4' : 'mb-8'}`}>
                        <a 
                            href="#" 
                            className={`text-[#40CCEB] text-[18px] font-medium text-base hover:underline transition`}
                            onClick={handleForgotPassword} 
                        >
                            Parolni unutingizmi?
                        </a>
                    </div>
                    
                    {/* Kirish Tugmasi */}
                    <button
                        type="submit"
                        className={`w-full h-[55px] bg-[${primaryBlue}] text-white text-[18px] font-semibold 
                                    rounded-[10px] shadow-md hover:bg-cyan-600 transition duration-200`}
                    >
                        Kirish
                    </button>
                </form>

                <div className='text-center mt-6'>
                    <p className='text-gray-500 mb-1'>Akkauntingiz yo'qmi?</p>
                    <a 
                        href="#" 
                        className={`text-[${primaryBlue}] font-bold text-base hover:underline transition`}
                        onClick={handleRegister} 
                    >
                        Ro'yxatdan o'ting
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;