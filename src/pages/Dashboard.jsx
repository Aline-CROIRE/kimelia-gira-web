import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Home, Heart, MessageSquare, User, LogOut, ShieldCheck, Briefcase 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

// Components
import Overview from '../components/dashboard/Overview';
import MyListings from '../components/dashboard/MyListings';
import Watchlist from '../components/dashboard/Watchlist';
import MessageCenter from '../components/dashboard/MessageCenter';

const DashboardWrapper = styled.div`
  display: flex; min-height: 100vh; background: #F1F5F9; padding-top: 80px;
`;

const Sidebar = styled.aside`
  width: 280px; background: white; border-right: 1px solid #E2E8F0;
  padding: 40px 20px; display: flex; flex-direction: column;
  position: fixed; height: calc(100vh - 80px); z-index: 100;
  @media (max-width: 1024px) { width: 80px; padding: 40px 10px; }
`;

const NavItem = styled.button`
  width: 100%; padding: 16px 20px; border-radius: 14px; margin-bottom: 8px;
  display: flex; align-items: center; gap: 15px; font-family: 'Space Grotesk';
  font-weight: 700; font-size: 0.8rem; transition: 0.3s; border: none; cursor: pointer;
  background: ${props => props.$active ? props.theme.gradients.brand : 'transparent'};
  color: ${props => props.$active ? 'white' : '#0B397F'};
  text-transform: uppercase; letter-spacing: 1px;
  span { @media (max-width: 1024px) { display: none; } }
  &:hover { background: ${props => props.$active ? props.theme.gradients.brand : '#F8FAFC'}; }
`;

const MainContainer = styled.main`
  flex: 1; margin-left: 280px; padding: 60px 5%;
  @media (max-width: 1024px) { margin-left: 80px; }
`;

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const isPro = user?.role === 'broker' || user?.role === 'owner';

  return (
    <DashboardWrapper>
      <Sidebar>
        <div style={{ marginBottom: '35px', padding: '0 20px' }}>
           <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'Space Grotesk' }}>Identity</p>
           <h5 style={{ color: '#0B397F', fontFamily: 'Space Grotesk', marginTop: '5px', fontSize: '0.85rem' }}>{user?.role?.toUpperCase()}</h5>
        </div>

        <NavItem $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
          <LayoutDashboard size={18}/> <span>Overview</span>
        </NavItem>
        
        {isPro && (
          <NavItem $active={activeTab === 'properties'} onClick={() => setActiveTab('properties')}>
            <Home size={18}/> <span>Portfolio</span>
          </NavItem>
        )}

        <NavItem $active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>
          <Heart size={18}/> <span>Watchlist</span>
        </NavItem>

        <NavItem $active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
          <MessageSquare size={18}/> <span>Messages</span>
        </NavItem>

        {user?.role === 'admin' && (
          <NavItem onClick={() => navigate('/admin')} style={{ background: '#0F172A', color: '#F5A623', marginTop: '20px' }}>
            <ShieldCheck size={18}/> <span>Command</span>
          </NavItem>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
            <NavItem onClick={logout} style={{ color: '#EF4444' }}>
              <LogOut size={18}/> <span>Logout</span>
            </NavItem>
        </div>
      </Sidebar>

      <MainContainer>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {activeTab === 'overview' && <Overview onNavigate={setActiveTab} />}
            {activeTab === 'properties' && <MyListings />}
            {activeTab === 'favorites' && <Watchlist />}
            {activeTab === 'messages' && <MessageCenter />}
          </motion.div>
        </AnimatePresence>
      </MainContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;