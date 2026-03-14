import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Card = styled(motion.div)`
  background: white; border-radius: 28px; overflow: hidden;
  box-shadow: ${props => props.theme.shadows.premium};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative; cursor: pointer; transition: 0.3s;
  &:hover { transform: translateY(-10px); box-shadow: ${props => props.theme.shadows.float}; }
`;

const Gallery = styled.div`
  height: 280px; position: relative; overflow: hidden; background: #0F172A;
`;

const NavBtn = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px);
  color: white; border-radius: 50%; width: 34px; height: 34px;
  display: flex; justify-content: center; align-items: center;
  z-index: 10; opacity: 0; transition: 0.3s;
  ${Gallery}:hover & { opacity: 1; }
  &:hover { background: white; color: #1F3A93; }
`;

const Badge = styled.div`
  position: absolute; top: 20px; left: 20px; z-index: 10;
  background: ${props => props.theme.gradients.brand};
  color: white; padding: 6px 16px; border-radius: 8px;
  font-family: 'Space Grotesk'; font-weight: 700; font-size: 0.65rem; text-transform: uppercase;
  display: flex; align-items: center; gap: 5px;
`;

const PriceGlass = styled.div`
  position: absolute; bottom: 20px; left: 20px; z-index: 10;
  background: ${props => props.theme.gradients.glassPrice};
  padding: 12px 22px; border-radius: 14px; color: white;
  font-weight: 700; font-family: 'Space Grotesk'; font-size: 1.2rem;
  border-left: 4px solid #FFD700;
`;

const PropertyCard = ({ data }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [isFav, setIsFav] = useState(false);

  const title = data.title[i18n.language] || data.title['en'];

  const handleNext = (e) => { e.stopPropagation(); setIdx((prev) => (prev + 1) % data.images.length); };
  const handlePrev = (e) => { e.stopPropagation(); setIdx((prev) => (prev === 0 ? data.images.length - 1 : prev - 1)); };

  return (
    <Card onClick={() => navigate(`/properties/${data._id}`)}>
      <Gallery>
        <Badge><ShieldCheck size={12}/> {data.propertyType}</Badge>
        <button 
          style={{position:'absolute', top:20, right:20, zIndex:15, background:'rgba(255,255,255,0.2)', border:'none', borderRadius:'50%', width:40, height:40, color:isFav ? '#FF4757' : 'white', cursor:'pointer'}}
          onClick={(e) => { e.stopPropagation(); setIsFav(!isFav); }}
        >
          <Heart size={20} fill={isFav ? "currentColor" : "none"} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img 
            key={idx} src={data.images[idx]} 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            style={{width:'100%', height:'100%', objectFit:'cover'}} 
          />
        </AnimatePresence>

        <NavBtn style={{ left: '12px' }} onClick={handlePrev}><ChevronLeft size={20}/></NavBtn>
        <NavBtn style={{ right: '12px' }} onClick={handleNext}><ChevronRight size={20}/></NavBtn>
        <PriceGlass>{new Intl.NumberFormat().format(data.price)} RWF</PriceGlass>
      </Gallery>

      <div style={{ padding: '25px' }}>
        <h4 style={{ fontSize: '1.25rem', color: '#1F3A93', fontWeight: 700, marginBottom: '6px', fontFamily: 'Space Grotesk' }}>{title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B', fontSize: '0.85rem', marginBottom: '20px' }}>
          <MapPin size={14} color="#FFD700" /> {data.location.address}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '15px' }}>
          <div style={{ display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93', fontSize: '0.85rem' }}><Bed size={18} color="#3B5BDB"/> {data.features.bedrooms}</div>
          <div style={{ display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93', fontSize: '0.85rem' }}><Bath size={18} color="#3B5BDB"/> {data.features.bathrooms}</div>
          <div style={{ display:'flex', gap:'5px', fontWeight:700, color:'#1F3A93', fontSize: '0.85rem' }}><Maximize size={18} color="#3B5BDB"/> {data.features.size} m²</div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;