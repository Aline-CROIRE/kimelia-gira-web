import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, MapPin, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-bg.jpg';

const HeroWrapper = styled.section`
  margin-top: 80px;
  height: calc(100vh - 80px);
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 5%;
  z-index: 1;

  /* The Background Engine */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    /* This ensures the image is visible but dark enough for "Quiet Luxury" */
    background: 
      linear-gradient(rgba(10, 15, 30, 0.85), rgba(10, 15, 30, 0.7)), 
      url(${heroImg});
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`;

const ToggleContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  padding: 4px; border-radius: 100px;
  display: flex; position: relative;
  width: 180px; margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  flex: 1; padding: 10px; border-radius: 100px;
  font-family: 'Space Grotesk'; font-weight: 700; font-size: 0.65rem;
  text-transform: uppercase; color: ${props => props.active ? '#1F3A93' : 'rgba(255,255,255,0.5)'};
  background: transparent; position: relative; z-index: 2;
`;

const SearchEngine = styled(motion.div)`
  background: white; border-radius: 16px; padding: 8px;
  display: flex; align-items: center; width: 100%; max-width: 780px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  @media (max-width: 900px) { flex-direction: column; border-radius: 20px; }
`;

const Hero = () => {
  const [type, setType] = useState('buy');
  const navigate = useNavigate();

  return (
    <HeroWrapper>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <ToggleContainer>
          <motion.div 
            animate={{ x: type === 'buy' ? 0 : '100%' }} 
            style={{ position: 'absolute', top: 4, left: 4, width: 'calc(50% - 4px)', height: 'calc(100% - 8px)', background: 'white', borderRadius: '100px', zIndex: 1 }} 
          />
          <Tab active={type === 'buy'} onClick={() => setType('buy')}>Buy</Tab>
          <Tab active={type === 'rent'} onClick={() => setType('rent')}>Rent</Tab>
        </ToggleContainer>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', fontWeight: 700, lineHeight: 1.2, marginBottom: '15px' }}>
          Discover Your <span style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Elite</span> Sanctuary
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '45px' }}>
          AI-VERIFIED LUXURY REAL ESTATE
        </p>
      </motion.div>

      <SearchEngine initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
        <div style={{ flex: 1, display: 'flex', padding: '0 20px', gap: '10px', alignItems: 'center' }}>
          <MapPin color="#1F3A93" size={18} />
          <input placeholder="Location..." style={{ border: 'none', outline: 'none', width: '100%', fontWeight: 700, fontSize: '0.85rem', color: '#1F3A93' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', padding: '0 20px', gap: '10px', alignItems: 'center', borderLeft: '1px solid #f1f5f9' }}>
          <Building2 color="#1F3A93" size={18} />
          <select style={{ border: 'none', outline: 'none', width: '100%', fontWeight: 700, fontSize: '0.85rem', color: '#1F3A93' }}>
             <option>Modern Villa</option>
             <option>Penthouse</option>
             <option>Land</option>
          </select>
        </div>
        <button 
          onClick={() => navigate('/properties')}
          style={{ background: '#1F3A93', color: 'white', width: '52px', height: '52px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Search size={22} />
        </button>
      </SearchEngine>
    </HeroWrapper>
  );
};

export default Hero;