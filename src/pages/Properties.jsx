import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter } from 'lucide-react';

const Page = styled.div`
  padding: 120px 8% 80px; background: #F1F5F9; min-height: 100vh;
`;

const FilterBar = styled.div`
  background: white; padding: 25px; border-radius: 20px;
  display: flex; gap: 20px; margin-bottom: 50px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  @media (max-width: 900px) { flex-direction: column; }
`;

const Select = styled.select`
  padding: 12px 20px; border-radius: 10px; border: 1px solid #E2E8F0;
  font-family: 'Space Grotesk'; font-weight: 700; color: #1F3A93;
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 40px;
`;

const Properties = () => {
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({ type: '', propertyType: '' });

  useEffect(() => {
    getProperties(filters).then(data => setList(data));
  }, [filters]);

  return (
    <Page>
      <h1 style={{fontSize:'2.5rem', marginBottom:'30px'}}>All <span style={{color: '#FFD700'}}>Listings</span></h1>
      <FilterBar>
        <Select onChange={(e) => setFilters({...filters, type: e.target.value})}>
           <option value="">All Status</option>
           <option value="sale">For Sale</option>
           <option value="rent">For Rent</option>
        </Select>
        <Select onChange={(e) => setFilters({...filters, propertyType: e.target.value})}>
           <option value="">All Types</option>
           <option value="house">Modern Villa</option>
           <option value="apartment">Penthouse</option>
           <option value="land">Land Plot</option>
        </Select>
      </FilterBar>

      <Grid>
        {list.map(p => <PropertyCard key={p._id} data={p} />)}
      </Grid>
    </Page>
  );
};

export default Properties;