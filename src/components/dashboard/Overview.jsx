import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Home, Heart, MessageSquare, ShieldCheck, ArrowUpRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProperties, getFavorites, getMyInquiries } from '../../services/propertyService';
import { AuthContext } from '../../context/AuthContext';

const Container = styled.div` display: flex; flex-direction: column; gap: 35px; `;

const MasterBanner = styled.div`
  background: #0B397F; padding: 50px; border-radius: 32px; color: white;
  display: flex; justify-content: space-between; align-items: center;
  position: relative; overflow: hidden; border-bottom: 5px solid #F5A623;
  box-shadow: 0 20px 40px rgba(11, 57, 127, 0.15);
`;

const StatCard = styled(motion.div)`
  background: #FFFFFF; padding: 30px; border-radius: 24px; border: 1px solid #E2E8F0;
  display: flex; flex-direction: column; gap: 20px; cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  &:hover { border-color: #F5A623; transform: translateY(-5px); }
`;

const Overview = ({ onNavigate }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ mine: 0, favs: 0, leads: 0 });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const [props, favs, inbox] = await Promise.all([
          getProperties(),
          getFavorites(),
          getMyInquiries()
        ]);
        const userId = user?._id || user?.id;
        const myCount = props.filter(p => String(p.owner?._id || p.owner) === String(userId)).length;
        setData({ mine: myCount, favs: favs.length, leads: inbox.length });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    if (user) loadMetrics();
  }, [user]);

  if (loading) return <div style={{padding:'100px', textAlign:'center'}}><Loader2 className="animate-spin" color="#0B397F" size={40}/></div>;

  return (
    <Container>
      <MasterBanner>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem' }}>Hello, {user?.name.split(' ')[0]}</h1>
          <p style={{ opacity: 0.7, fontWeight: 500, marginTop: '5px' }}>Your Kimelia dashboard is synchronized.</p>
          <button onClick={() => navigate('/valuation')} style={{ marginTop: '20px', background: '#F5A623', color: '#0B397F', border:'none', padding:'12px 25px', borderRadius:'10px', fontWeight:800, cursor:'pointer' }}>AI VALUATION</button>
        </div>
        <ShieldCheck size={100} color="#F5A623" style={{ opacity: 0.2 }} />
      </MasterBanner>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        <StatCard onClick={() => onNavigate('properties')}>
          <div style={{ width: 50, height: 50, borderRadius: 12, background: '#F1F5F9', display:'flex', justifyContent:'center', alignItems:'center' }}><Home color="#0B397F" /></div>
          <div><p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '1px' }}>MY ASSETS</p><h2 style={{ fontSize: '2.2rem', color: '#0B397F', fontFamily: 'Space Grotesk' }}>{data.mine}</h2></div>
        </StatCard>
        <StatCard onClick={() => onNavigate('favorites')}>
          <div style={{ width: 50, height: 50, borderRadius: 12, background: '#F1F5F9', display:'flex', justifyContent:'center', alignItems:'center' }}><Heart color="#0B397F" /></div>
          <div><p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '1px' }}>WATCHLIST</p><h2 style={{ fontSize: '2.2rem', color: '#0B397F', fontFamily: 'Space Grotesk' }}>{data.favs}</h2></div>
        </StatCard>
        <StatCard onClick={() => onNavigate('messages')}>
          <div style={{ width: 50, height: 50, borderRadius: 12, background: '#F1F5F9', display:'flex', justifyContent:'center', alignItems:'center' }}><MessageSquare color="#0B397F" /></div>
          <div><p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '1px' }}>INQUIRIES</p><h2 style={{ fontSize: '2.2rem', color: '#0B397F', fontFamily: 'Space Grotesk' }}>{data.leads}</h2></div>
        </StatCard>
      </div>
    </Container>
  );
};

export default Overview;