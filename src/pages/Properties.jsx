import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const PageWrapper = styled.div`
  padding: 120px 8% 80px; background: #F8FAFC; min-height: 100vh;
`;

const FilterBar = styled.div`
  background: white; padding: 25px 40px; border-radius: 20px;
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 50px; box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  @media (max-width: 1024px) { flex-direction: column; gap: 20px; }
`;

const SearchInput = styled.div`
  display: flex; align-items: center; gap: 15px; background: #F1F5F9;
  padding: 12px 25px; border-radius: 12px; width: 40%;
  @media (max-width: 1024px) { width: 100%; }
  input { border: none; background: none; outline: none; width: 100%; font-weight: 600; color: #1F3A93; }
`;

const SelectGroup = styled.div`
  display: flex; gap: 20px;
  select { 
    padding: 12px 20px; border-radius: 12px; border: 1.5px solid #E2E8F0;
    font-weight: 700; color: #1F3A93; cursor: pointer; outline: none;
    &:focus { border-color: #FFD700; }
  }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 40px;
`;

const Properties = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', propertyType: '', sort: '-createdAt' });

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Build query string based on filters
        const query = `?type=${filters.type}&propertyType=${filters.propertyType}&sort=${filters.sort}`;
        const res = await API.get(`/properties${query}`);
        setList(res.data.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchAll();
  }, [filters]);

  return (
    <PageWrapper>
      <div style={{marginBottom: '40px'}}>
         <h1 style={{fontSize: '2.5rem', color: '#1F3A93', fontWeight: 800}}>Available <span style={{color:'#FFD700'}}>Sanctuaries</span></h1>
         <p style={{color: '#64748B'}}>Browse our verified catalog of Rwanda's premium real estate.</p>
      </div>

      <FilterBar>
        <SearchInput>
          <Search size={20} color="#1F3A93" />
          <input placeholder="Search by neighborhood..." />
        </SearchInput>

        <SelectGroup>
          <select onChange={(e) => setFilters({...filters, type: e.target.value})}>
            <option value="">All Status</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
          <select onChange={(e) => setFilters({...filters, propertyType: e.target.value})}>
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
          </select>
        </SelectGroup>
      </FilterBar>

      {loading ? (
        <div style={{textAlign:'center', padding:'100px', fontSize:'1.2rem', fontWeight:700, color:'#1F3A93'}}>Analyzing Market...</div>
      ) : (
        <Grid>
          {list.map(item => <PropertyCard key={item._id} data={item} />)}
        </Grid>
      )}
    </PageWrapper>
  );
};

export default Properties;