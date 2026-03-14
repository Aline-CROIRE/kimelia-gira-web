import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, Lock, UserCheck, Home, Briefcase } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero-bg.jpg';

const Page = styled.div` min-height: 100vh; display: grid; grid-template-columns: 1fr 1.1fr; background: white; @media (max-width: 1024px) { grid-template-columns: 1fr; } `;
const VisualSide = styled.div` position: relative; background: linear-gradient(rgba(10, 15, 30, 0.8), rgba(10, 15, 30, 0.95)), url(${heroImg}); background-size: cover; background-position: center; display: flex; flex-direction: column; justify-content: center; padding: 80px; color: white; @media (max-width: 1024px) { display: none; } `;
const FormSide = styled.div` display: flex; flex-direction: column; justify-content: center; padding: 60px 10%; background: #F8FAFC; `;

const RoleGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px; `;

const RoleCard = styled.div`
  padding: 20px 10px; border-radius: 16px; transition: 0.3s; cursor: pointer; text-align: center;
  background: ${props => props.active ? 'white' : 'transparent'};
  border: 2px solid ${props => props.active ? '#FFD700' : '#E2E8F0'};
  box-shadow: ${props => props.active ? '0 10px 25px rgba(0,0,0,0.05)' : 'none'};
  svg { color: ${props => props.active ? '#1F3A93' : '#94A3B8'}; margin-bottom: 8px; }
  span { display: block; font-size: 0.7rem; font-weight: 800; color: #1F3A93; font-family: 'Space Grotesk'; }
`;

const Register = () => {
  const { t, i18n } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { ...formData, language: i18n.language });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) { alert("Registration failed."); }
  };

  return (
    <Page>
      <VisualSide>
        <img src={logoImg} alt="Logo" style={{ height: '50px', filter: 'brightness(0) invert(1)', marginBottom: '40px' }} />
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '20px' }}>Join the <span style={{color: '#FFD700'}}>Elite</span> <br/> Marketplace</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.6, maxWidth: '450px' }}>The destination for Rwanda's most significant real estate transactions.</p>
      </VisualSide>

      <FormSide>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', color: '#1F3A93', marginBottom: '35px' }}>{t('auth_create_account')}</h1>
          
          <label style={{ display: 'block', marginBottom: '15px', fontWeight: 800, color: '#1F3A93', fontSize: '0.8rem', fontFamily: 'Space Grotesk' }}>CHOOSE YOUR PATH</label>
          <RoleGrid>
            <RoleCard active={formData.role === 'buyer'} onClick={() => setFormData({...formData, role: 'buyer'})}>
              <UserCheck size={24}/><span>BUYER</span>
            </RoleCard>
            <RoleCard active={formData.role === 'owner'} onClick={() => setFormData({...formData, role: 'owner'})}>
              <Home size={24}/><span>OWNER</span>
            </RoleCard>
            <RoleCard active={formData.role === 'broker'} onClick={() => setFormData({...formData, role: 'broker'})}>
              <Briefcase size={24}/><span>BROKER</span>
            </RoleCard>
          </RoleGrid>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '15px' }}>
                <input style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #E2E8F0', outline: 'none' }} placeholder={t('auth_name')} onChange={e => setFormData({...formData, name: e.target.value})}/>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <input style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #E2E8F0', outline: 'none' }} placeholder={t('auth_email')} onChange={e => setFormData({...formData, email: e.target.value})}/>
            </div>
            <div style={{ marginBottom: '25px' }}>
                <input type="password" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #E2E8F0', outline: 'none' }} placeholder={t('auth_password')} onChange={e => setFormData({...formData, password: e.target.value})}/>
            </div>
            <button style={{ width: '100%', background: 'linear-gradient(135deg, #1F3A93, #3B5BDB)', color: 'white', padding: '18px', borderRadius: '12px', fontWeight: 800, border: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk', textTransform: 'uppercase' }}>
              {t('nav_register')}
            </button>
          </form>

          <p style={{ marginTop: '30px', textAlign: 'center', color: '#64748B', fontWeight: 600 }}>
            {t('auth_have_account')} <Link to="/login" style={{ color: '#1F3A93', fontWeight: 800 }}>Login</Link>
          </p>
        </motion.div>
      </FormSide>
    </Page>
  );
};

export default Register;