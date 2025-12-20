import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Royhatdanotish() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  // 📱 Telefon formatlash
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 9);
    if (digits.length === 0) return "";
    
    const match = digits.match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
    let result = "+998";
    if (match[1]) result += ` ${match[1]}`;
    if (match[2]) result += ` ${match[2]}`;
    if (match[3]) result += `-${match[3]}`;
    if (match[4]) result += `-${match[4]}`;
    
    return result;
  };

  const onSubmit = (data) => {
    console.log("Telefon raqam:", data.phone);
    navigate('/Parol_tiklash', { state: { phone: data.phone } });
  };

  return (
    <div className="flex flex-col items-center pt-[150px] min-h-screen bg-white">
      <h1 className="text-center text-[28px] font-bold text-[#272937] mb-[40px]">
        Parolni tiklash
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[300px]">
        <label className="text-[#272937] text-[16px] font-medium">
          Telefon raqamingizni kiriting
        </label>

        <div className="mt-[3px] relative">
          <FaPhoneAlt className={`absolute left-3 top-1/2 -translate-y-1/2 text-[18px] transition-colors ${errors.phone ? 'text-red-500' : 'text-[#8E8E93]'}`} />

          <input
            type="tel"
            placeholder="+998 99 111-44-56"
            {...register("phone", {
              required: true,
              validate: (value) => value?.replace(/\D/g, '').length === 12
            })}
            onInput={(e) => {
              const formatted = formatPhone(e.target.value);
              setValue("phone", formatted, { shouldValidate: true });
            }}
            className={`w-full h-[50px] border-[2px] rounded-[13px] pl-[40px] text-[20px] font-semibold transition-colors focus:outline-none placeholder:text-[#6155F5]/50
              ${errors.phone 
                ? 'border-red-500 text-red-500' 
                : 'border-[#3353FF] text-[#6155F5]'}`}
          />
        </div>

        {/* Xatolik xabari (errors.phone) olib tashlandi */}

        <button
          type="submit"
          className="w-full h-[55px] bg-[#00BCE4] text-white text-[18px] font-semibold
                     rounded-[13px] mt-[25px] shadow-lg active:scale-95 hover:bg-opacity-90 transition"
        >
          Keyingi
        </button>
      </form>

      <div className="mt-[50px] text-center">
        <p className="text-[#A3AED0] text-[16px] mb-1">Akkountingiz yo‘qmi?</p>
        <Link
          to="/royhatdanotish"
          className="text-[#00BCE4] text-[18px] font-semibold hover:underline"
        >
          Ro‘yxatdan o‘ting
        </Link>
      </div>
    </div>
  );
}

export default Royhatdanotish;