import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getProperties } from '../services/propertyService';
import PropertyCard from './PropertyCard';
import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  padding: 100px 8%; background: #F1F5F9;
`;

// Inside src/components/FeaturedGrid.jsx
const ExploreBtn = styled.button`
  background: ${props => props.theme.gradients.brand};
  color: white; padding: 18px 50px; border-radius: 12px;
  font-family: 'Space Grotesk'; font-weight: 800; text-transform: uppercase;
  display: block; margin: 70px auto 0;
  box-shadow: ${props => props.theme.shadows.premium};
  &:hover { transform: translateY(-3px); box-shadow: ${props => props.theme.shadows.float}; }
`;
const TitleBox = styled.div`
  margin-bottom: 50px;
  h2 { font-size: 2.8rem; color: #1F3A93; font-weight: 700; margin-bottom: 10px; }
  span { 
    background: ${props => props.theme.gradients.brand};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 40px;
`;


const FeaturedGrid = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProperties().then(data => setList(data.slice(0, 6)));
  }, []);

  return (
    <Section>
      <TitleBox>
        <h2>Elite <span>Portfolio</span></h2>
        <p style={{ color: '#64748B', fontWeight: 600 }}>Curated residential and commercial assets.</p>
      </TitleBox>
      <Grid>
        {list.map(p => <PropertyCard key={p._id} data={p} />)}
      </Grid>
      <ExploreBtn onClick={() => navigate('/properties')}>View Entire Catalog</ExploreBtn>
    </Section>
  );
};

export default FeaturedGrid;