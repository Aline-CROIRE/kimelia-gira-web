import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';
import { motion } from 'framer-motion';

const Page = styled.div`
  padding: 130px 8% 80px; background: #F1F5F9; min-height: 100vh;
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 40px;
`;

const Properties = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', propertyType: '', search: '' });

  useEffect(() => {
    setLoading(true);
    // Mimic high-end professional loading
    getProperties(filters).then(data => {
      setList(data);
      setTimeout(() => setLoading(false), 800);
    });
  }, [filters]);

  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Page>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <h1 style={{fontSize:'2.8rem', color:'#1F3A93', marginBottom:'10px', fontFamily:'Space Grotesk'}}>Elite <span style={{color: '#FFD700'}}>Listings</span></h1>
        <p style={{color:'#64748B', fontWeight:500, marginBottom:'50px'}}>Discover high-yield real estate verified by Kimelia AI.</p>
        
        <FilterBar onFilterChange={handleFilter} />

        {loading ? (
          <div style={{textAlign:'center', padding:'100px'}}>
             <div className="shimmer" style={{fontSize:'1.5rem', fontWeight:800, color:'#1F3A93'}}>CURATING YOUR PORTFOLIO...</div>
          </div>
        ) : (
          <Grid>
            {list.map(p => <PropertyCard key={p._id} data={p} />)}
          </Grid>
        )}
      </motion.div>
    </Page>
  );
};

export default Properties;