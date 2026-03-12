import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShieldCheck, UserCheck, Map } from 'lucide-react';
import API from '../services/api';

const BarSection = styled.section`
  background: white;
  padding: 80px 8%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  border-bottom: 1px solid #F1F5F9;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconCircle = styled.div`
  width: 80px; height: 80px;
  border-radius: 50%;
  background: #F8FAFC;
  display: flex; justify-content: center; align-items: center;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
  transition: 0.3s;
  &:hover { 
    background: ${({ theme }) => theme.gradients.goldMetallic}; 
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.goldGlow};
  }
`;

const Number = styled.h3`
  font-size: 3rem;
  color: #1F3A93;
  font-weight: 800;
  margin: 0;
  line-height: 1;
`;

const Label = styled.p`
  color: #64748B;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.85rem;
  margin-top: 10px;
`;

const TrustBar = () => {
  const [stats, setStats] = useState({ props: 0, agents: 120, cities: 10 });

  useEffect(() => {
    // Fetch REAL total properties from your Render API
    const fetchStats = async () => {
      try {
        const res = await API.get('/properties');
        setStats(prev => ({ ...prev, props: res.data.count }));
      } catch (err) {
        console.error("Stats fetch error");
      }
    };
    fetchStats();
  }, []);

  return (
    <BarSection>
      <StatCard>
        <IconCircle><ShieldCheck size={35} color="#1F3A93" /></IconCircle>
        <Number>{stats.props}+</Number>
        <Label>Verified Listings</Label>
      </StatCard>
      
      <StatCard>
        <IconCircle><UserCheck size={35} color="#1F3A93" /></IconCircle>
        <Number>{stats.agents}</Number>
        <Label>Elite Brokers</Label>
      </StatCard>

      <StatCard>
        <IconCircle><Map size={35} color="#1F3A93" /></IconCircle>
        <Number>{stats.cities}</Number>
        <Label>Districts Covered</Label>
      </StatCard>
    </BarSection>
  );
};

export default TrustBar;