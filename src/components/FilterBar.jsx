import React from 'react';
import styled from 'styled-components';
import { Search, SlidersHorizontal } from 'lucide-react';

const Bar = styled.div`
  background: white; padding: 25px 40px; border-radius: 20px;
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 50px; box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  border: 1px solid #E2E8F0;
  @media (max-width: 1024px) { flex-direction: column; gap: 20px; padding: 20px; }
`;

const SearchBox = styled.div`
  display: flex; align-items: center; gap: 15px; background: #F8FAFC;
  padding: 12px 25px; border-radius: 12px; width: 40%;
  border: 1px solid #F1F5F9;
  input { border: none; background: none; outline: none; width: 100%; font-weight: 600; color: #1F3A93; font-family: 'Inter'; }
  @media (max-width: 1024px) { width: 100%; }
`;

const Group = styled.div`
  display: flex; gap: 15px;
  select { 
    padding: 12px 20px; border-radius: 10px; border: 1.5px solid #F1F5F9;
    font-family: 'Space Grotesk'; font-weight: 700; color: #1F3A93; cursor: pointer;
    &:focus { border-color: #3B5BDB; }
  }
`;

const FilterBar = ({ onFilterChange }) => (
  <Bar>
    <SearchBox>
      <Search size={18} color="#1F3A93" />
      <input placeholder="Search district..." onChange={(e) => onFilterChange('search', e.target.value)} />
    </SearchBox>
    <Group>
      <select onChange={(e) => onFilterChange('type', e.target.value)}>
        <option value="">All Status</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>
      <select onChange={(e) => onFilterChange('propertyType', e.target.value)}>
        <option value="">All Types</option>
        <option value="house">Modern Villa</option>
        <option value="apartment">Penthouse</option>
        <option value="land">Prime Land</option>
      </select>
      <button style={{background:'#F1F5F9', padding:'12px', borderRadius:'10px', color:'#1F3A93'}}><SlidersHorizontal size={20}/></button>
    </Group>
  </Bar>
);

export default FilterBar;