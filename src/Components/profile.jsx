import React, { useRef, useState } from 'react';
import { FaChevronLeft, FaCamera, FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const DEFAULT_CENTER = [40.9995, 71.6444];

function LocationMarker({ onSelect }) {
  useMapEvents({
    click(e) {
      const pos = [e.latlng.lat, e.latlng.lng];
      onSelect(pos, `Lat ${pos[0].toFixed(4)}, Lng ${pos[1].toFixed(4)}`);
    },
  });

  return null;
}

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [coords, setCoords] = useState(DEFAULT_CENTER);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
    },
  });

  const onSubmit = (data) => {
    console.log('SAQLANDI ✅', {
      ...data,
      profileImage,
      coords,
    });

    navigate('/saqlandi');
  };

  const handleImagePick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleLocationSelect = (pos, addressText) => {
    setCoords(pos);
    setValue('address', addressText, { shouldValidate: true });
    setIsMapOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[450px] bg-white shadow-xl">

        <div className="h-[200px] bg-[#00BCE4] rounded-b-[40px] relative p-5">
          <FaChevronLeft
            className="absolute top-5 left-5 text-white text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-white text-xl font-semibold text-center mt-[130px]">
            Ma'lumotlarni kiriting
          </h2>

          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[65px]
                       w-[110px] h-[110px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleImagePick}
          >
            {profileImage ? (
              <img src={profileImage} className="w-full h-full rounded-full object-cover" />
            ) : (
              <FaUserAlt className="text-[60px] text-gray-400" />
            )}
            <div className="absolute right-[-20px] top-0 bg-green-500 w-[40px] h-[40px] rounded-full flex items-center justify-center">
              <FaCamera className="text-white" />
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-10 space-y-6">

          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'Ism majburiy' }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Ism"
                className={`w-full h-[50px] rounded-[10px] px-4 border
                ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Familiya majburiy' }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Familiya"
                className={`w-full h-[50px] rounded-[10px] px-4 border
                ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: 'Manzil tanlanmagan' }}
            render={({ field }) => (
              <div>
                <p className="mb-2 text-sm text-gray-700">
                  {field.value || 'Manzil tanlanmagan'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsMapOpen(true)}
                  className="w-full h-[45px] border-2 border-[#00BCE4] text-[#00BCE4] rounded-[10px]"
                >
                  <FaMapMarkerAlt className="inline mr-2" />
                  Manzilni tanlash
                </button>
              </div>
            )}
          />

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full h-[55px] rounded-[10px] text-white font-semibold
            ${isValid ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Saqlash
          </button>
        </form>
      </div>

      {isMapOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end">
          <div className="w-full max-w-[450px] h-[70vh] bg-white rounded-t-[30px] p-4">
            <MapContainer center={coords} zoom={14} className="h-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker onSelect={handleLocationSelect} />
              <Marker position={coords} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
