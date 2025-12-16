import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack, IoTime } from 'react-icons/io5';

function QabulgaYozilish2B() {
    const navigate = useNavigate();
    const location = useLocation();

    // Uzatilgan sanani qabul qilish
    const { 
        selectedDay, 
        selectedMonthName, 
        selectedYear 
    } = location.state || {};

    // Shifokor ma'lumotlari (namuna)
    const doctorData = location.state?.doctor || {
        name: "Dr. Jamshid Rahmonov", 
        job: "Ortoped", 
        rating: "4.5", 
        patients: "254", 
        exp: "12", 
        price: "250 000", 
        img: "https://via.placeholder.com/150", // Rasm yo'li
        service: true
    };
    
    useEffect(() => {
        if (!selectedDay || !selectedMonthName || !selectedYear) {
             console.warn("Qabulga yozilish uchun to'liq sana ma'lumotlari mavjud emas!");
        }
    }, [selectedDay, selectedMonthName, selectedYear]);

    const [selectedTime, setSelectedTime] = useState(null);
    const [note, setNote] = useState(''); 

    // Mavjud vaqt oralig'i
    const times = [
        '09:00', '10:00', '11:00',
        '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00'
    ];

    const handleConfirm = () => {
        if (!selectedTime || !selectedDay || !selectedMonthName || !selectedYear) {
            alert("Iltimos, sana va vaqtni tanlang!");
            return;
        }

        // Ma'lumotlar obyektini tayyorlash
        const appointment = {
            id: Date.now(),
            doctor: doctorData, 
            date: `${selectedDay} ${selectedMonthName} ${selectedYear}`,
            time: selectedTime,
            note: note,
            createdAt: new Date().toISOString()
        };

        // Ma'lumotlarni localStorage'ga saqlash
        const existing = JSON.parse(localStorage.getItem('myAppointments') || '[]');
        existing.push(appointment);
        localStorage.setItem('myAppointments', JSON.stringify(existing));

        // TASDIQLASH SAHIFASIGA O'TISH
        navigate('/qabultasdiqlash', { state: { appointment } });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header qismi */}
            <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-b-3xl p-4 sm:p-6 lg:p-8 shadow-lg flex-shrink-0">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-white mb-4 sm:mb-6 hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                    <IoArrowBack size={24} />
                </button>
                <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Qabulga yozilish</h1>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-1 flex-1 bg-white rounded"></div>
                    <div className="h-1 flex-1 bg-white rounded"></div>
                    <div className="h-1 flex-1 bg-white/40 rounded"></div>
                </div>
            </div>

            <div className="flex-1 px-4 sm:px-6 lg:px-8 mt-6 max-w-7xl mx-auto w-full pb-24"> 
                {/* Asosiy kontent GRID: mobil-stak, katta ekranlarda 2:1 ustun */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start"> 
                    
                    {/* Chap ustun (Katta: Shifokor va Vaqt tanlash) */}
                    <div className="lg:col-span-2 order-1 lg:order-1"> 
                        
                        {/* Shifokor kartochkasi */}
                        <div className="mb-6">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">Shifokor</h2>
                            <div className="bg-white flex flex-col sm:flex-row rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                
                                {/* Rasm qismi */}
                                <div className="relative w-full sm:w-[45%] lg:w-[45%] flex-shrink-0 h-48 sm:h-auto min-h-[160px] bg-gray-100 flex items-center justify-center">
                                    <img 
                                        src={doctorData.img} 
                                        alt="Doctor" 
                                        className="w-full h-full object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl sm:rounded-r-none" 
                                    />
                                </div>
                                
                                {/* Ma'lumot qismi */}
                                <div className="p-4 sm:p-6 w-full sm:w-[55%] lg:w-[55%]">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{doctorData.name}</h3>
                                    <p className="text-gray-500 text-sm mb-3">{doctorData.job}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600 mb-3">
                                        <span><span className="text-gray-400">{doctorData.patients}</span> ta bemor</span>
                                        <span><span className="text-gray-400">{doctorData.exp}+</span> y tajriba</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-100">
                                        <p className="text-lg sm:text-xl font-bold text-gray-900">
                                            {doctorData.price} <span className="text-xs sm:text-sm font-normal text-gray-500">o'rtacha narx</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vaqt tanlash qismi */}
                        <div className="mt-6">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">Vaqtni tanlang</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                                {times.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 px-3 rounded-xl font-semibold transition-all text-sm sm:text-base 
                                            ${selectedTime === time
                                                ? 'bg-cyan-500 text-white shadow-lg scale-[1.03]'
                                                : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                                            }
                                            active:scale-95
                                        `}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* O'ng ustun (Kichik: Izoh va Tasdiqlash) */}
                    <div className="lg:col-span-1 order-2 lg:order-2 sticky top-4"> 
                        <div className="mb-6">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">Qo'shimcha izoh kiritish</h2>
                            
                            {/* Izoh maydoni */}
                            <textarea 
                                placeholder="Shikoyatingizni yozing..." 
                                value={note}
                                rows={4} // Mobil ekranda yetarli balandlik berish uchun
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full h-auto min-h-[120px] lg:h-[250px] p-4 bg-white border border-gray-200 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" 
                            />
                            
                            {/* Tanlangan ma'lumotlar bloki */}
                            <div className="mt-4 text-sm text-gray-600 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                                <h3 className='font-bold text-cyan-600 mb-2 pb-2 border-b border-gray-100'>Tanlangan ma'lumotlar:</h3>
                                
                                {selectedDay && selectedMonthName && selectedYear && (
                                    <div className='flex items-center gap-2 mb-2'>
                                        <IoTime size={18} className='text-blue-500 flex-shrink-0' />
                                        <span>Sana: <strong className='text-gray-800'>{selectedDay} {selectedMonthName} {selectedYear}</strong></span>
                                    </div>
                                )}

                                {selectedTime ? (
                                    <div className='flex items-center gap-2'>
                                        <IoTime size={18} className='text-cyan-500 flex-shrink-0' />
                                        <span>Vaqt: <strong className='text-cyan-600 text-base'>{selectedTime}</strong></span>
                                    </div>
                                ) : (
                                    <div className="text-red-500 font-medium mt-3 flex items-center gap-1">
                                        <IoTime size={18} /> Iltimos, vaqtni tanlang.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tugmalar: Mobil va kichik ekranlarda to'liq kenglikda */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                            <button 
                                onClick={() => navigate(-1)} 
                                className="w-full py-3 sm:py-4 bg-white border-2 border-cyan-400 text-cyan-500 font-semibold rounded-xl hover:bg-cyan-50 transition-colors shadow-sm"
                            >
                                Ortga
                            </button>
                            <button 
                                disabled={!selectedTime} 
                                onClick={handleConfirm} 
                                className={`w-full py-3 sm:py-4 font-extrabold text-white text-lg rounded-xl transition-colors shadow-lg
                                    ${selectedTime 
                                        ? 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-300/50' 
                                        : 'bg-gray-400 cursor-not-allowed shadow-none'} 
                                    active:scale-[0.99]
                                `}
                            >
                                Tasdiqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QabulgaYozilish2B;