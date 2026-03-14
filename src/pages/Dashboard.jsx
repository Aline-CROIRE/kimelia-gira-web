import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Home, Heart, MessageSquare, User, LogOut, PlusCircle, Settings
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Overview from '../components/dashboard/Overview';

const DashboardWrapper = styled.div`
  display: flex; min-height: 100vh; background: #F1F5F9; padding-top: 80px;
`;

const Sidebar = styled.aside`
  width: 280px; background: white; border-right: 1px solid #E2E8F0;
  padding: 40px 20px; display: flex; flex-direction: column;
  position: fixed; height: calc(100vh - 80px);
  @media (max-width: 1024px) { width: 80px; padding: 40px 10px; }
`;

const NavItem = styled.button`
  width: 100%; padding: 16px 20px; border-radius: 12px; margin-bottom: 8px;
  display: flex; align-items: center; gap: 15px; font-family: 'Space Grotesk';
  font-weight: 700; font-size: 0.85rem; transition: 0.3s; border: none; cursor: pointer;
  background: ${props => props.active ? props.theme.gradients.brand : 'transparent'};
  color: ${props => props.active ? 'white' : '#1F3A93'};
  span { @media (max-width: 1024px) { display: none; } }
  &:hover { background: ${props => props.active ? props.theme.gradients.brand : '#F8FAFC'}; }
`;

const MainContainer = styled.main`
  flex: 1; margin-left: 280px; padding: 60px 5%;
  @media (max-width: 1024px) { margin-left: 80px; }
`;

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardWrapper>
      <Sidebar>
        <div style={{marginBottom: '30px', padding: '0 20px'}}>
           <p style={{fontSize: '0.65rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '2px'}}>Management</p>
        </div>

        <NavItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
          <LayoutDashboard size={20}/> <span>Overview</span>
        </NavItem>
        
        <NavItem active={activeTab === 'properties'} onClick={() => setActiveTab('properties')}>
          <Home size={20}/> <span>My Listings</span>
        </NavItem>

        <NavItem active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>
          <Heart size={20}/> <span>Favorites</span>
        </NavItem>

        <NavItem active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
          <MessageSquare size={20}/> <span>Inquiries</span>
        </NavItem>

        <div style={{marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #F1F5F9'}}>
            <NavItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
              <User size={20}/> <span>Profile Settings</span>
            </NavItem>
            <NavItem onClick={logout} style={{color: '#EF4444'}}>
              <LogOut size={20}/> <span>Logout</span>
            </NavItem>
        </div>
      </Sidebar>

      <MainContainer>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <Overview user={user} />}
            {activeTab === 'properties' && (
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px'}}>
                  <h2 style={{fontSize:'2.2rem', fontFamily:'Space Grotesk'}}>My Properties</h2>
                  <button style={{background: 'linear-gradient(135deg, #1F3A93, #FFD700)', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', border:'none', cursor:'pointer', fontFamily:'Space Grotesk'}}>
                    <PlusCircle size={20}/> List New
                  </button>
                </div>
                <div style={{background:'white', padding:'60px', borderRadius:'24px', textAlign:'center', border:'1px dashed #CBD5E1'}}>
                   <p style={{color:'#64748B', fontWeight:600}}>No active listings found.</p>
                </div>
              </div>
            )}
            {activeTab === 'favorites' && <h2 style={{fontFamily:'Space Grotesk'}}>My Favorites</h2>}
            {activeTab === 'messages' && <h2 style={{fontFamily:'Space Grotesk'}}>Inquiries</h2>}
            {activeTab === 'profile' && <h2 style={{fontFamily:'Space Grotesk'}}>Account Settings</h2>}
          </motion.div>
        </AnimatePresence>
      </MainContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;