import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Maximize, ShieldCheck, Mail, 
  Phone, ArrowLeft, Share2, Heart, Trees, Landmark 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPropertyById } from '../services/propertyService';

const PageWrapper = styled.div`
  padding: 120px 0 80px; background: #F1F5F9; min-height: 100vh;
`;

const Container = styled.div` width: 90%; max-width: 1300px; margin: 0 auto; `;

const BackBtn = styled.button`
  background: none; display: flex; align-items: center; gap: 8px; 
  color: #1F3A93; font-family: 'Space Grotesk'; font-weight: 700; 
  margin-bottom: 30px; cursor: pointer;
  &:hover { color: #5C7CFA; }
`;

/* --- ARCHITECTURAL GALLERY --- */
const GalleryGrid = styled.div`
  display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 550px; gap: 15px;
  border-radius: 30px; overflow: hidden; margin-bottom: 50px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  @media (max-width: 900px) { grid-template-columns: 1fr; grid-template-rows: 350px; }
  img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
  img:hover { filter: brightness(1.1); }
`;

const MainGrid = styled.div`
  display: grid; grid-template-columns: 1.8fr 1fr; gap: 50px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

const ContentCard = styled.div`
  background: white; border-radius: 32px; padding: 50px;
  border: 1px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
`;

const Sidebar = styled.div`
  position: sticky; top: 120px; display: flex; flex-direction: column; gap: 30px;
`;

const ActionBox = styled.div`
  background: white; border-radius: 32px; padding: 40px;
  border: 1px solid #E2E8F0; box-shadow: 0 30px 60px rgba(31, 58, 147, 0.1);
`;

const PriceText = styled.h2`
  font-family: 'Space Grotesk'; font-size: 2.8rem; color: #1F3A93; margin-bottom: 5px;
`;

const PrimaryAction = styled.button`
  width: 100%; padding: 20px; border-radius: 16px; margin-top: 20px;
  background: ${props => props.theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800; 
  text-transform: uppercase; letter-spacing: 1px;
  box-shadow: 0 10px 20px rgba(31, 58, 147, 0.2);
`;

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPropertyById(id).then(res => { setData(res); setLoading(false); });
  }, [id]);

  if (loading) return <PageWrapper><Container><h2 style={{fontFamily:'Space Grotesk'}}>CONSULTING AI...</h2></Container></PageWrapper>;
  if (!data) return <PageWrapper><Container><h2>Sanctuary Not Found</h2></Container></PageWrapper>;

  const title = data.title[i18n.language] || data.title['en'];
  const desc = data.description?.[i18n.language] || data.description?.['en'] || "No description available.";

  return (
    <PageWrapper>
      <Container>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <BackBtn onClick={() => navigate(-1)}><ArrowLeft size={20}/> Catalog</BackBtn>
            <div style={{display:'flex', gap:'15px'}}>
                <button style={{background:'white', padding:'10px', borderRadius:'50%', border:'1px solid #E2E8F0'}}><Share2 size={20} color="#1F3A93"/></button>
                <button style={{background:'white', padding:'10px', borderRadius:'50%', border:'1px solid #E2E8F0'}}><Heart size={20} color="#FF4757"/></button>
            </div>
        </div>

        <GalleryGrid>
          <img src={data.images[0]} alt="Exterior" />
          <div style={{display:'grid', gridTemplateRows:'1fr 1fr', gap:'15px'}}>
            <img src={data.images[1] || data.images[0]} alt="Interior 1" />
            <img src={data.images[2] || data.images[0]} alt="Interior 2" />
          </div>
        </GalleryGrid>

        <MainGrid>
          <ContentCard>
             <div style={{display:'flex', gap:'10px', marginBottom:'25px'}}>
                <span style={{background:'#FFD700', color:'#1F3A93', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase'}}>Verified Luxury</span>
                <span style={{background:'#F1F5F9', color:'#1F3A93', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase'}}>{data.propertyType}</span>
             </div>
             
             <h1 style={{fontSize:'3.5rem', marginBottom:'15px', color:'#1F3A93'}}>{title}</h1>
             
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
                  <div style={{display:'flex', alignItems:'center', gap:'15px'}}><Trees color="#1F3A93" size={45}/><p style={{fontSize:'1.8rem', fontWeight:800, color:'#1F3A93', fontFamily:'Space Grotesk'}}>{data.features.size} m² LAND AREA</p></div>
                )}
             </div>

             <h3 style={{fontSize:'1.8rem', marginBottom:'20px', color:'#1F3A93'}}>The Experience</h3>
             <p style={{lineHeight:'2', color:'#475569', fontSize:'1.1rem', fontFamily:'Inter'}}>{desc}</p>
          </ContentCard>

          <Sidebar>
            <ActionBox>
               <PriceText>{new Intl.NumberFormat().format(data.price)} RWF</PriceText>
               <p style={{color:'#64748B', fontWeight:700, borderBottom:'1px solid #EEE', paddingBottom:'25px', textTransform:'uppercase', fontSize:'0.8rem', letterSpacing:'1px'}}>Available for {data.type}</p>
               
               <div style={{marginTop:'30px'}}>
                  <p style={{fontWeight:800, color:'#1F3A93', marginBottom:'15px', fontSize:'0.8rem', textTransform:'uppercase'}}>Verified Representative</p>
                  <div style={{display:'flex', alignItems:'center', gap:'15px', background:'#F8FAFC', padding:'20px', borderRadius:'20px', border:'1px solid #E2E8F0'}}>
                     <div style={{width:'55px', height:'55px', borderRadius:'50%', background:'#1F3A93', display:'flex', justifyContent:'center', alignItems:'center', color:'white', fontWeight:800, fontSize:'1.2rem'}}>KG</div>
                     <div>
                        <p style={{fontWeight:800, fontSize:'0.95rem', color:'#1F3A93'}}>Kimelia Elite Partner</p>
                        <p style={{fontSize:'0.75rem', color:'#64748B', fontWeight:600}}>Senior Market Specialist</p>
                     </div>
                  </div>
               </div>

               <PrimaryAction><Mail size={20}/> Contact Agent</PrimaryAction>
               <button style={{width:'100%', padding:'18px', borderRadius:'16px', marginTop:'15px', background:'none', border:'2px solid #1F3A93', color:'#1F3A93', fontWeight:800, fontFamily:'Space Grotesk', display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}}>
                 <Phone size={20}/> Call Broker
               </button>
            </ActionBox>

            <ActionBox style={{background:'#1F3A93', color:'white', border:'none'}}>
               <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                  <ShieldCheck color="#FFD700" size={40} />
                  <div>
                    <p style={{fontWeight:800, fontFamily:'Space Grotesk', letterSpacing:'1px'}}>AI INSPECTED</p>
                    <p style={{fontSize:'0.85rem', opacity:0.7, marginTop:'5px', lineHeight:'1.4'}}>This property has been verified by Kimelia AI for market value and legal authenticity.</p>
                  </div>
               </div>
            </ActionBox>
          </Sidebar>
        </MainGrid>
      </Container>
    </PageWrapper>
  );
};

export default PropertyDetail;