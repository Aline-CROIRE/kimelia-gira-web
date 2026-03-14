import React from 'react';
import styled from 'styled-components';
import { Home, Heart, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react';

const StatGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 25px;
`;

const StatCard = styled.div`
  background: white; padding: 30px; border-radius: 24px; border: 1px solid #E2E8F0;
  display: flex; align-items: center; gap: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
`;

const IconBox = styled.div`
  width: 65px; height: 65px; border-radius: 18px; 
  background: ${props => props.bg}; display: flex; justify-content: center; align-items: center;
`;

const WelcomeBox = styled.div`
  background: #1F3A93; color: white; padding: 40px; border-radius: 30px;
  margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center;
  background-image: radial-gradient(circle at top right, rgba(255,215,0,0.2), transparent);
`;

const Overview = ({ user }) => (
  <div>
    <WelcomeBox>
      <div>
        <h2 style={{fontSize: '2.4rem', fontFamily: 'Space Grotesk', marginBottom: '10px'}}>Hello, {user?.name || 'Elite Member'}</h2>
        <p style={{opacity: 0.8, fontWeight: 500}}>Manage your real estate portfolio and market insights.</p>
      </div>
      <ShieldCheck size={60} color="#FFD700" style={{opacity: 0.5}} />
    </WelcomeBox>

    <StatGrid>
      <StatCard>
        <IconBox bg="#EEF2FF"><Home color="#1F3A93" size={28}/></IconBox>
        <div>
          <h3 style={{fontSize:'1.8rem', fontFamily:'Space Grotesk'}}>0</h3>
          <p style={{color:'#64748B', fontSize:'0.75rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'1px'}}>Listings</p>
        </div>
      </StatCard>
      <StatCard>
        <IconBox bg="#FFFBEB"><Heart color="#FFD700" size={28}/></IconBox>
        <div>
          <h3 style={{fontSize:'1.8rem', fontFamily:'Space Grotesk'}}>0</h3>
          <p style={{color:'#64748B', fontSize:'0.75rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'1px'}}>Favorites</p>
        </div>
      </StatCard>
      <StatCard>
        <IconBox bg="#F0FDF4"><MessageSquare color="#22C55E" size={28}/></IconBox>
        <div>
          <h3 style={{fontSize:'1.8rem', fontFamily:'Space Grotesk'}}>0</h3>
          <p style={{color:'#64748B', fontSize:'0.75rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'1px'}}>Inquiries</p>
        </div>
      </StatCard>
    </StatGrid>
  </div>
);

export default Overview;