import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, MapPin, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroImg from '../assets/hero-bg.jpg';

const HeroWrapper = styled.section`
  /* Push down by the Navbar's height */
  margin-top: ${props => props.theme.dimensions.navHeight};
  /* Height is screen height MINUS navbar height */
  height: calc(100vh - ${props => props.theme.dimensions.navHeight}); 
  width: 100vw;
  background: ${({ theme }) => theme.gradients.overlay}, url(${heroImg});
  background-size: cover; 
  background-position: center;
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
  padding: 0 5%; 
  text-align: center; 
  position: relative;
`;

const ContentBox = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  z-index: 10;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem); 
  color: white; 
  font-weight: 800;
  line-height: 1.1; 
  margin-bottom: 25px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
  span { color: #FFD700; }
`;

const SearchContainer = styled(motion.div)`
  background: white; 
  border-radius: 20px; 
  padding: 10px;
  display: flex; 
  align-items: center; 
  width: 100%; 
  max-width: 950px;
  margin: 40px auto 0;
  box-shadow: ${({ theme }) => theme.shadows.search};
  
  @media (max-width: 900px) {
    flex-direction: column; 
    border-radius: 20px; 
    padding: 20px;
  }
`;

const InputGroup = styled.div`
  display: flex; 
  align-items: center; 
  flex: 1; 
  padding: 0 25px;
  border-right: 1px solid #f1f5f9;
  &:last-of-type { border-right: none; }
  
  input, select {
    border: none; 
    outline: none; 
    padding: 20px 10px;
    width: 100%; 
    font-size: 1rem; 
    font-weight: 600;
    color: #1F3A93;
    &::placeholder { color: #94a3b8; }
  }

  @media (max-width: 900px) {
    border-right: none; 
    width: 100%; 
    border-bottom: 1px solid #eee;
  }
`;

const SearchBtn = styled(motion.button)`
  background: linear-gradient(135deg, #1F3A93, #FFD700);
  width: 65px; height: 65px; 
  border-radius: 18px;
  display: flex; justify-content: center; align-items: center;
  color: white;
  
  @media (max-width: 900px) {
    width: 100%; height: 60px; margin-top: 15px;
  }
`;

const Hero = () => {
  const { t } = useTranslation();
  return (
    <HeroWrapper>
      <ContentBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroTitle>
          Find Your <span>Dream Home</span><br/>In Rwanda
        </HeroTitle>
        <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 500 }}>
          Premium AI-driven listings and smart valuations.
        </p>

        <SearchContainer
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <InputGroup>
            <MapPin size={22} color="#1F3A93" />
            <input placeholder="Location (e.g. Nyarutarama)" />
          </InputGroup>
          <InputGroup>
            <Home size={22} color="#1F3A93" />
            <select>
              <option>Modern Villa</option>
              <option>Luxury Apartment</option>
              <option>Prime Land</option>
            </select>
          </InputGroup>
          <SearchBtn whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Search size={28} />
          </SearchBtn>
        </SearchContainer>
      </ContentBox>
    </HeroWrapper>
  );
};

export default Hero;