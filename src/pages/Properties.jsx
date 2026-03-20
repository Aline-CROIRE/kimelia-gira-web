import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Map as MapIcon, LayoutGrid } from 'lucide-react';
import { getProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import MapContainer from '../components/MapContainer';

const Page = styled.div`
  padding-top: 80px; height: 100vh; display: flex; flex-direction: column;
  background: #F1F5F9; overflow: hidden;
`;

const TopBar = styled.div`
  height: 90px; background: white; border-bottom: 1px solid #E2E8F0;
  display: flex; align-items: center; padding: 0 5%; gap: 20px;
  z-index: 10;
`;

const SearchBox = styled.div`
  flex: 1; max-width: 500px; background: #F8FAFC; border: 1px solid #E2E8F0;
  padding: 12px 20px; border-radius: 12px; display: flex; align-items: center; gap: 12px;
  input { border: none; background: none; outline: none; width: 100%; font-weight: 600; color: #1F3A93; }
`;

const MainContent = styled.div`
  display: grid; grid-template-columns: 1.2fr 1fr; flex: 1; overflow: hidden;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const ListSide = styled.div`
  overflow-y: auto; padding: 40px;
  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
`;

const MapSide = styled.div`
  padding: 20px; @media (max-width: 1024px) { display: none; }
`;

const Properties = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', propertyType: '', search: '' });

  useEffect(() => {
    setLoading(true);
    getProperties(filters).then(data => {
      setList(data);
      setLoading(false);
    });
  }, [filters]);

  return (
    <Page>
      <TopBar>
        <SearchBox>
          <Search size={18} color="#1F3A93" />
          <input 
            placeholder="Search district (e.g. Nyarutarama)..." 
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </SearchBox>
        
        <div style={{ display: 'flex', gap: '10px' }}>
            <select 
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', fontWeight: 700, color: '#1F3A93', fontFamily: 'Space Grotesk' }}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
                <option value="">Status</option>
                <option value="sale">Buy</option>
                <option value="rent">Rent</option>
            </select>
            <select 
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', fontWeight: 700, color: '#1F3A93', fontFamily: 'Space Grotesk' }}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
            >
                <option value="">Type</option>
                <option value="house">Villa</option>
                <option value="apartment">Penthouse</option>
                <option value="land">Land</option>
            </select>
        </div>
      </TopBar>

      <MainContent>
        <ListSide>
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 700, color: '#64748B', fontFamily: 'Space Grotesk' }}>
                SHOWING {list.length} ELITE LISTINGS
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ background: 'white', border: '1px solid #E2E8F0', padding: '8px', borderRadius: '8px' }}><LayoutGrid size={18} /></button>
                <button style={{ background: 'white', border: '1px solid #E2E8F0', padding: '8px', borderRadius: '8px' }}><MapIcon size={18} /></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {list.map(p => (
              <motion.div key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <PropertyCard data={p} />
              </motion.div>
            ))}
          </div>
        </ListSide>

        <MapSide>
          <MapContainer properties={list} />
        </MapSide>
      </MainContent>
    </Page>
  );
};

export default Properties;