import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../services/api';
import PropertyCard from './PropertyCard';

const Section = styled.section`
  padding: 100px 8%;
  background: #F8FAFC;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  span { color: ${({ theme }) => theme.colors.accent}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const FeaturedSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get('/properties');
        setProperties(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties", err);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}>Loading exclusive listings...</div>;

  return (
    <Section>
      <Header>
        <Title>Featured <span>Properties</span></Title>
        <p style={{color: '#64748B', maxWidth: '400px'}}>Handpicked elite residences and investment opportunities in the heart of Rwanda.</p>
      </Header>
      <Grid>
        {properties.map(item => (
          <PropertyCard key={item._id} property={item} />
        ))}
      </Grid>
    </Section>
  );
};

export default FeaturedSection;