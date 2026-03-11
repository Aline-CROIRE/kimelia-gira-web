import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  background: white; padding: 60px 5%; width: 100%;
  display: flex; justify-content: space-around; flex-wrap: wrap; gap: 40px;
  border-bottom: 1px solid #eee;
`;

const StatItem = styled.div`
  text-align: center;
  h2 { font-size: 2.5rem; color: #1F3A93; font-weight: 800; }
  p { font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; }
`;

const TrustBar = () => (
  <Bar>
    <StatItem><h2>10k+</h2><p>Listed Properties</p></StatItem>
    <StatItem><h2>500+</h2><p>Verified Agents</p></StatItem>
    <StatItem><h2>24/7</h2><p>AI Support</p></StatItem>
  </Bar>
);

export default TrustBar;