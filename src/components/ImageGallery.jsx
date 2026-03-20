import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Layout } from 'lucide-react';

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 500px;
  gap: 15px;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 40px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 350px;
  }
`;

const MainImage = styled.img`
  width: 100%; height: 100%; object-fit: cover;
  cursor: pointer; transition: 0.5s;
  &:hover { filter: brightness(1.1); }
`;

const SidePanel = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  @media (max-width: 900px) { display: none; }
`;

const ViewAllTag = styled.div`
  position: absolute; bottom: 30px; right: 30px;
  background: white; color: #0B397F; padding: 12px 24px;
  border-radius: 12px; font-family: 'Space Grotesk'; font-weight: 800;
  display: flex; align-items: center; gap: 10px; cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  z-index: 10;
  &:hover { background: #F5A623; }
`;

const ImageGallery = ({ images = [] }) => {
  const displayImages = images.length > 0 ? images : ["https://via.placeholder.com/1200x800"];

  return (
    <GalleryWrapper>
      <MainImage src={displayImages[0]} alt="Property Feature" />
      <SidePanel>
        <img src={displayImages[1] || displayImages[0]} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="Interior" />
        <img src={displayImages[2] || displayImages[0]} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="Interior" />
      </SidePanel>
      <ViewAllTag>
        <Layout size={18} /> VIEW ALL {images.length} PHOTOS
      </ViewAllTag>
    </GalleryWrapper>
  );
};

export default ImageGallery;