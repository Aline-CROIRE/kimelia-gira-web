import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Home, Heart, MessageSquare, ShieldCheck, ArrowUpRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const Container = styled.div` display: flex; flex-direction: column; gap: 35px; `;

const MasterBanner = styled.div`
  background: #0B397F; 
  padding: 50px; border-radius: 32px; color: white;
  display: flex; justify-content: space-between; align-items: center;
  position: relative; overflow: hidden;
  border-bottom: 5px solid #F5A623; 
  box-shadow: 0 20px 40px rgba(11, 57, 127, 0.2);
  &::before {
    content: ''; position: absolute; top: -10%; left: -10%; width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(245, 166, 35, 0.15) 0%, transparent 70%);
  }
`;

const StatCard = styled(motion.div)`
  background: #FFFFFF;
  padding: 30px; border-radius: 24px; border: 1px solid #E2E8F0;
  display: flex; flex-direction: column; gap: 20px; cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
`;

const Overview = ({ onNavigate }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ mine: 0, total: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/properties');
        const all = res.data.data || [];
        const userId = user?._id || user?.id;
        const mine = all.filter(p => String(p.owner?._id || p.owner) === String(userId));
        setStats({ mine: mine.length, total: all.length });
      } catch (err) {
        console.error("Fetch failed");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}><Loader2 className="animate-spin" color="#0B397F" /></div>;

  return (
    <Container>
      <MasterBanner>
        <div>
          <h4 style={{ color: '#F5A623', fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px' }}>EXECUTIVE PORTFOLIO</h4>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.8rem', marginTop: '10px', color: 'white' }}>
            Hello, {user?.name?.split(' ')[0]}
          </h1>
          <button 
            onClick={() => navigate('/valuation')}
            style={{ marginTop: '25px', background: '#F5A623', color: '#0B397F', border:'none', padding:'14px 30px', borderRadius:'12px', fontWeight:800, fontFamily:'Space Grotesk', fontSize:'0.8rem', cursor:'pointer' }}
          >
            ACTIVATE AI VALUATION
          </button>
        </div>
        <ShieldCheck size={100} color="#F5A623" style={{ opacity: 0.2 }} />
      </MasterBanner>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        <StatCard whileHover={{ y: -5 }} onClick={() => onNavigate('properties')}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: '#F1F5F9', display:'flex', justifyContent:'center', alignItems:'center' }}><Home color="#0B397F" /></div>
            <ArrowUpRight size={18} color="#CBD5E1" />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '1.5px', fontFamily: 'Space Grotesk' }}>MY ASSETS</p>
            <h2 style={{ fontSize: '2.4rem', color: '#0B397F', fontFamily: 'Space Grotesk' }}>{stats.mine}</h2>
          </div>
        </StatCard>

        <StatCard whileHover={{ y: -5 }} onClick={() => onNavigate('favorites')}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: '#F1F5F9', display:'flex', justifyContent:'center', alignItems:'center' }}><Heart color="#0B397F" /></div>
            <ArrowUpRight size={18} color="#CBD5E1" />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '1.5px', fontFamily: 'Space Grotesk' }}>WATCHLIST</p>
            <h2 style={{ fontSize: '2.4rem', color: '#0B397F', fontFamily: 'Space Grotesk' }}>0</h2>
          </div>
        </StatCard>

        <StatCard whileHover={{ y: -5 }} onClick={() => onNavigate('messages')}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: '#F1F5F9', display:'flex', justifyContent:'center', alignItems:'center' }}><MessageSquare color="#0B397F" size={24} /></div>
            <ArrowUpRight size={18} color="#CBD5E1" />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '1.5px', fontFamily: 'Space Grotesk' }}>INQUIRIES</p>
            <h2 style={{ fontSize: '2.4rem', color: '#0B397F', fontFamily: 'Space Grotesk' }}>0</h2>
          </div>
        </StatCard>
      </div>
    </Container>
  );
};

export default Overview;