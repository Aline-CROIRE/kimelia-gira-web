import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toggleFavorite } from '../services/propertyService';

const Card = styled(motion.div)`
  background: white; border-radius: 28px; overflow: hidden;
  box-shadow: ${props => props.theme.shadows.premium};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative; cursor: pointer; transition: 0.3s;
`;

const Gallery = styled.div` height: 250px; position: relative; overflow: hidden; background: #000; `;

const FavBtn = styled.button`
  position: absolute; top: 15px; right: 15px; z-index: 20;
  width: 40px; height: 40px; border-radius: 50%; border: none;
  /* Fixed: Using $active transient prop */
  background: ${props => props.$active ? '#FF4757' : 'rgba(255,255,255,0.2)'};
  backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center;
  color: white; cursor: pointer;
`;

const PriceGlass = styled.div`
  position: absolute; bottom: 15px; left: 15px; z-index: 10;
  background: rgba(11, 57, 127, 0.9); padding: 8px 16px; border-radius: 10px;
  color: white; font-weight: 700; font-family: 'Space Grotesk'; font-size: 1.1rem;
`;

const PropertyCard = ({ data }) => {
  const navigate = useNavigate();
  const { user, refreshUser } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && data) {
      const saved = user.favorites || [];
      setIsFav(saved.some(id => String(id._id || id) === String(data._id)));
    }
  }, [user, data]);

  const handleToggle = async (e) => {
    e.stopPropagation();
    if (!user) return navigate('/login');
    if (loading) return;

    setLoading(true);
    try {
      const res = await toggleFavorite(data._id);
      if (res.data.success) {
        setIsFav(res.data.isFavorite);
        if (refreshUser) refreshUser(); 
      }
    } catch (err) {
      console.error("Favorite toggle failed");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <Card onClick={() => navigate(`/properties/${data._id}`)}>
      <Gallery>
        <FavBtn $active={isFav} onClick={handleToggle}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Heart size={18} fill={isFav ? "white" : "none"} />}
        </FavBtn>
        <img src={data.images?.[0] || "https://via.placeholder.com/400x300"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Property" />
        <PriceGlass>{new Intl.NumberFormat().format(data.price)} RWF</PriceGlass>
      </Gallery>
      
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '1.2rem', color: '#0B397F', fontWeight: 700, fontFamily: 'Space Grotesk' }}>{data.title?.en}</h4>
        <div style={{ display: 'flex', gap: '5px', color: '#64748B', fontSize: '0.8rem', margin: '10px 0 15px' }}>
          <MapPin size={14} color="#F5A623" /> {data.location?.address || "Kigali"}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;