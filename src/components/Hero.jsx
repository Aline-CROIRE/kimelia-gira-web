import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, MapPin, Building2 } from 'lucide-react';
import heroImg from '../assets/hero-bg.jpg';

const HeroWrapper = styled.section`
  margin-top: 80px; height: calc(100vh - 80px); width: 100vw;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 0 5%; text-align: center;
`;

const CinematicBackground = styled.div`
  position: absolute; inset: 0;
  /* Double dark overlay: Top-down gradient + subtle blur */
  background: 
    linear-gradient(rgba(10, 15, 30, 0.9), rgba(10, 15, 30, 0.4)),
    radial-gradient(circle at center, transparent 0%, #0A0F1E 100%),
    url(${heroImg});
  background-size: cover; background-position: center;
  z-index: -1;
`;

const ToggleContainer = styled.div`
  background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px);
  padding: 4px; border-radius: 100px; display: flex; position: relative;
  width: 190px; margin-bottom: 25px; border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Option = styled.button`
  flex: 1; padding: 10px; border-radius: 100px;
  font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.7rem; 
  text-transform: uppercase; color: ${props => props.active ? '#1F3A93' : 'rgba(255,255,255,0.6)'};
  background: transparent; position: relative; z-index: 2; transition: 0.4s;
`;

const ActiveSlider = styled(motion.div)`
  position: absolute; top: 4px; left: 4px;
  width: calc(50% - 4px); height: calc(100% - 8px);
  background: ${({ theme }) => theme.gradients.brand}; border-radius: 100px; z-index: 1;
`;

const MainTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); 
  color: white; line-height: 1.1; margin-bottom: 15px;
  span {
    background: ${({ theme }) => theme.gradients.brand};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SearchEngine = styled(motion.div)`
  background: white; border-radius: 16px; padding: 6px;
  display: flex; align-items: center; width: 100%; max-width: 800px; 
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  @media (max-width: 900px) { flex-direction: column; border-radius: 20px; padding: 15px; }
`;

const InputField = styled.div`
  display: flex; align-items: center; flex: 1; padding: 0 20px; border-right: 1px solid #f1f5f9;
  &:last-of-type { border-right: none; }
  input, select { 
    border: none; outline: none; padding: 12px 5px; width: 100%; 
    font-size: 0.85rem; font-weight: 600; color: #1F3A93; background: transparent; 
    &::placeholder { color: #94a3b8; }
  }
`;

const SearchBtn = styled(motion.button)`
  background: ${({ theme }) => theme.gradients.brand};
  width: 50px; height: 50px; border-radius: 12px; display: flex; 
  justify-content: center; align-items: center; color: white;
  @media (max-width: 900px) { width: 100%; margin-top: 10px; height: 45px; }
`;

const Hero = () => {
  const [mode, setMode] = useState('buy');

  return (
    <HeroWrapper>
      <CinematicBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <ToggleContainer>
          <ActiveSlider animate={{ x: mode === 'buy' ? 0 : '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
          <Option active={mode === 'buy'} onClick={() => setMode('buy')}>Buy</Option>
          <Option active={mode === 'rent'} onClick={() => setMode('rent')}>Rent</Option>
        </ToggleContainer>
        <MainTitle>Find Your <span>Premium</span> <br/> Sanctuary In Rwanda</MainTitle>
        <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginBottom:'40px', fontWeight: 500}}>Verified elite listings powered by Kimelia AI.</p>
      </motion.div>

      <SearchEngine initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
        <InputField><MapPin size={18} color="#1F3A93"/><input placeholder="Location..." /></InputField>
        <InputField><Building2 size={18} color="#1F3A93"/><select><option>Modern Villa</option><option>Land</option></select></InputField>
        <SearchBtn whileHover={{ scale: 1.05 }}><Search size={20}/></SearchBtn>
      </SearchEngine>
    </HeroWrapper>
  );
};

export default Hero;