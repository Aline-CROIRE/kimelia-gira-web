import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, ChevronRight, ChevronLeft, Trees } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Card = styled(motion.div)`
  background: white; border-radius: 24px; overflow: hidden;
  box-shadow: ${props => props.theme.shadows.premium};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative; cursor: pointer; transition: 0.3s;
  &:hover { transform: translateY(-10px); }
`;

const Gallery = styled.div`
  height: 250px; position: relative; overflow: hidden; background: #000;
`;

const PriceGlass = styled.div`
  position: absolute; bottom: 15px; left: 15px; z-index: 10;
  background: rgba(31, 58, 147, 0.9);
  padding: 8px 16px; border-radius: 10px; color: white;
  font-weight: 700; font-family: 'Space Grotesk'; font-size: 1.1rem;
  border-left: 3px solid #FFD700;
`;

const PropertyCard = ({ data }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);

  // SAFETY: Handle undefined titles or data
  if (!data) return null;
  const title = data.title?.[i18n.language] || data.title?.['en'] || "Premium Property";
  const images = data.images && data.images.length > 0 ? data.images : ["https://via.placeholder.com/400x300?text=No+Image"];

  return (
    <Card onClick={() => navigate(`/properties/${data._id}`)}>
      <Gallery>
        <img src={images[idx]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Listing" />
        <PriceGlass>{new Intl.NumberFormat().format(data.price)} RWF</PriceGlass>
      </Gallery>
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '1.2rem', color: '#1F3A93', fontWeight: 700, marginBottom: '5px', fontFamily: 'Space Grotesk' }}>{title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B', fontSize: '0.85rem', marginBottom: '15px' }}>
          <MapPin size={14} color="#FFD700" /> {data.location?.address || "Address Hidden"}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
          {data.propertyType === 'land' ? (
            <div style={{ fontWeight: 700, color: '#1F3A93', fontSize: '0.85rem' }}>
               <Trees size={16} /> {data.features?.size || 'N/A'} m²
            </div>
          ) : (
            <>
              <div style={{ display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93', fontSize: '0.85rem' }}><Bed size={16} color="#3B5BDB"/> {data.features?.bedrooms || 0}</div>
              <div style={{ display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93', fontSize: '0.85rem' }}><Bath size={16} color="#3B5BDB"/> {data.features?.bathrooms || 0}</div>
              <div style={{ display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93', fontSize: '0.85rem' }}><Maximize size={16} color="#3B5BDB"/> {data.features?.size || 0} m²</div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;