import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Globe, User } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Nav = styled.nav`
  position: fixed; top: 0; left: 0; width: 100%; height: 80px;
  background: white; z-index: 2000; display: flex; justify-content: center;
  border-bottom: 1px solid #E2E8F0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
`;

const NavContainer = styled.div`
  width: 90%; max-width: 1400px;
  display: flex; justify-content: space-between; align-items: center;
`;

const LogoBox = styled(Link)`
  img { height: 48px; width: auto; object-fit: contain; }
`;

const MenuLinks = styled.div`
  display: flex; gap: 40px;
  @media (max-width: 1024px) { display: none; }
  a {
    font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.85rem;
    color: #1F3A93; text-transform: uppercase; letter-spacing: 0.5px;
    transition: 0.3s; text-decoration: none;
    &:hover { color: #FFD700; }
  }
`;

const GradientAction = styled(Link)`
  background: ${({ theme }) => theme.gradients.brand};
  color: white !important; padding: 12px 28px; border-radius: 10px;
  font-family: 'Space Grotesk', sans-serif; font-weight: 700; 
  text-transform: uppercase; font-size: 0.8rem;
  box-shadow: 0 10px 25px rgba(31, 58, 147, 0.15);
  transition: 0.3s; text-decoration: none;
  &:hover { transform: translateY(-2px); filter: brightness(1.1); }
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <Nav>
      <NavContainer>
        <LogoBox to="/"><img src={logoImg} alt="Logo" /></LogoBox>
        <MenuLinks>
          <Link to="/">{t('nav_home')}</Link>
          <Link to="/properties">{t('nav_listings')}</Link>
          <Link to="/valuation">{t('nav_valuation')}</Link>
        </MenuLinks>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <select 
            value={i18n.language} 
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{border:'none', background:'none', fontWeight:700, cursor:'pointer', color:'#1F3A93'}}
          >
            <option value="en">EN</option>
            <option value="rw">RW</option>
            <option value="fr">FR</option>
          </select>
          {user ? <User color="#1F3A93" size={24} /> : <GradientAction to="/login">{t('nav_login')}</GradientAction>}
        </div>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;