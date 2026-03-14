import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Globe, User, LogIn } from 'lucide-react';
import logoImg from '../assets/logo.png';

const NavWrapper = styled.nav`
  position: fixed; top: 0; left: 0; width: 100%; height: 80px;
  background: white; z-index: 2000; display: flex; justify-content: center;
  border-bottom: 1px solid #F1F5F9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
`;

const Container = styled.div`
  width: 90%; max-width: 1440px;
  display: flex; justify-content: space-between; align-items: center;
`;

const LogoBox = styled(Link)`
  img { height: 60px; width: auto; object-fit: contain; transition: 0.3s; }
  &:hover img { transform: scale(1.05); }
`;

const NavLinks = styled.div`
  display: flex; gap: 45px;
  @media (max-width: 1024px) { display: none; }
  
  a {
    font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.85rem;
    color: #1F3A93; text-transform: uppercase; letter-spacing: 1px;
    text-decoration: none; position: relative;
    
    &::after {
      content: ''; position: absolute; width: 0; height: 2px;
      bottom: -4px; left: 0; background: #FFD700; transition: 0.3s;
    }
    &:hover::after { width: 100%; }
  }
`;

const ActionSide = styled.div`
  display: flex; align-items: center; gap: 25px;
`;

const LangSelector = styled.div`
  display: flex; align-items: center; gap: 6px;
  background: #F8FAFC; padding: 8px 14px; border-radius: 10px;
  border: 1px solid #E2E8F0;
  select {
    border: none; background: none; font-family: 'Space Grotesk';
    font-weight: 700; font-size: 0.8rem; color: #1F3A93; cursor: pointer;
  }
`;

const LoginCTA = styled(Link)`
  background: ${({ theme }) => theme.gradients.brand}; /* Mono-Blue Gradient */
  color: white !important; padding: 12px 30px; border-radius: 10px;
  font-family: 'Space Grotesk'; font-weight: 800; font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 1px; text-decoration: none;
  box-shadow: 0 10px 20px rgba(31, 58, 147, 0.15);
  display: flex; align-items: center; gap: 8px;
  &:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(31, 58, 147, 0.2); }
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <NavWrapper>
      <Container>
        <LogoBox to="/"><img src={logoImg} alt="Kimelia Gira" /></LogoBox>
        <NavLinks>
          <Link to="/">{t('nav_home')}</Link>
          <Link to="/properties">{t('nav_listings')}</Link>
          <Link to="/valuation">{t('nav_valuation')}</Link>
        </NavLinks>
        <ActionSide>
          <LangSelector>
            <Globe size={16} color="#1F3A93" />
            <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="rw">RW</option>
              <option value="fr">FR</option>
            </select>
          </LangSelector>
          {user ? (
            <Link to="/dashboard"><User color="#1F3A93" size={24} /></Link>
          ) : (
            <LoginCTA to="/login">
              {t('nav_login')} <LogIn size={16} />
            </LoginCTA>
          )}
        </ActionSide>
      </Container>
    </NavWrapper>
  );
};

export default Navbar;