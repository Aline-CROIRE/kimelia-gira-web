import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

const HeroSection = styled.section`
  width: 100vw; height: 100vh; /* FULL PAGE FIT */
  position: relative; overflow: hidden;
  background: ${({ theme }) => theme.gradients.heroOverlay}, 
              url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop');
  background-size: cover; background-position: center;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 0 5%;
`;

const HeroContent = styled.div`
  text-align: center; color: white; z-index: 10; width: 100%; max-width: 1200px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 5rem); /* RESPONSIVE SIZE */
  font-family: 'Poppins', sans-serif; font-weight: 800; line-height: 1.1; margin-bottom: 20px;
  span { color: ${({ theme }) => theme.colors.accent}; }
`;

const SubText = styled.p`
  font-size: clamp(1rem, 2vw, 1.4rem); margin-bottom: 60px; opacity: 0.9;
`;

const SearchEngine = styled(motion.div)`
  background: white; border-radius: 24px; padding: 15px;
  display: flex; align-items: center; gap: 10px; width: 100%; max-width: 1100px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  @media (max-width: 900px) { flex-direction: column; border-radius: 20px; padding: 30px; }
`;

const InputBox = styled.div`
  flex: 1; display: flex; align-items: center; gap: 12px; padding: 15px 25px;
  border-right: 1px solid #eee;
  &:nth-last-child(2) { border-right: none; }
  @media (max-width: 900px) { border-right: none; border-bottom: 1px solid #eee; width: 100%; }
  
  input, select {
    border: none; outline: none; width: 100%; font-size: 1rem; font-weight: 500;
    font-family: 'Roboto'; color: #1F3A93;
  }
`;

const SearchSubmit = styled(motion.button)`
  background: ${({ theme }) => theme.gradients.brand};
  width: 70px; height: 70px; border-radius: 20px; display: flex; 
  justify-content: center; align-items: center; color: white;
  @media (max-width: 900px) { width: 100%; height: 60px; margin-top: 10px; }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <Title initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Discover Your <br/> <span>Premium</span> Sanctuary
        </Title>
        <SubText>The most advanced AI-powered gateway to Rwanda's exclusive properties.</SubText>

        <SearchEngine initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <InputBox>
            <MapPin color="#1F3A93" />
            <input placeholder="Location (e.g. Nyarutarama)" />
          </InputBox>
          <InputBox>
            <Home color="#1F3A93" />
            <select>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Land</option>
            </select>
          </InputBox>
          <InputBox>
            <DollarSign color="#1F3A93" />
            <input placeholder="Max Price" />
          </InputBox>
          <SearchSubmit whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Search size={28} />
          </SearchSubmit>
        </SearchEngine>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;