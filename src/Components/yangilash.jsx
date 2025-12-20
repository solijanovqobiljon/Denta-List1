import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Yangilash() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange' // Yozayotganda tekshirib borishi uchun
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = (data) => {
    console.log("Yangi Parol:", data.newPassword);
    alert("Parolingiz muvaffaqiyatli yangilandi!");
    navigate('/login');
  };

  const newPassword = watch('newPassword');

  return (
    <div className='min-h-screen bg-white flex justify-center items-center p-6'>
      <div className='w-full max-w-[400px]'>
        <h1 className='text-2xl font-bold text-center mb-10 text-[#272937]'>
          Parolni yangilang
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* YANGI PAROL */}
          <div className="mb-6">
            <label className="block text-md font-medium text-[#272937] mb-2">
              Yangi parolni kiriting
            </label>
            <div className='relative'>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Kamida 6 belgi"
                {...register("newPassword", {
                  required: true,
                  minLength: 6
                })}
                className={`w-full h-[55px] border-2 rounded-[15px] pl-4 pr-12 text-[15px] focus:outline-none transition-all
                  ${errors.newPassword 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-[#3353FF]'}`}
              />
              <div
                className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 text-xl'
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* CONFIRM PAROL */}
          <div className="mb-10">
            <label className="block text-md font-medium text-[#272937] mb-2">
              Parolni takrorlang
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Tasdiqlash"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === newPassword
                })}
                className={`w-full h-[55px] border-2 rounded-[15px] pl-4 pr-12 text-[15px] focus:outline-none transition-all
                  ${errors.confirmPassword 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-[#3353FF]'}`}
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
            className='w-full h-[55px] bg-[#00BCE4] text-white text-[18px] font-semibold rounded-[15px] shadow-md hover:opacity-90 active:scale-95 transition duration-200 mb-4'
          >
            Saqlash
          </button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className='w-full h-[55px] border-2 border-[#00BCE4] text-[#00BCE4] text-[18px] font-semibold rounded-[15px] bg-white hover:bg-gray-50 active:scale-95 transition duration-200'
        >
          Bekor qilish
        </button>
      </div>
    </div>
  );
}

export default Yangilash;