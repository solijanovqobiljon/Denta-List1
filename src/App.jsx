import React from "react";
import { Route, Routes } from "react-router-dom";
import Kirish from "./Components/kirish";
import Kirish2 from "./Components/kirish2";
import Royhatdanotish from "./Components/Royhatdanotish";
import Sms from "./Components/sms";
import Profile from "./Components/profile";
import Saqlandi from "./Components/saqlandi";
import Login from "./Components/login";
import Parol_tiklash from "./Components/parol_tiklash";
import Parol_tiklashNUm from "./Components/parolnitiklashNum";
import ParolniYangilash from "./Components/yangilash";
import Boshsaxifa from "./pages/Boshsaxifa";
import Sitebar from "./sitebar";
// DOKTOR PROFIL SAHIFASI (Masalan, ShifokorProfile deb o'zgartirdik, chalkashmaslik uchun)
import ShifokorProfile from "./pages/Shifokorlarim";
// YANGI: Foydalanuvchining yozilgan shifokorlari ro'yxati sahifasi
import MeningShifokorlarim from "./pages/MeningShifokorlarim";
import Profil_pages from "./pages/profil";
import Notification from "./pages/Notification";
import Yoqtirishlar from "./pages/yoqtirishlar";
import Sharhlar from "./pages/sharhlar";
import B24_7 from "./pages/B24_7";
import EngYaxshi from "./pages/Engyaxshi";
import AyolDoktor from "./pages/AyolDoktor";
import BolalarDoktori from "./pages/BolalarDoktori";
import QabulgaYozilish from "../src/pages/QabulgayozilishB";
import Engyaqin from "./pages/engyaqin";
import QabulgaYozilish2B from "./pages/QabulgaYozilish2B";
import QabulTasdiqlash from "./pages/QabulTasdiqlash";
import Chat from "./pages/chat";
import OveralChats from "./pages/OveralChats";

const App = () => {
  return (
    <div className="">
    <Routes>
      <Route path="/" element={<Kirish />} />

      <Route path="kirish2" element={<Kirish2 />} />
      <Route path="login" element={<Login />} />
      <Route path="royhatdanotish" element={<Royhatdanotish />} />
      <Route path="sms" element={<Sms />} />
      <Route path="profile" element={<Profile />} />
      <Route path="saqlandi" element={<Saqlandi />} />
      <Route path="Parol_tiklash" element={<Parol_tiklash />} />
      <Route path="Parol_tiklashNum" element={<Parol_tiklashNUm />} />
      <Route path="yangilash" element={<ParolniYangilash />} />


      <Route path="boshsaxifa" element={<Boshsaxifa />} />
     
      {/* DOKTOR PROFIL SAHIFASI: /shifokorlar/1, /shifokorlar/2 */}
      <Route path="shifokorlar/:id" element={<ShifokorProfile />} />

      {/* YANGI QO'SHILGAN: FOYDALANUVCHINING YOZILGAN SHIFOKORLAR RO'YXATI */}
      <Route path="mening-shifokorlarim" element={<MeningShifokorlarim />} />
     
      <Route path="profil" element={<Profil_pages />} />
      <Route path="Notification" element={<Notification />} />
      <Route path="yoqtirishlar" element={<Yoqtirishlar />} />
      <Route path="sharhlar" element={<Sharhlar />} />
      <Route path="B24_7" element={<B24_7 />} />
      <Route path="EngYaxshi" element={<EngYaxshi />} />
      <Route path="AyolDoktor" element={<AyolDoktor />} />
      <Route path="BolalarDoktori" element={<BolalarDoktori />} />
      <Route path="qabulgayozilish" element={<QabulgaYozilish />} />
      <Route path="qabulgayozilish2" element={<QabulgaYozilish2B />} />
      <Route path="qabultasdiqlash" element={<QabulTasdiqlash />} />
      <Route path="engyaqin" element={<Engyaqin />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="chats" element={<OveralChats />} />
    </Routes>
    <Sitebar/>
    </div>
  );
};

export default App;
