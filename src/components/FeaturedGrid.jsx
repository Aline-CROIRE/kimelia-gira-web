import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../services/api';
import PropertyCard from './PropertyCard';
import { getProperties } from '../services/propertyService';



const Section = styled.section`
  padding: 100px 8%; background: #F1F5F9;
`;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px;
  h2 { font-size: 3rem; color: #1F3A93; font-weight: 800; }
  span { background: ${({ theme }) => theme.gradients.brand}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 20px; }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 40px;
`;

const ExploreBtn = styled.button`
  background: ${({ theme }) => theme.gradients.brand};
  color: white; padding: 18px 45px; border-radius: 15px;
  font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px;
  box-shadow: 0 10px 30px rgba(31, 58, 147, 0.2);
  &:hover { transform: translateY(-3px); filter: brightness(1.1); }
`;

const eliteDummyData = [
  { _id: "1", propertyType: "house", title: { en: "The Sapphire Villa", rw: "Villa y'Agatangaza" }, price: 850000000, location: { address: "Nyarutarama, Kigali" }, features: { bedrooms: 5, bathrooms: 4, size: 450 }, images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811", "https://images.unsplash.com/photo-1613977257363-707ba9348227"] },
  { _id: "2", propertyType: "apartment", title: { en: "Skyline Penthouse", rw: "Inzu Hejuru y'Ikirere" }, price: 4500000, type: "rent", location: { address: "Kacyiru, Kigali" }, features: { bedrooms: 3, bathrooms: 3, size: 210 }, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"] },
  { _id: "3", propertyType: "land", title: { en: "Riverside Industrial Plot", rw: "Ibibanza by'Inganda" }, price: 120000000, location: { address: "Bugesera, Rwanda" }, features: { size: 5000 }, images: ["https://images.unsplash.com/photo-1500382017468-9049fee74a62", "https://images.unsplash.com/photo-1500076656116-558758c991c1"] },
  { _id: "4", propertyType: "commercial", title: { en: "Elite Business Center", rw: "Inzu y'ubucuruzi" }, price: 15000000, type: "rent", location: { address: "CBD, Kigali" }, features: { bedrooms: 0, bathrooms: 10, size: 1200 }, images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab", "https://images.unsplash.com/photo-1497366216548-37526070297c"] },
];

const FeaturedGrid = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then(data => setProperties(data.slice(0, 6)));
  }, []);

 

  return (
    <Section>
      <Header>
        <h2>Elite <span>Portfolio</span></h2>
        <ExploreBtn onClick={() => window.location.href='/properties'}>Explore More</ExploreBtn>
      </Header>
      <Grid>
        {properties.map(p => <PropertyCard key={p._id} data={p} />)}
      </Grid>
    </Section>
  );
};

export default FeaturedGrid;