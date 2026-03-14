import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getProperties } from '../services/propertyService';
import PropertyCard from './PropertyCard';

const Section = styled.section`
  padding: 100px 8%; 
  background: #F1F5F9; /* This is the "In-Between" brightness you requested */
`;

const Header = styled.div`
  margin-bottom: 60px;
  h2 { font-size: 2.8rem; color: #1F3A93; font-weight: 700; margin-bottom: 10px; }
  span { 
    background: ${({ theme }) => theme.gradients.brand};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 40px;
`;

const FeaturedGrid = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getProperties().then(data => setList(data.slice(0, 6)));
  }, []);

  return (
    <Section>
      <Header>
        <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
          Elite <span>Portfolio</span>
        </motion.h2>
        <p style={{color: '#64748B', fontWeight: 500}}>Handpicked selections by our market AI.</p>
      </Header>
      <Grid>
        {list.map(p => <PropertyCard key={p._id} data={p} />)}
      </Grid>
    </Section>
  );
};

export default FeaturedGrid;