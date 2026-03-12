import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, LogIn } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import logoImg from '../assets/logo.png';

const AuthContainer = styled.div`
  min-height: 100vh; width: 100vw; display: flex; flex-direction: column;
  background: #F8FAFC; overflow: hidden;
`;

const AuthNav = styled.nav`
  height: 90px; padding: 0 8%; background: white; 
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #E2E8F0;
`;

const FormWrapper = styled.div`
  flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px 20px;
`;

const Card = styled(motion.div)`
  width: 100%; max-width: 450px; background: white; padding: 50px;
  border-radius: 30px; box-shadow: 0 20px 50px rgba(31, 58, 147, 0.08);
`;

const GoogleBtn = styled.button`
  width: 100%; padding: 14px; border-radius: 12px; border: 1.5px solid #E2E8F0;
  background: white; display: flex; justify-content: center; align-items: center; gap: 12px;
  font-weight: 700; cursor: pointer; transition: 0.3s;
  img { width: 22px; }
  &:hover { background: #F8FAFC; border-color: #1F3A93; }
`;

const InputGroup = styled.div`
  margin-bottom: 20px; text-align: left;
  label { display: block; margin-bottom: 8px; font-weight: 700; color: #1F3A93; font-size: 0.85rem; }
  .box {
    position: relative;
    input { width: 100%; padding: 15px 15px 15px 45px; border-radius: 12px; border: 1.5px solid #F1F5F9; background: #F8FAFC; outline: none; transition: 0.3s; &:focus { border-color: #FFD700; background: white; } }
    svg { position: absolute; left: 15px; top: 15px; color: #1F3A93; opacity: 0.6; }
  }
`;

const Login = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <AuthContainer>
      <AuthNav>
        <Link to="/"><img src={logoImg} alt="Logo" style={{height: '45px'}}/></Link>
        <Link to="/register" style={{color: '#1F3A93', fontWeight: 800, textDecoration: 'none'}}>{t('nav_register')}</Link>
      </AuthNav>
      <FormWrapper>
        <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{color: '#1F3A93', fontSize: '2rem', marginBottom: '10px'}}>{t('auth_welcome_back')}</h2>
          <p style={{color: '#64748B', marginBottom: '30px'}}>{t('auth_subtitle') || "Enter your premium credentials."}</p>
          
          <GoogleBtn onClick={() => window.location.href = 'https://kimelia-gira-api.onrender.com/api/v1/auth/google'}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" />
            {t('auth_google')}
          </GoogleBtn>

          <form onSubmit={handleLogin}>
            {error && <p style={{color: 'red', marginBottom: '15px', fontSize: '0.9rem'}}>{error}</p>}
            <InputGroup>
              <label>{t('auth_email')}</label>
              <div className="box"><Mail size={18}/><input type="email" required onChange={e => setFormData({...formData, email: e.target.value})}/></div>
            </InputGroup>
            <InputGroup>
              <label>{t('auth_password')}</label>
              <div className="box"><Lock size={18}/><input type="password" required onChange={e => setFormData({...formData, password: e.target.value})}/></div>
            </InputGroup>
            <button style={{width:'100%', background:'linear-gradient(135deg, #1F3A93, #FFD700)', color:'white', padding:'18px', borderRadius:'12px', border:'none', fontWeight:800, cursor:'pointer'}}>
              {t('nav_login')}
            </button>
          </form>
        </Card>
      </FormWrapper>
    </AuthContainer>
  );
};

export default Login;