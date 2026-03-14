import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Map, Trophy } from 'lucide-react';
import API from '../services/api';

const BarWrapper = styled.section`
  background: white; padding: 80px 8%;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 50px;
  border-bottom: 1px solid #F1F5F9;
  @media (max-width: 900px) { grid-template-columns: 1fr; text-align: center; }
`;

const StatItem = styled(motion.div)`
  display: flex; flex-direction: column; align-items: center;
`;

const IconBox = styled.div`
  width: 70px; height: 70px; border-radius: 20px;
  background: #F8FAFC; display: flex; justify-content: center; align-items: center;
  border: 1px solid #E2E8F0; margin-bottom: 20px;
  transition: 0.3s;
  &:hover { transform: rotate(10deg); border-color: #FFD700; }
`;

const Value = styled.h3`
  font-family: 'Space Grotesk'; font-size: 2.8rem; color: #1F3A93;
  font-weight: 700; margin-bottom: 5px;
`;

const Label = styled.p`
  font-family: 'Inter'; font-weight: 700; color: #64748B;
  text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px;
`;

const TrustBar = () => {
  const [counts, setCounts] = useState({ props: 0, agents: 150, regions: 12 });

  useEffect(() => {
    // REAL API FETCH: Counts properties in your Render DB
    API.get('/properties')
      .then(res => setCounts(prev => ({ ...prev, props: res.data.count })))
      .catch(() => {});
  }, []);

  return (
    <BarWrapper>
      <StatItem initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <IconBox><ShieldCheck size={32} color="#FFD700" /></IconBox> {/* Solid Gold Icon */}
        <Value>{counts.props}+</Value>
        <Label>Verified Listings</Label>
      </StatItem>

      <StatItem initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <IconBox><Users size={32} color="#FFD700" /></IconBox> {/* Solid Gold Icon */}
        <Value>{counts.agents}</Value>
        <Label>Expert Brokers</Label>
      </StatItem>

      <StatItem initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <IconBox><Map size={32} color="#FFD700" /></IconBox> {/* Solid Gold Icon */}
        <Value>{counts.regions}</Value>
        <Label>Kigali Sectors</Label>
      </StatItem>
    </BarWrapper>
  );
};

export default TrustBar;