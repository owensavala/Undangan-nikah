import React, { useState, useEffect } from 'react';
import { invitationData as defaultData } from './data/invitationData';
import { getThemeVariables } from './data/themes';
import CoverModal from './components/CoverModal';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import EventSection from './components/EventSection';
import StorySection from './components/StorySection';
import GallerySection from './components/GallerySection';
import TurutMengundangSection from './components/TurutMengundangSection';
import GiftSection from './components/GiftSection';
import RsvpSection from './components/RsvpSection';
import FooterSection from './components/FooterSection';
import AudioPlayer from './components/AudioPlayer';
import AutoScrollController from './components/AutoScrollController';
import AdminDashboard from './components/AdminDashboard';
import AdminLockModal from './components/AdminLockModal';
import { Home, Users, Calendar, Image, MessageSquare, Settings } from 'lucide-react';

const STORAGE_KEY = 'wedding_data_mira_wahyudi_v4';
const SESSION_AUTH_KEY = 'wedding_admin_authenticated';

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return defaultData;
  });

  const [isOpened, setIsOpened] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'edit' || params.get('admin') === 'true') {
      setShowAdminButton(true);
      if (sessionStorage.getItem(SESSION_AUTH_KEY) === 'true') {
        setIsAdminMode(true);
      } else {
        setShowLockModal(true);
      }
    }
  }, []);

  const themeVars = getThemeVariables(data.theme?.preset || 'emerald-gold');

  const handleOpenInvitation = () => {
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Storage error:", e);
    }
  };

  const handleResetData = () => {
    setData(defaultData);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SESSION_AUTH_KEY);
    } catch (e) {}
  };

  const handleRequestEdit = () => {
    if (sessionStorage.getItem(SESSION_AUTH_KEY) === 'true') {
      setIsAdminMode(true);
    } else {
      setShowLockModal(true);
    }
  };

  const handleUnlockSuccess = () => {
    sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
    setShowLockModal(false);
    setIsAdminMode(true);
    setShowAdminButton(true);
  };

  const handleLogoutAdmin = () => {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setIsAdminMode(false);
  };

  // If in Admin Dashboard Mode
  if (isAdminMode) {
    return (
      <div style={themeVars}>
        <AdminDashboard
          data={data}
          onSave={handleSaveData}
          onReset={handleResetData}
          onClosePreview={() => setIsAdminMode(false)}
          onLogout={handleLogoutAdmin}
        />
      </div>
    );
  }

  // Normal Invitation View (Matching van-dan-rama layout)
  return (
    <div className="relative min-h-screen bg-[#111111] text-[#222222] font-sans">
      
      {/* DESKTOP AMBIENT WALLPAPER BACKGROUND */}
      <div 
        className="fixed inset-0 hidden md:block bg-cover bg-center filter brightness-[0.25] blur-[12px] transform scale-110 pointer-events-none z-0"
        style={{ backgroundImage: `url(${data.couple.coverPhoto})` }}
      />
      <div className="fixed inset-0 hidden md:block bg-black/65 pointer-events-none z-0" />

      {/* Floating Background Music Player */}
      <AudioPlayer audioUrl={data.audioUrl} isInvitationOpened={isOpened} />

      {/* Cinematic Smart Auto-Scroll Controller */}
      <AutoScrollController isInvitationOpened={isOpened} isEditing={isAdminMode} />

      {/* Floating "Mode Edit" Button (HANYA MUNCUL JIKA LINK ADMIN DIAKSES) */}
      {showAdminButton && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={handleRequestEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-serif shadow-xl hover:bg-gray-100 transition-all cursor-pointer"
            title="Buka Dashboard Edit Undangan"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="font-semibold">Edit Undangan</span>
          </button>
        </div>
      )}

      {/* PIN Lock Security Modal */}
      <AdminLockModal
        isOpen={showLockModal}
        correctPin={data.security?.pin || "1212"}
        onUnlock={handleUnlockSuccess}
        onCancel={() => setShowLockModal(false)}
      />

      {/* Opening Cover Modal Gate */}
      <CoverModal
        isOpen={!isOpened}
        onOpen={handleOpenInvitation}
        data={data}
      />

      {/* CENTERED MOBILE/EDITORIAL CONTAINER (Max 440px matching van-dan-rama iPhone viewport) */}
      <div className="relative z-10 max-w-[440px] w-full mx-auto min-h-screen shadow-2xl bg-white overflow-x-hidden">
        <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
          
          <div id="home">
            <HeroSection data={data} />
          </div>

          <div id="couple">
            <CoupleSection data={data} />
          </div>

          <div id="event">
            <EventSection data={data} />
          </div>

          <div id="moment">
            <GallerySection data={data} />
          </div>

          <div id="story">
            <StorySection data={data} />
          </div>

          <div id="gift">
            <GiftSection data={data} />
          </div>

          <div id="family">
            <TurutMengundangSection data={data} />
          </div>

          <div id="guestbook">
            <RsvpSection data={data} />
          </div>

          <FooterSection data={data} />

          {/* FLOATING WHITE NAVIGATION PILL (Exact match to reference screenshots 2, 3, 4, 5) */}
          {isOpened && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[440px] w-full px-4 flex justify-center pointer-events-none">
              <nav className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.25)] border border-gray-200/80 px-4 py-2 flex items-center justify-center gap-3 sm:gap-4">
                {[
                  { id: 'home', icon: Home, label: 'Home' },
                  { id: 'couple', icon: Users, label: 'Couple' },
                  { id: 'event', icon: Calendar, label: 'Event' },
                  { id: 'moment', icon: Image, label: 'Moment' },
                  { id: 'guestbook', icon: MessageSquare, label: 'Wishes' },
                ].map((nav) => {
                  const Icon = nav.icon;
                  return (
                    <button
                      key={nav.id}
                      onClick={() => scrollToSection(nav.id)}
                      aria-label={nav.label}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black transition-all duration-200 cursor-pointer"
                      title={nav.label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </nav>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
