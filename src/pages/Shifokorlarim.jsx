import React, { useState, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdWorkOutline, MdLocationOn, MdOutlineAttachMoney } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { TbMessageDots } from "react-icons/tb";
import { LuPhone } from "react-icons/lu";
import { IoStarSharp, IoCloseSharp } from "react-icons/io5";
import { FaPlus, FaTimes } from "react-icons/fa";
import { FiVideo, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ... (Import qilingan rasmlar va boshqa komponentlar) ...
import Denta1 from "../assets/denta1.jpg";
import Denta2 from "../assets/denta2.jpg";
import Denta3 from "../assets/denta3.jpg";
import Denta4 from "../assets/denta4.jpg";
import Denta5 from "../assets/denta5.png";
import DentaA1 from "../assets/dentaA1.png";
import DentaA2 from "../assets/dentaA2.png";
import DentaA3 from "../assets/dentaA3.png";

// Rang konstantalari (KO'K mavzusi)
const DARK_TEXT = '#272937';
const GREEN_BTN = '#00cf56';
const THEME_COLOR = '#00C1F3';

// renderStars, StylishCalendar, FullCalendar, CalendarModal, UploaderPlaceholder funksiyalari o'zgarishsiz qoladi

const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <IoStarSharp
                key={i}
                className={`text-base ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        );
    }
    return <div className='flex space-x-0.5'>{stars}</div>;
};

// ... (StylishCalendar, FullCalendar, CalendarModal komponentlari o'zgarishsiz qoladi) ...
const StylishCalendar = ({ onCalendarClick }) => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    const currentYear = today.getFullYear();

    const days = ['Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha', 'Yak'];

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const calendarDays = [];

    for (let i = 0; i < startDayIndex; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="h-6"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    return (
        <div
            className={`w-full max-w-[210px] p-4 rounded-2xl bg-white text-[${DARK_TEXT}] shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl transition`}
            onClick={onCalendarClick}
        >
            <div className="flex justify-between items-center text-sm font-bold mb-3">
                <span>{currentMonth}. {currentYear}</span>
                <span className={`text-[${THEME_COLOR}] font-normal`}>Kalendar</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold mb-2 text-gray-400">
                {days.map((day) => (
                    <div key={day} className="h-4 flex items-center justify-center">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                {calendarDays.map((day, index) => {
                    if (typeof day !== 'number') return day;

                    const isToday = day === currentDay;
                    const isPast = day < currentDay;

                    return (
                        <div
                            key={index}
                            className={`
                                w-6 h-6 rounded-full flex items-center justify-center transition text-[11px]
                                ${isToday
                                    ? `bg-[${THEME_COLOR}] text-white font-bold shadow-md`
                                    : isPast
                                    ? 'text-gray-300'
                                    : 'text-gray-700'
                                }
                            `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const FullCalendar = ({ selectedDate, setSelectedDate }) => {
    const [date, setDate] = useState(selectedDate || new Date());
    const days = ['Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha', 'Yak'];
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const calendarDays = [];
        for (let i = 0; i < startDayIndex; i++) {
            calendarDays.push(null);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(new Date(year, month, day));
        }
        return calendarDays;
    };

    const calendarDays = getDaysInMonth(date);
    const todayDate = new Date();

    const goToNextMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const goToPrevMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    return (
        <div className={`p-6 rounded-2xl bg-white text-[${DARK_TEXT}] shadow-2xl w-full max-w-sm`}>
            <div className="flex justify-between items-center mb-5">
                <button
                    onClick={goToPrevMonth}
                    className={`p-2 rounded-full hover:bg-gray-100 transition text-[${THEME_COLOR}]`}
                >
                    <FiChevronLeft className="text-xl" />
                </button>
                <div className="text-lg font-bold flex items-center gap-2">
                    <span>{date.getFullYear()}</span>
                    <span className={`text-[${THEME_COLOR}]`}>
                        {months[date.getMonth()]}
                    </span>
                </div>
                <button
                    onClick={goToNextMonth}
                    className={`p-2 rounded-full hover:bg-gray-100 transition text-[${THEME_COLOR}]`}
                >
                    <FiChevronRight className="text-xl" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold mb-3 text-gray-500">
                {days.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                {calendarDays.map((day, index) => {
                    if (!day) return <div key={index} className="h-8"></div>;

                    const dayNumber = day.getDate();
                    const isToday = day.toDateString() === todayDate.toDateString();
                    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                    const isPast = day < todayDate && !isToday;

                    const handleClick = () => {
                        if (!isPast) {
                            setSelectedDate(day);
                        }
                    };

                    return (
                        <div
                            key={index}
                            onClick={handleClick}
                            className={`
                                w-8 h-8 rounded-full flex items-center justify-center transition
                                ${isToday
                                    ? 'border-2 border-red-500 text-gray-700 font-bold'
                                    : isSelected
                                        ? `bg-[${THEME_COLOR}] text-white font-bold shadow-md cursor-pointer`
                                        : isPast
                                            ? 'text-gray-300'
                                            : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                                }
                            `}
                        >
                            {dayNumber}
                        </div>
                    );
                })}
            </div>

            {selectedDate && (
                <div className="mt-6 text-center">
                    <button className={`bg-[${GREEN_BTN}] text-white py-2 px-4 rounded-full text-sm font-semibold hover:opacity-90`}>
                        {selectedDate.toLocaleDateString()} uchun vaqt tanlash
                    </button>
                </div>
            )}
        </div>
    );
};

const CalendarModal = ({ isOpen, onClose, selectedDate, setSelectedDate }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-[-10px] right-[-10px] bg-white text-[${THEME_COLOR}] p-2 rounded-full shadow-lg border-2 border-gray-100 hover:bg-gray-100 transition z-10`}
                >
                    <IoCloseSharp className="text-xl" />
                </button>

                <FullCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
        </div>
    );
};

const UploaderPlaceholder = ({ type, file, setFile, isPlaceholder = false }) => {
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile({
                file: uploadedFile,
                preview: URL.createObjectURL(uploadedFile),
                type: uploadedFile.type.startsWith('image') ? 'image' : 'video'
            });
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    if (file) {
        return (
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md">
                {file.type === 'image' ? (
                    <img
                        src={file.preview}
                        alt="Yuklangan rasm"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <video
                        src={file.preview}
                        className="w-full h-full object-cover"
                        controls
                        loop
                        muted
                    />
                )}
                <button
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition z-20"
                >
                    <FaTimes className="text-xs" />
                </button>
            </div>
        );
    }

    if (isPlaceholder) {
        return (
            <div className={`relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden flex flex-col items-center justify-center border-2 border-dashed ${type === 'image' ? `border-[${THEME_COLOR}]/50` : 'border-blue-400/50'} transition hover:bg-gray-200 cursor-pointer`}>
                <input
                    type="file"
                    accept={type === 'image' ? "image/*" : "video/*"}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                />
                {type === 'image' ? (
                    <FaPlus className={`text-xl mb-1 text-[${THEME_COLOR}]`} />
                ) : (
                    <FiVideo className="text-xl mb-1 text-blue-500" />
                )}

                <p className={`text-center text-xs font-medium ${type === 'image' ? `text-[${THEME_COLOR}]` : 'text-blue-500'}`}>
                    {type === 'image' ? "Rasm joylash" : "Video joylash"}
                </p>
            </div>
        );
    }

    return null;
};
// ... (UploaderPlaceholder komponenti o'zgarishsiz qoladi) ...

function Shifokorlarim() {
    const { id } = useParams();
    const { state } = useLocation(); // <--- Ayol doktorlardan kelgan state ni olish uchun

    // Agar Link state orqali doctor uzatilgan bo'lsa (ayol doktorlardan)
    const passedDoctor = state?.doctor;

    // Doktorlar ma'lumotlari (sizning eski massivingiz)
    const allDoctors = [
        { id: 1, img: Denta5, name: "Dr. Omontayev Xayotillo", job: "Terapevt", rating: "5.0", patients: "200 ta bemor", exp: "3+ yil", price: "350 000 so’m", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Markaziy Poliklinika", is247: false },
        { id: 2, img: Denta1, name: "Dr. Jamshid Rahmonov", job: "Ortoped", rating: "4.9", patients: "254 ta bemor", exp: "12+ yil", price: "250 000 so’m", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Smile Dental clinic", is247: true },
        { id: 3, img: Denta2, name: "Dr. O‘tkir Rustamov", job: "Terapevt", rating: "4.9", patients: "124 ta bemor", exp: "10+ yil", price: "255 000 so’m", location: "Toshkent sh., Yunusobod t., Amir Temur ko'chasi 15", clinic: "Shifo Nur Clinic", is247: false },
        { id: 4, img: Denta3, name: "Dr. Asadbek Luqmonov", job: "Jarroh", rating: "3.9", patients: "254 ta bemor", exp: "12+ yil", price: "250 000 so’m", location: "Farg'ona sh., Sanoat ko'chasi, 1-uy", clinic: "Med Grand", is247: true },
        { id: 5, img: Denta4, name: "Dr. Lobar Azizova", job: "Implantolog", rating: "3.7", patients: "120 ta bemor", exp: "10+ yil", price: "255 000 so’m", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Xususiy Klinika", is247: false },

        { id: 6, img: Denta4, name: "Dr. Lobar Azizova", job: "Implantolog", rating: "4.4", distance: "2 km", price: "255 000", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Markaziy Poliklinika", is247: false,  patients: "120", exp: "10", service: true },
        { id: 7, img: DentaA1, name: "Dr. Marjona Nazarmatova", job: "Implantolog", rating: "4.1", distance: "3 km", price: "125 000", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Markaziy Poliklinika", is247: false,  patients: "120", exp: "25", service: true },
        { id: 8, img: DentaA2, name: "Dr. Mubina Jalilova", job: "Implantolog", rating: "4.2", distance: "3.1 km", price: "200 000", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Markaziy Poliklinika", is247: false,  patients: "120", exp: "10", service: true },
        { id: 9, img: DentaA3, name: "Dr. Aziza Xolmatova", job: "Implantolog", rating: "3.7", distance: "3.2 km", price: "255 000", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Smile Dental clinic", is247: true,  patients: "120", exp: "5", service: true },
        { id: 10, img: Denta4, name: "Dr. Lobar Azizo,va (2)", job: "Implantolog", rating: "3.6", distance: "3.4 km", price: "155 000", location: "Namangan vil., Davlatobod t., 5-kichik nohiya, 34.", clinic: "Smile Dental clinic", is247: true,  patients: "120", exp: "15", service: true },
    ];

    const foundDoctor = allDoctors.find(doc => doc.id === parseInt(id));
    const currentDoctor = passedDoctor || foundDoctor; // <--- Agar state bo'lsa undan, aks holda massivdan

    if (!currentDoctor) { 
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-red-600">
                <h1 className="text-3xl font-bold mb-4">404: Shifokor topilmadi</h1>
                <p className="text-gray-600 mb-6">So'ralgan ID ({id}) bo'yicha doctor ma'lumotlari mavjud emas.</p>
                <Link to="/boshsaxifa" className={`bg-[${THEME_COLOR}] text-white py-2 px-4 rounded-full font-medium hover:opacity-90`}>
                    Bosh sahifaga qaytish
                </Link>
            </div>
        );
    }

    const [activeTab, setActiveTab] = useState('work');
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLiked, setIsLiked] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);

    const handleSetImageFile = (index, file) => {
        setImageFiles(prevFiles => {
            const newFiles = [...prevFiles];
            if (file === null) {
                newFiles.splice(index, 1);
            } else if (index === newFiles.length) {
                newFiles.push(file);
            } else {
                newFiles[index] = file;
            }
            return newFiles;
        });
    };

    const handleSetVideoFile = (index, file) => {
        setVideoFiles(prevFiles => {
            const newFiles = [...prevFiles];
            if (file === null) {
                newFiles.splice(index, 1);
            } else if (index === newFiles.length) {
                newFiles.push(file);
            } else {
                newFiles[index] = file;
            }
            return newFiles;
        });
    };

    const imageGallery = useMemo(() => {
        const gallery = [...imageFiles];
        if (gallery.length < 5) {
            gallery.push(null);
        }
        return gallery;
    }, [imageFiles]);

    const videoGallery = useMemo(() => {
        const gallery = [...videoFiles];
        if (gallery.length < 5) {
            gallery.push(null);
        }
        return gallery;
    }, [videoFiles]);

    const reviewsData = [
        { id: 1, name: "Javohir Rahimov", timeAgo: "2 kun avval", stars: 5, text: "Tishlarni oqartirish uchun qabulga yozilgan edim. Menga xizmat juda yoqdi. Ajoyib natija! Tavsiya qilaman.", image: Denta1 },
        { id: 2, name: "Bahodirova Muattar", timeAgo: "3 kun avval", stars: 4, text: "Juda zo'r shifokor! Profesional yondashuvdan mamnunman. Xizmat sifati yuqori.", image: Denta1 },
        { id: 3, name: "Akmalov Jasur", timeAgo: "1 hafta avval", stars: 5, text: "Klinika toza, xodimlar hushmuomala. Dr. Jamshid Rahmonov o'z ishining ustasi.", image: Denta1 },
    ];

    const handleToggleLike = () => {
        setIsLiked(prev => !prev);
    }

    return (
        <div className="w-full mx-auto mb-[150px] bg-white min-h-screen pb-10 relative">

            <CalendarModal
                isOpen={isCalendarModalOpen}
                onClose={() => setIsCalendarModalOpen(false)}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />

            <div className={`relative z-10 bg-[${THEME_COLOR}] text-white p-5 pb-10 md:p-10 md:pb-14 lg:px-[70px] lg:pt-[40px] lg:pb-16 xl:px-[100px] xl:pt-[50px] xl:pb-20 rounded-b-[35px] shadow-xl`}>
                <div className="flex justify-between items-start w-full">
                    <Link to={"/boshsaxifa"}>
                        <div className="text-3xl md:text-4xl">
                            <HiOutlineArrowLeft />
                        </div>
                    </Link>

                    <div
                        className="text-3xl md:text-4xl cursor-pointer transition"
                        onClick={handleToggleLike}
                        role="button"
                    >
                        {isLiked ? (
                            <AiFillHeart className="text-red-500 transition" />
                        ) : (
                            <AiOutlineHeart className="text-white hover:text-red-300 transition" />
                        )}
                    </div>
                </div>

                <div className="flex items-start justify-between gap-10 mt-5 md:mt-8">
                    <div className="flex items-center gap-4 md:gap-6 lg:gap-8 max-w-[calc(100%-240px)] lg:max-w-none">
                        <img
                            src={currentDoctor.img}
                            alt={currentDoctor.name}
                            className="w-28 h-20 md:w-36 md:h-28 lg:w-44 lg:h-32 rounded-xl border-[3.5px] border-white object-cover"
                        />

                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold">
                                {currentDoctor.name}
                            </h2>

                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm md:text-base text-white/90">{currentDoctor.job}</p>
                                <div className="flex items-center gap-1 bg-white/30 px-2 rounded-full">
                                    <FaStar className="text-yellow-300" />
                                    <span className="text-[12px] md:text-sm font-medium">{currentDoctor.rating || "4.8"}</span>
                                </div>
                            </div>

                            <p className="text-sm md:text-base text-white/80 mt-1">
                                {currentDoctor.clinic || "Klinika nomi"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`translate-y-[-10px] m-auto bg-white text-gray-700 w-[86%] shadow-xl rounded-b-2xl border-t-2 border-[${THEME_COLOR}]/50 px-6 py-6 md:px-8 md:py-7 flex justify-between`}>
                <div className="flex items-center gap-2 md:gap-3">
                    <PiUsersThreeLight className={`text-xl md:text-2xl text-[${THEME_COLOR}]`} />
                    <span className="text-sm md:text-base text-gray-600">{currentDoctor.patients || "200 ta bemor"}</span>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <MdWorkOutline className={`text-xl md:text-2xl text-[${THEME_COLOR}]`} />
                    <span className="text-sm md:text-base text-gray-600">{currentDoctor.exp || "10+ yil"} tajriba</span>
                </div>
            </div>

            <div className="xl:px-[100px] lg:px-[70px] md:p-10 px-5 md:px-8 mt-1.5 space-y-4">
                <div className="flex items-start gap-3">
                    <MdLocationOn className={`text-xl md:text-2xl text-[${THEME_COLOR}]`} />
                    <p className="text-sm md:text-base text-gray-700 leading-6">
                        {currentDoctor.location || "Manzil mavjud emas"}
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <BsClockHistory className={`text-xl md:text-2xl text-[${THEME_COLOR}]`} />
                    <p className="text-sm md:text-base text-gray-700 leading-6">
                        {currentDoctor.is247 ? "24/7 ochiq." : "9:00 dan 18:00 gacha ochiq."}
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <MdOutlineAttachMoney className={`text-xl md:text-2xl text-[${THEME_COLOR}]`} />
                    <p className="text-sm md:text-base text-gray-700 leading-6">
                        {currentDoctor.price || "250 000 so’m"} o‘rtacha narx
                    </p>
                </div>
            </div>

            <div className="xl:px-[100px] lg:px-[70px] md:p-10 px-5 flex items-center gap-3 mt-6">
                <button
                    onClick={() => setActiveTab('work')}
                    className={`flex-1 w-[200px] py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition ${
                        activeTab === 'work'
                            ? `bg-[${THEME_COLOR}] text-white shadow-md`
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                >
                    Olingan ishlar
                </button>

                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 w-[200px] py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition ${
                        activeTab === 'reviews'
                            ? `bg-[${THEME_COLOR}] text-white shadow-md`
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                >
                    Sharhlar
                </button>
            </div>

{/*             {activeTab === 'work' && (
                <div className="px-5 md:px-8 lg:px-[70px] xl:px-[100px] mt-6">
                    <h2 className={`text-lg md:text-xl font-semibold mb-4 text-[${DARK_TEXT}]`}>
                        Foto galereya
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {imageGallery.map((file, index) => (
                            <UploaderPlaceholder
                                key={index}
                                type="image"
                                file={file}
                                isPlaceholder={file === null}
                                setFile={(newFile) => handleSetImageFile(index, newFile)}
                            />
                        ))}
                    </div>

                    <h2 className={`text-lg md:text-xl font-semibold mt-8 mb-4 text-[${DARK_TEXT}]`}>
                        Video galereya
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {videoGallery.map((file, index) => (
                            <UploaderPlaceholder
                                key={index}
                                type="video"
                                file={file}
                                isPlaceholder={file === null}
                                setFile={(newFile) => handleSetVideoFile(index, newFile)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="px-5 md:px-8 lg:px-[70px] xl:px-[100px] mt-6 space-y-5">
                    {reviewsData.map((review) => (
                        <div key={review.id} className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start space-x-3 mb-2">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">{review.name}</h4>
                                    <div className="flex items-center justify-between mt-1">
                                        {renderStars(review.stars)}
                                        <span className="text-xs text-gray-500">{review.timeAgo}</span>
                                    </div>
                                </div>
                            </div>
                            <p className={`text-sm text-gray-700 mt-2 leading-relaxed italic border-l-2 border-[${THEME_COLOR}] pl-2`}>
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>
            )} */}

            <div className="px-5 md:px-8 lg:px-10 py-3 w-full mt-5 bg-white fixed bottom-[70px] left-0 flex items-center justify-between shadow-2xl border-t border-gray-100">
                <Link 
                    to={"/qabulgayozilish"}
                    state={{ doctor: currentDoctor, initialDate: selectedDate }} // Shu yerda ma'lumot jo'natiladi
                    className="flex-1"
                >
                    <button className={`w-full bg-[${THEME_COLOR}] text-white py-3 rounded-2xl font-medium text-[15px] md:text-base transition hover:opacity-90 shadow-md`}>
                        Qabulga yozilish
                    </button>
                </Link>

                <Link to={`/chat/${currentDoctor.id || id}`}>
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#7d58f5] flex items-center justify-center ml-4 cursor-pointer hover:opacity-80 transition`}>
                        <TbMessageDots className="text-2xl md:text-3xl text-white" />
                    </div>
                </Link>

                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#00cf56] flex items-center justify-center ml-3 cursor-pointer hover:opacity-80 transition`}>
                    <LuPhone className="text-2xl md:text-3xl text-white" />
                </div>
            </div>
        </div>
    );
}

export default Shifokorlarim;