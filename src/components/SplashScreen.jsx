import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SplashWrapper = styled.div`
  position: fixed; inset: 0; z-index: 9999;
  background: #0F172A; /* Deepest Navy */
  display: flex; flex-direction: column; justify-content: center; align-items: center;
`;

const LogoContainer = styled(motion.div)`
  margin-bottom: 40px;
  img { height: 80px; object-fit: contain; }
`;

const ProgressBarContainer = styled.div`
  width: 200px; height: 2px; background: rgba(255, 255, 255, 0.1);
  border-radius: 10px; overflow: hidden; position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #1F3A93, #FFD700, #1F3A93);
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const SplashScreen = () => (
  <SplashWrapper>
    <LogoContainer 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 1 }}
    >
      <img src={logoImg} alt="Kimelia Gira" />
    </LogoContainer>
    <ProgressBarContainer>
      <ProgressFill 
        initial={{ width: "0%" }} 
        animate={{ width: "100%" }} 
        transition={{ duration: 2.5, ease: "easeInOut" }} 
      />
    </ProgressBarContainer>
    <motion.p 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 0.6 }} 
      transition={{ delay: 0.5 }}
      style={{ color: 'white', marginTop: '20px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}
    >
      Initializing Elite Sanctuary
    </motion.p>
  </SplashWrapper>
);

export default SplashScreen;