import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function SmsVerification() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Kiritilgan SMS kod:", data.smsCode);
    navigate('/yangilash');
  };

  const handleResendCode = (e) => {
    e.preventDefault();
    console.log("Kod qayta yuborildi");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-[450px] bg-white p-8 rounded-[30px] shadow-2xl mx-4">

        <h1 className="text-2xl font-bold text-center mb-10 text-[#272937]">
          SMS orqali yuborilgan kodni kiriting
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* SMS CODE */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="- - - - - -"
              {...register("smsCode", {
                required: "Kod majburiy",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Kod 6 xonali raqam bo‘lishi kerak"
                }
              })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
              }}
              className="w-full h-[60px] border-2 border-[#3353FF] rounded-[10px]
                         text-[#3353FF] text-2xl text-center font-medium tracking-[0.5em]
                         focus:outline-none"
            />
          </div>

          {errors.smsCode && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.smsCode.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-[55px] bg-[#00BCE4] text-white text-[18px] font-semibold rounded-[10px] mb-4"
          >
            Keyingi
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-500 mb-1">Kod kelmadimi?</p>
            <a
              href="#"
              className="text-[#40CCEB] font-bold hover:underline"
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
