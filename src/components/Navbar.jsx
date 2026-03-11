import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Globe, User } from 'lucide-react';
import logoImg from '../assets/logo.png';

const NavContainer = styled.nav`
  position: fixed; top: 0; left: 0; width: 100%; height: 95px;
  background: white; z-index: 1000; display: flex; justify-content: center;
  border-bottom: 1px solid #edf2f7;
`;

const NavContent = styled.div`
  width: 90%; max-width: 1440px; display: flex; 
  justify-content: space-between; align-items: center;
`;

const LogoLink = styled(Link)`
  img { height: 55px; width: auto; transition: 0.3s; } /* LARGE LOGO */
  &:hover img { transform: scale(1.05); }
`;

const NavLinks = styled.div`
  display: flex; gap: 40px;
  @media (max-width: 1024px) { display: none; }
  a {
    text-decoration: none; font-family: 'Poppins', sans-serif; font-weight: 600;
    color: #1F3A93; font-size: 1rem; transition: 0.3s;
    &:hover { color: #FFD700; }
  }
`;

const RightSide = styled.div`
  display: flex; align-items: center; gap: 25px;
`;

const LoginBtn = styled(Link)`
  background: ${({ theme }) => theme.gradients.brand};
  color: white; padding: 14px 35px; border-radius: 14px;
  font-weight: 700; text-decoration: none; font-family: 'Poppins';
  box-shadow: 0 10px 20px rgba(31, 58, 147, 0.2);
  transition: 0.3s;
  &:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(31, 58, 147, 0.3); }
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <NavContainer>
      <NavContent>
        <LogoLink to="/"><img src={logoImg} alt="Kimelia Gira" /></LogoLink>
        <NavLinks>
          <Link to="/">{t('nav_home')}</Link>
          <Link to="/properties">{t('nav_listings')}</Link>
          <Link to="/valuation">{t('nav_valuation')}</Link>
        </NavLinks>
        <RightSide>
          <div style={{display:'flex', gap:'8px', alignItems:'center', fontWeight:700, color:'#1F3A93'}}>
            <Globe size={20} />
            <select style={{border:'none', fontWeight:700, cursor:'pointer'}} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="rw">RW</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <LoginBtn to="/login">{user ? <User /> : "Injira"}</LoginBtn>
        </RightSide>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;