import React from 'react';
import styled from 'styled-components';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';

const Card = styled.div`
  background: white; 
  border-radius: ${props => props.theme.radius.large}; 
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.premium};
  transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover { transform: translateY(-10px); box-shadow: ${props => props.theme.shadows.float}; }
`;

const PropertyCard = ({ data }) => (
  <Card>
    <div style={{ height: '260px', position: 'relative' }}>
        <img src={data.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Listing" />
        <div style={{ position: 'absolute', bottom: 20, left: 20, background: '#1F3A93', color: 'white', padding: '10px 15px', borderRadius: '10px', fontWeight: 800, fontFamily: 'Space Grotesk' }}>
            {new Intl.NumberFormat().format(data.price)} RWF
        </div>
    </div>
    <div style={{ padding: '25px' }}>
        <h3 style={{ fontSize: '1.3rem', color: '#1F3A93', marginBottom: '8px' }}>{data.title.en}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B', fontSize: '0.85rem', marginBottom: '20px' }}>
            <MapPin size={14} color="#FFD700" /> {data.location.address}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '15px' }}>
            <span style={{ fontWeight: 700 }}><Bed size={18} color="#3B5BDB" /> {data.features.bedrooms}</span>
            <span style={{ fontWeight: 700 }}><Bath size={18} color="#3B5BDB" /> {data.features.bathrooms}</span>
            <span style={{ fontWeight: 700 }}><Maximize size={18} color="#3B5BDB" /> {data.features.size} m²</span>
        </div>
    </div>
  </Card>
);

export default PropertyCard;