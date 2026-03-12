import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, Lock, UserCheck, Home, Briefcase } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import logoImg from '../assets/logo.png';

const AuthContainer = styled.div`min-height: 100vh; width: 100vw; display: flex; flex-direction: column; background: #F8FAFC; overflow: hidden;`;
const AuthNav = styled.nav`height: 90px; padding: 0 8%; background: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0;`;
const FormWrapper = styled.div`flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px 20px;`;
const Card = styled(motion.div)`width: 100%; max-width: 550px; background: white; padding: 50px; border-radius: 30px; box-shadow: 0 20px 50px rgba(31, 58, 147, 0.08);`;

const RoleGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;`;
const RoleCard = styled.div`
  padding: 15px; border-radius: 12px; border: 2px solid ${props => props.active ? '#FFD700' : '#F1F5F9'};
  background: ${props => props.active ? '#FFFDF5' : 'white'};
  cursor: pointer; text-align: center; transition: 0.3s;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  svg { color: #1F3A93; }
  span { font-size: 0.75rem; font-weight: 800; color: #1F3A93; }
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
    <AuthContainer>
      <AuthNav>
        <Link to="/"><img src={logoImg} alt="Logo" style={{height: '45px'}}/></Link>
        <Link to="/login" style={{color: '#1F3A93', fontWeight: 800, textDecoration: 'none'}}>{t('nav_login')}</Link>
      </AuthNav>
      <FormWrapper>
        <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{color: '#1F3A93', fontSize: '2rem', marginBottom: '10px'}}>{t('auth_create_account')}</h2>
          
          <label style={{display:'block', marginBottom:'15px', fontWeight:800, color:'#1F3A93'}}>I am a...</label>
          <RoleGrid>
            <RoleCard active={formData.role === 'buyer'} onClick={() => setFormData({...formData, role: 'buyer'})}>
              <UserCheck size={20}/><span>{t('auth_role_buyer')}</span>
            </RoleCard>
            <RoleCard active={formData.role === 'owner'} onClick={() => setFormData({...formData, role: 'owner'})}>
              <Home size={20}/><span>{t('auth_role_owner')}</span>
            </RoleCard>
            <RoleCard active={formData.role === 'broker'} onClick={() => setFormData({...formData, role: 'broker'})}>
              <Briefcase size={20}/><span>{t('auth_role_broker')}</span>
            </RoleCard>
          </RoleGrid>

          <form onSubmit={handleRegister}>
            <input style={{width:'100%', padding:'15px', marginBottom:'15px', borderRadius:'10px', border:'1px solid #EEE'}} placeholder={t('auth_name')} onChange={e => setFormData({...formData, name: e.target.value})}/>
            <input style={{width:'100%', padding:'15px', marginBottom:'15px', borderRadius:'10px', border:'1px solid #EEE'}} placeholder={t('auth_email')} onChange={e => setFormData({...formData, email: e.target.value})}/>
            <input type="password" style={{width:'100%', padding:'15px', marginBottom:'20px', borderRadius:'10px', border:'1px solid #EEE'}} placeholder={t('auth_password')} onChange={e => setFormData({...formData, password: e.target.value})}/>
            <button style={{width:'100%', background:'linear-gradient(135deg, #1F3A93, #FFD700)', color:'white', padding:'18px', borderRadius:'12px', border:'none', fontWeight:800, cursor:'pointer'}}>
              {t('nav_register')}
            </button>
          </form>
        </Card>
      </FormWrapper>
    </AuthContainer>
  );
};

export default Register;