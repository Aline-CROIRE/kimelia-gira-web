import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, UserCheck, Home, Briefcase, ArrowRight, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero-bg.jpg';

const AuthContainer = styled.div`
  min-height: 100vh; width: 100vw; display: grid; grid-template-columns: 1fr 1fr;
  background: white; @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

/* --- LEFT SIDE: THE ARTISTIC VISION --- */
const VisualSide = styled.div`
  background: linear-gradient(rgba(10, 15, 30, 0.8), rgba(10, 15, 30, 0.95)), url(${heroImg});
  background-size: cover; background-position: center;
  padding: 80px; display: flex; flex-direction: column; justify-content: center;
  color: white; position: relative; @media (max-width: 1024px) { display: none; }
`;

const FloatingLogo = styled(Link)`
  position: absolute; top: 60px; left: 80px;
  img { height: 50px; filter: brightness(0) invert(1); }
`;

/* --- RIGHT SIDE: THE INTERACTIVE FORM --- */
const FormSide = styled.div`
  background: #F8FAFC; display: flex; flex-direction: column; 
  justify-content: center; align-items: center; padding: 40px;
`;

const FormCard = styled(motion.div)`
  width: 100%; max-width: 440px;
`;

const RoleGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 25px;
`;

const RoleCard = styled.div`
  padding: 15px 5px; border-radius: 12px; cursor: pointer; text-align: center;
  border: 2px solid ${props => props.active ? '#1F3A93' : '#E2E8F0'};
  background: ${props => props.active ? 'white' : 'transparent'};
  transition: 0.3s;
  svg { color: ${props => props.active ? '#1F3A93' : '#94A3B8'}; margin-bottom: 5px; }
  span { display: block; font-size: 0.65rem; font-weight: 800; font-family: 'Space Grotesk'; color: #1F3A93; }
`;

const InputBox = styled.div`
  margin-bottom: 18px; text-align: left;
  label { display: block; margin-bottom: 8px; font-weight: 700; color: #1F3A93; font-size: 0.8rem; font-family: 'Space Grotesk'; }
  .field {
    position: relative;
    input { 
        width: 100%; padding: 16px 16px 16px 48px; border-radius: 12px; 
        border: 1.5px solid #E2E8F0; background: white; outline: none; transition: 0.3s;
        font-family: 'Inter'; font-weight: 500;
        &:focus { border-color: #3B5BDB; box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.05); }
    }
    svg { position: absolute; left: 16px; top: 16px; color: #1F3A93; opacity: 0.4; }
  }
`;

const MainBtn = styled(motion.button)`
  width: 100%; padding: 18px; border-radius: 12px; margin-top: 10px;
  background: ${props => props.theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1px;
`;

const Auth = () => {
  const { t, i18n } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    try {
      const res = await API.post(endpoint, { ...formData, language: i18n.language });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) { alert("Action Failed. Please check details."); }
  };

  return (
    <AuthContainer>
      <VisualSide>
        <FloatingLogo to="/"><img src={logoImg} alt="Logo"/></FloatingLogo>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '3.5rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.1 }}>
                The Future of <br/> <span style={{ color: '#FFD700' }}>Investment</span>
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.6, maxWidth: '400px', lineHeight: '1.6', fontFamily: 'Inter' }}>
                Join Rwanda's most exclusive digital real estate ecosystem, powered by AI.
            </p>
        </motion.div>
      </VisualSide>

      <FormSide>
        <AnimatePresence mode="wait">
          <FormCard 
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.4rem', color: '#1F3A93', marginBottom: '8px' }}>
                {isLogin ? t('auth_welcome_back') : t('nav_register')}
            </h1>
            <p style={{ color: '#64748B', marginBottom: '35px', fontWeight: 500, fontFamily: 'Inter' }}>
                {isLogin ? t('auth_subtitle_login') : t('auth_subtitle_reg')}
            </p>

            {!isLogin && (
              <>
                <label style={{ display: 'block', marginBottom: '15px', fontWeight: 800, color: '#1F3A93', fontSize: '0.75rem', fontFamily: 'Space Grotesk' }}>{t('auth_role')}</label>
                <RoleGrid>
                    <RoleCard active={formData.role === 'buyer'} onClick={() => setFormData({...formData, role: 'buyer'})}>
                        <UserCheck size={22}/><span>{t('auth_role_buyer')}</span>
                    </RoleCard>
                    <RoleCard active={formData.role === 'owner'} onClick={() => setFormData({...formData, role: 'owner'})}>
                        <Home size={22}/><span>{t('auth_role_owner')}</span>
                    </RoleCard>
                    <RoleCard active={formData.role === 'broker'} onClick={() => setFormData({...formData, role: 'broker'})}>
                        <Briefcase size={22}/><span>{t('auth_role_broker')}</span>
                    </RoleCard>
                </RoleGrid>
              </>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <InputBox>
                  <label>{t('auth_name')}</label>
                  <div className="field"><User size={18}/><input type="text" required onChange={e => setFormData({...formData, name: e.target.value})}/></div>
                </InputBox>
              )}
              <InputBox>
                <label>{t('auth_email')}</label>
                <div className="field"><Mail size={18}/><input type="email" required onChange={e => setFormData({...formData, email: e.target.value})}/></div>
              </InputBox>
              <InputBox>
                <label>{t('auth_password')}</label>
                <div className="field"><Lock size={18}/><input type="password" required onChange={e => setFormData({...formData, password: e.target.value})}/></div>
              </InputBox>
              
              <MainBtn whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {isLogin ? t('nav_login') : t('nav_register')}
              </MainBtn>
            </form>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <p style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 600 }}>
                    {isLogin ? t('auth_no_account') : t('auth_have_account')}
                    <Link to={isLogin ? "/register" : "/login"} style={{ color: '#1F3A93', fontWeight: 800, marginLeft: '8px' }}>
                        {isLogin ? t('nav_register') : t('nav_login')}
                    </Link>
                </p>
            </div>
          </FormCard>
        </AnimatePresence>
      </FormSide>
    </AuthContainer>
  );
};

export default Auth;