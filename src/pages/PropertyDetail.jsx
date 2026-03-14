import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Maximize, ShieldCheck, Mail, 
  Phone, ArrowLeft, Share2, Heart, Trees, Lock 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPropertyById } from '../services/propertyService';
import { AuthContext } from '../context/AuthContext';
import InquiryModal from '../components/InquiryModal';

const PageWrapper = styled.div`
  padding: 120px 0 80px; background: #F1F5F9; min-height: 100vh;
`;

const Container = styled.div` width: 90%; max-width: 1300px; margin: 0 auto; `;

const BackBtn = styled.button`
  background: none; display: flex; align-items: center; gap: 8px; 
  color: #1F3A93; font-family: 'Space Grotesk'; font-weight: 700; 
  margin-bottom: 30px; cursor: pointer; transition: 0.3s;
  &:hover { color: #3B5BDB; transform: translateX(-5px); }
`;

const GalleryGrid = styled.div`
  display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 550px; gap: 15px;
  border-radius: 30px; overflow: hidden; margin-bottom: 50px;
  box-shadow: ${props => props.theme.shadows.premium};
  @media (max-width: 900px) { grid-template-columns: 1fr; grid-template-rows: 350px; }
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const MainGrid = styled.div`
  display: grid; grid-template-columns: 1.8fr 1fr; gap: 50px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

const ContentCard = styled.div`
  background: white; border-radius: 32px; padding: 50px;
  border: 1px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
`;

const Sidebar = styled.div` position: sticky; top: 120px; display: flex; flex-direction: column; gap: 30px; `;

const ActionBox = styled.div`
  background: white; border-radius: 32px; padding: 40px;
  border: 1px solid #E2E8F0; box-shadow: ${props => props.theme.shadows.premium};
`;

const PriceText = styled.h2`
  font-family: 'Space Grotesk'; font-size: 2.8rem; color: #1F3A93; margin-bottom: 5px;
`;

const PrimaryAction = styled.button`
  width: 100%; padding: 20px; border-radius: 16px; margin-top: 20px;
  background: ${props => props.isLocked ? '#94A3B8' : props.theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800; 
  text-transform: uppercase; letter-spacing: 1px;
  display: flex; justify-content: center; align-items: center; gap: 10px;
  cursor: pointer; transition: 0.3s;
  &:hover { transform: translateY(-2px); filter: brightness(1.1); }
`;

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { user } = useContext(AuthContext);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPropertyById(id).then(res => { setData(res); setLoading(false); });
  }, [id]);

  if (loading) return <PageWrapper><Container><h2 style={{fontFamily:'Space Grotesk', textAlign:'center', marginTop:'50px'}}>ANALYZING ASSET...</h2></Container></PageWrapper>;
  if (!data) return <PageWrapper><Container><h2>Listing Not Found</h2></Container></PageWrapper>;

  const title = data.title[i18n.language] || data.title['en'];
  const desc = data.description?.[i18n.language] || data.description?.['en'];

  const handleInquiryClick = () => {
    if (!user) {
        navigate('/login');
    } else {
        setShowModal(true);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <BackBtn onClick={() => navigate(-1)}><ArrowLeft size={20}/> CATALOG</BackBtn>
            <div style={{display:'flex', gap:'15px'}}>
                <button style={{background:'white', padding:'10px', borderRadius:'50%', border:'1px solid #E2E8F0', cursor:'pointer'}}><Share2 size={20} color="#1F3A93"/></button>
                <button style={{background:'white', padding:'10px', borderRadius:'50%', border:'1px solid #E2E8F0', cursor:'pointer'}}><Heart size={20} color="#FF4757"/></button>
            </div>
        </div>

        <GalleryGrid>
          <img src={data.images[0]} alt="Property" />
          <div style={{display:'grid', gridTemplateRows:'1fr 1fr', gap:'15px'}}>
            <img src={data.images[1] || data.images[0]} />
            <img src={data.images[2] || data.images[0]} />
          </div>
        </GalleryGrid>

        <MainGrid>
          <ContentCard>
             <div style={{display:'flex', gap:'10px', marginBottom:'25px'}}>
                <span style={{background:'#FFD700', color:'#1F3A93', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase'}}>Verified Luxury</span>
             </div>
             
             <h1 style={{fontSize:'3.2rem', color:'#1F3A93', fontFamily:'Space Grotesk'}}>{title}</h1>
             <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#64748B', fontSize:'1.1rem', marginBottom:'50px'}}>
                <MapPin size={22} color="#FFD700" /> {data.location.address}
             </div>

             <div style={{display:'flex', gap:'50px', marginBottom:'50px', borderBottom:'1px solid #F1F5F9', paddingBottom:'40px'}}>
                {data.propertyType !== 'land' ? (
                  <>
                    <div style={{textAlign:'center'}}><Bed color="#1F3A93" size={32}/><p style={{fontWeight:800, color:'#1F3A93', marginTop:'10px', fontFamily:'Space Grotesk'}}>{data.features.bedrooms} BEDS</p></div>
                    <div style={{textAlign:'center'}}><Bath color="#1F3A93" size={32}/><p style={{fontWeight:800, color:'#1F3A93', marginTop:'10px', fontFamily:'Space Grotesk'}}>{data.features.bathrooms} BATHS</p></div>
                    <div style={{textAlign:'center'}}><Maximize color="#1F3A93" size={32}/><p style={{fontWeight:800, color:'#1F3A93', marginTop:'10px', fontFamily:'Space Grotesk'}}>{data.features.size} m²</p></div>
                  </>
                ) : (
                  <div style={{display:'flex', alignItems:'center', gap:'15px'}}><Trees color="#1F3A93" size={45}/><p style={{fontSize:'1.8rem', fontWeight:800, color:'#1F3A93', fontFamily:'Space Grotesk'}}>{data.features.size} m² AREA</p></div>
                )}
             </div>

             <h3 style={{fontSize:'1.8rem', marginBottom:'20px', color:'#1F3A93', fontFamily:'Space Grotesk'}}>Property Overview</h3>
             <p style={{lineHeight:'2', color:'#475569', fontSize:'1.1rem', fontFamily:'Inter'}}>{desc}</p>
          </ContentCard>

          <Sidebar>
            <ActionBox>
               <PriceText>{new Intl.NumberFormat().format(data.price)} RWF</PriceText>
               <p style={{color:'#64748B', fontWeight:700, borderBottom:'1px solid #EEE', paddingBottom:'25px', textTransform:'uppercase', fontSize:'0.8rem'}}>Listed for {data.type}</p>
               
               <PrimaryAction onClick={handleInquiryClick} isLocked={!user}>
                 {user ? <><Mail size={20}/> Send Inquiry</> : <><Lock size={18}/> Login to Inquire</>}
               </PrimaryAction>
            </ActionBox>

            <ActionBox style={{background:'#1F3A93', color:'white', border:'none'}}>
               <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                  <ShieldCheck color="#FFD700" size={40} />
                  <div>
                    <p style={{fontWeight:800, fontFamily:'Space Grotesk'}}>AI INSPECTED</p>
                    <p style={{fontSize:'0.85rem', opacity:0.7, marginTop:'5px'}}>Verified for market value and legal authenticity.</p>
                  </div>
               </div>
            </ActionBox>
          </Sidebar>
        </MainGrid>
      </Container>

      {/* RENDER MODAL WITH ANIMATE PRESENCE LOGIC */}
      <AnimatePresence>
        {showModal && (
            <InquiryModal 
            propertyId={data._id} 
            propertyTitle={title} 
            onClose={() => setShowModal(false)} 
            />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default PropertyDetail;