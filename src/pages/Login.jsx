import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero-bg.jpg';

const Page = styled.div`
  min-height: 100vh; display: grid; grid-template-columns: 1.1fr 1fr;
  background: white; @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

/* --- LEFT SIDE: THE LIFESTYLE --- */
const VisualSide = styled.div`
  position: relative; overflow: hidden;
  background: linear-gradient(rgba(10, 15, 30, 0.7), rgba(10, 15, 30, 0.9)), url(${heroImg});
  background-size: cover; background-position: center;
  display: flex; flex-direction: column; justify-content: flex-end; padding: 60px;
  color: white; @media (max-width: 1024px) { display: none; }
`;

const BrandBadge = styled.div`
  position: absolute; top: 60px; left: 60px;
  img { height: 50px; filter: brightness(0) invert(1); }
`;

/* --- RIGHT SIDE: THE FORM --- */
const FormSide = styled.div`
  display: flex; flex-direction: column; justify-content: center;
  padding: 0 15%; background: #F8FAFC;
  @media (max-width: 600px) { padding: 0 8%; }
`;

const FormCard = styled(motion.div)`
  width: 100%; max-width: 420px;
`;

const GoogleBtn = styled.button`
  width: 100%; padding: 14px; border-radius: 12px; border: 1px solid #E2E8F0;
  background: white; display: flex; justify-content: center; align-items: center;
  gap: 12px; font-weight: 700; color: #1F3A93; margin-bottom: 25px;
  cursor: pointer; transition: 0.3s;
  img { width: 20px; }
  &:hover { background: #F1F5F9; border-color: #1F3A93; }
`;

const Divider = styled.div`
  display: flex; align-items: center; gap: 15px; color: #94A3B8;
  margin-bottom: 25px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
  &::before, &::after { content: ''; flex: 1; height: 1px; background: #E2E8F0; }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  label { display: block; margin-bottom: 8px; font-weight: 700; color: #1F3A93; font-size: 0.8rem; font-family: 'Space Grotesk'; }
  .box {
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

const SubmitBtn = styled(motion.button)`
  width: 100%; padding: 18px; border-radius: 12px; margin-top: 10px;
  background: ${props => props.theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1px;
`;

const Login = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) { alert("Login Failed"); }
  };

  return (
    <Page>
      <VisualSide>
        <BrandBadge><img src={logoImg} alt="Logo" /></BrandBadge>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '3rem', fontWeight: 700, marginBottom: '15px' }}>Welcome to the <br /> <span style={{ color: '#FFD700' }}>Inner Circle</span></h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '400px', lineHeight: '1.6' }}>Access Rwanda's most exclusive real estate portfolio and AI-driven market insights.</p>
        </motion.div>
      </VisualSide>

      <FormSide>
        <FormCard initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.2rem', marginBottom: '8px' }}>{t('auth_welcome_back')}</h1>
          <p style={{ color: '#64748B', marginBottom: '35px', fontWeight: 500 }}>Enter your credentials to continue.</p>

          <GoogleBtn onClick={() => window.location.href = 'http://localhost:5000/api/v1/auth/google'}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" />
            {t('auth_google')}
          </GoogleBtn>

          <Divider>or secure email login</Divider>

          <form onSubmit={handleLogin}>
            <InputGroup>
              <label>{t('auth_email')}</label>
              <div className="box"><Mail size={18} /><input type="email" required onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
            </InputGroup>
            <InputGroup>
              <label>{t('auth_password')}</label>
              <div className="box"><Lock size={18} /><input type="password" required onChange={e => setFormData({ ...formData, password: e.target.value })} /></div>
            </InputGroup>
            <SubmitBtn whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {t('nav_login')} <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </SubmitBtn>
          </form>

          <p style={{ marginTop: '30px', textAlign: 'center', color: '#64748B', fontSize: '0.9rem', fontWeight: 600 }}>
            {t('auth_no_account')} <Link to="/register" style={{ color: '#1F3A93', fontWeight: 800 }}>Create Account</Link>
          </p>
        </FormCard>
      </FormSide>
    </Page>
  );
};

export default Login;