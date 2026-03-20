import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, UserCheck, Home, Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero-bg.jpg';

const AuthContainer = styled.div`
  min-height: 100vh; width: 100vw; display: grid; grid-template-columns: 1fr 1.1fr;
  background: white; @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const VisualSide = styled.div`
  background: linear-gradient(rgba(10, 15, 30, 0.8), rgba(10, 15, 30, 0.95)), url(${heroImg});
  background-size: cover; background-position: center;
  padding: 80px; display: flex; flex-direction: column; justify-content: center;
  color: white; position: relative; @media (max-width: 1024px) { display: none; }
`;

const FormSide = styled.div`
  background: #F8FAFC; display: flex; flex-direction: column; 
  justify-content: center; align-items: center; padding: 40px;
`;

const RoleGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 25px; `;

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
    svg { position: absolute; left: 16px; top: 18px; color: #1F3A93; opacity: 0.4; }
  }
`;

const Auth = () => {
  const { t, i18n } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === '/login';

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous errors

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const res = await API.post(endpoint, { 
        ...formData, 
        language: i18n.language 
      });

      // If successful, log the user in
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      // EXPLAIN: We extract the real error message from the backend response
      const msg = err.response?.data?.error || err.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <VisualSide>
        <Link to="/" style={{position:'absolute', top:60}}><img src={logoImg} alt="Logo" style={{height:50, filter:'brightness(0) invert(1)'}}/></Link>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1 }}>
            The Future of <br/> <span style={{ color: '#FFD700' }}>Investment</span>
        </h2>
      </VisualSide>

      <FormSide>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{width:'100%', maxWidth:440}}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.4rem', color: '#1F3A93', marginBottom: '8px' }}>
              {isLogin ? t('auth_welcome_back') : t('nav_register')}
          </h1>
          <p style={{ color: '#64748B', marginBottom: '35px', fontWeight: 500 }}>
              {isLogin ? t('auth_subtitle_login') : t('auth_subtitle_reg')}
          </p>

          {/* ERROR DISPLAY */}
          {errorMessage && (
            <div style={{ padding: '15px', background: '#FEE2E2', color: '#B91C1C', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                {errorMessage}
            </div>
          )}

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
            
            <button 
                disabled={loading}
                style={{ 
                    width: '100%', padding: '18px', borderRadius: '12px', marginTop: '10px',
                    background: 'linear-gradient(135deg, #1F3A93 0%, #5C7CFA 100%)', 
                    color: 'white', fontFamily: 'Space Grotesk', fontWeight: 800, 
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1
                }}
            >
              {loading ? "Authenticating..." : (isLogin ? t('nav_login') : t('nav_register'))}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <p style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 600 }}>
                  {isLogin ? t('auth_no_account') : t('auth_have_account')}
                  <Link to={isLogin ? "/register" : "/login"} style={{ color: '#1F3A93', fontWeight: 800, marginLeft: '8px' }}>
                      {isLogin ? t('nav_register') : t('nav_login')}
                  </Link>
              </p>
          </div>
        </motion.div>
      </FormSide>
    </AuthContainer>
  );
};

export default Auth;