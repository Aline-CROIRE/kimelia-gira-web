import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart, ChevronRight, ChevronLeft, Trees } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Card = styled(motion.div)`
  background: white; border-radius: 28px; overflow: hidden;
  box-shadow: 0 10px 30px rgba(31, 58, 147, 0.05);
  border: 1px solid #E2E8F0; position: relative; cursor: pointer;
  &:hover { transform: translateY(-12px); box-shadow: 0 30px 60px rgba(0,0,0,0.12); }
`;

const Gallery = styled.div`
  height: 280px; position: relative; overflow: hidden; background: #000;
`;

const NavBtn = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.2); backdrop-filter: blur(8px);
  color: white; border-radius: 50%; width: 36px; height: 36px;
  display: flex; justify-content: center; align-items: center;
  z-index: 10; opacity: 0; transition: 0.3s;
  ${Gallery}:hover & { opacity: 1; }
  &:hover { background: #FFD700; color: #1F3A93; }
`;

const Badge = styled.div`
  position: absolute; top: 20px; left: 20px; z-index: 10;
  background: ${({ theme }) => theme.gradients.brand}; /* 3-Stop Gradient */
  color: white; padding: 8px 16px; border-radius: 10px;
  font-weight: 800; font-size: 0.65rem; text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

const PriceGlass = styled.div`
  position: absolute; bottom: 20px; left: 20px; z-index: 10;
  background: linear-gradient(135deg, rgba(31, 58, 147, 0.9), rgba(15, 23, 42, 0.9));
  padding: 12px 22px; border-radius: 14px; border-left: 4px solid #FFD700;
  color: white; font-weight: 800; font-size: 1.2rem;
`;

const PropertyCard = ({ data }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [idx, setIdx] = useState(0);
  const title = data.title[i18n.language] || data.title['en'];

  const next = (e) => { e.stopPropagation(); setIdx((prev) => (prev + 1) % data.images.length); };
  const prev = (e) => { e.stopPropagation(); setIdx((prev) => (prev === 0 ? data.images.length - 1 : prev - 1)); };

  return (
    <Card onClick={() => navigate(`/properties/${data._id}`)}>
      <Gallery>
        <Badge>{data.propertyType}</Badge>
        <AnimatePresence mode="wait">
          <motion.img key={idx} src={data.images[idx]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{width:'100%', height:'100%', objectFit:'cover'}} />
        </AnimatePresence>
        <NavBtn style={{left: '12px'}} onClick={prev}><ChevronLeft size={20}/></NavBtn>
        <NavBtn style={{right: '12px'}} onClick={next}><ChevronRight size={20}/></NavBtn>
        <PriceGlass>{new Intl.NumberFormat().format(data.price)} RWF</PriceGlass>
      </Gallery>
      <div style={{padding: '25px'}}>
        <h4 style={{fontSize: '1.3rem', color: '#1F3A93', fontWeight: 800, marginBottom: '6px'}}>{title}</h4>
        <div style={{display:'flex', alignItems:'center', gap:'5px', color:'#64748B', fontSize:'0.85rem', marginBottom:'20px'}}><MapPin size={14} color="#FFD700"/> {data.location.address}</div>
        <div style={{display:'flex', justifyContent:'space-between', borderTop:'1.5px solid #F1F5F9', paddingTop:'15px'}}>
          {data.propertyType === 'land' ? (
             <div style={{display:'flex', alignItems:'center', gap:'8px', fontWeight:800, color:'#1F3A93'}}><Trees size={20} color="#FFD700"/> {data.features.size} m² TOTAL</div>
          ) : (
            <>
              <div style={{display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93'}}><Bed size={18}/> {data.features.bedrooms}</div>
              <div style={{display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93'}}><Bath size={18}/> {data.features.bathrooms}</div>
              <div style={{display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93'}}><Maximize size={18}/> {data.features.size} m²</div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;