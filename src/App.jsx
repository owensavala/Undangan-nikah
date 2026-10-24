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
import FallingPetals from './components/FallingPetals';
import AutoScrollController from './components/AutoScrollController';
import AdminDashboard from './components/AdminDashboard';
import AdminLockModal from './components/AdminLockModal';
import { Heart, Calendar, Image, Gift, MessageSquare, Home, Settings } from 'lucide-react';

const STORAGE_KEY = 'wedding_custom_data_mira_dimas';
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
      // Check session authentication
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

  // Normal Invitation View
  return (
    <div style={themeVars} className="relative min-h-screen bg-[#050a08] text-[#FAF7F2] font-sans selection:bg-gold-500 selection:text-black">
      
      {/* DESKTOP AMBIENT WALLPAPER BACKGROUND */}
      <div 
        className="fixed inset-0 hidden md:block bg-cover bg-center filter brightness-[0.2] blur-[8px] transform scale-110 pointer-events-none z-0"
        style={{ backgroundImage: `url(${data.couple.coverPhoto})` }}
      />
      <div className="fixed inset-0 hidden md:block bg-black/60 pointer-events-none z-0" />

      {/* Floating Gold Particles Effect */}
      <FallingPetals />

      {/* Floating Background Music Player */}
      <AudioPlayer audioUrl={data.audioUrl} isInvitationOpened={isOpened} />

      {/* Cinematic Smart Auto-Scroll Controller */}
      <AutoScrollController isInvitationOpened={isOpened} isEditing={isAdminMode} />

      {/* Floating "Mode Edit" Button (HANYA MUNCUL JIKA LINK ADMIN DIAKSES) */}
      {showAdminButton && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={handleRequestEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-400/50 bg-[#0d1613]/85 backdrop-blur-md text-gold-200 text-xs font-serif shadow-xl hover:bg-gold-500 hover:text-black transition-all"
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

      {/* CENTERED MOBILE/EDITORIAL CONTAINER */}
      <div 
        className="relative z-10 max-w-[480px] w-full mx-auto min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.9)] border-x border-gold-400/20 overflow-x-hidden"
        style={{ backgroundColor: themeVars['--theme-bg'] }}
      >
        <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
          
          <div id="home">
            <HeroSection data={data} />
          </div>

          <div id="couple">
            <CoupleSection data={data} />
          </div>

          <div id="events">
            <EventSection data={data} />
          </div>

          <div id="gallery">
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

          <div id="rsvp">
            <RsvpSection data={data} />
          </div>

          <FooterSection data={data} />

          {/* Floating Navigation Dock */}
          {isOpened && (
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 rounded-full border border-gold-400/40 bg-[#0d1613]/90 backdrop-blur-xl shadow-2xl flex items-center gap-1 sm:gap-2">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'couple', icon: Heart, label: 'Mempelai' },
                { id: 'events', icon: Calendar, label: 'Acara' },
                { id: 'gallery', icon: Image, label: 'Galeri' },
                { id: 'story', icon: Heart, label: 'Story' },
                { id: 'gift', icon: Gift, label: 'Kado' },
                { id: 'rsvp', icon: MessageSquare, label: 'Doa' },
              ].map((nav, index) => {
                const Icon = nav.icon;
                return (
                  <button
                    key={`${nav.id}-${index}`}
                    onClick={() => scrollToSection(nav.id)}
                    aria-label={nav.label}
                    className="p-2 rounded-full hover:bg-gold-500/20 text-gold-300 hover:text-gold-100 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </nav>
          )}

        </main>
      </div>
    </div>
  );
}
