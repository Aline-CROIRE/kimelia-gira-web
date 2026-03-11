import React from 'react';
import styled from 'styled-components';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: 0.3s;
  position: relative;
`;

const ImageWrapper = styled.div`
  height: 220px;
  width: 100%;
  position: relative;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const PriceBadge = styled.div`
  position: absolute;
  top: 20px; left: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 8px 15px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  margin-bottom: 20px;
`;

const Specs = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 600;
`;

const FavoriteBtn = styled.button`
  position: absolute;
  top: 20px; right: 20px;
  background: white;
  width: 35px; height: 35px;
  border-radius: 50%;
  display: flex; justify-content: center; align-items: center;
  color: #ff4757;
`;

const PropertyCard = ({ property }) => {
  // Handle multi-language titles (Defaults to English)
  const title = property.title?.en || "Premium Property";
  const formattedPrice = new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(property.price);

  return (
    <Card whileHover={{ y: -10 }}>
      <ImageWrapper>
        <img src={property.images[0] || 'https://via.placeholder.com/400x300'} alt={title} />
        <PriceBadge>{formattedPrice}</PriceBadge>
        <FavoriteBtn><Heart size={18} /></FavoriteBtn>
      </ImageWrapper>
      <Content>
        <Title>{title}</Title>
        <Location>
          <MapPin size={14} /> {property.location?.address || "Kigali, Rwanda"}
        </Location>
        <Specs>
          <SpecItem><Bed size={16} color="#1F3A93"/> {property.features?.bedrooms || 0} Bed</SpecItem>
          <SpecItem><Bath size={16} color="#1F3A93"/> {property.features?.bathrooms || 0} Bath</SpecItem>
          <SpecItem><Maximize size={16} color="#1F3A93"/> {property.features?.size || 0} m²</SpecItem>
        </Specs>
      </Content>
    </Card>
  );
};

export default PropertyCard;