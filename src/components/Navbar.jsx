import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Globe, User, LogIn } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Nav = styled.nav`
  position: fixed; 
  top: 0; left: 0; 
  width: 100%; 
  height: ${props => props.theme.dimensions.navHeight};
  background: white; /* Solid White - No Image Behind It */
  z-index: 2000; 
  display: flex; 
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.nav};
`;

const NavContainer = styled.div`
  width: 90%; max-width: 1400px;
  display: flex; justify-content: space-between; align-items: center;
`;

const LogoBox = styled(Link)`
  img { height: 45px; width: auto; object-fit: contain; }
`;

const LinksGroup = styled.div`
  display: flex; gap: 40px;
  @media (max-width: 1024px) { display: none; }
  a {
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.9rem;
    color: #1F3A93;
    text-transform: uppercase; letter-spacing: 1px;
    text-decoration: none; transition: 0.3s;
    &:hover { color: #FFD700; }
  }
`;

const ActionsBox = styled.div`
  display: flex; align-items: center; gap: 20px;
`;

const GradientLogin = styled(Link)`
  background: ${props => props.theme.gradients.brand};
  color: white !important; padding: 12px 28px; border-radius: 12px;
  font-weight: 800; text-transform: uppercase; font-size: 0.85rem;
  box-shadow: 0 10px 20px rgba(31, 58, 147, 0.2);
  text-decoration: none; display: flex; align-items: center; gap: 8px;
  &:hover { transform: translateY(-2px); }
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <Nav>
      <NavContainer>
        <LogoBox to="/"><img src={logoImg} alt="Kimelia Gira" /></LogoBox>
        <LinksGroup>
          <Link to="/">{t('nav_home')}</Link>
          <Link to="/properties">{t('nav_listings')}</Link>
          <Link to="/valuation">{t('nav_valuation')}</Link>
        </LinksGroup>
        <ActionsBox>
          <Globe color="#1F3A93" size={22} cursor="pointer" />
          {user ? (
            <User color="#1F3A93" size={24} />
          ) : (
            <GradientLogin to="/login">
               {t('nav_login')} <LogIn size={18} />
            </GradientLogin>
          )}
        </ActionsBox>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;