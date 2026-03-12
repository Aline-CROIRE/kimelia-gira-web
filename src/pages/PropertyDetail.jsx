import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, ShieldCheck, Mail, Phone, ArrowLeft, Trees } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPropertyById } from '../services/propertyService';

const Page = styled.div`
  padding: 120px 0 80px; background: #F1F5F9; min-height: 100vh;
`;

const Container = styled.div` width: 90%; max-width: 1300px; margin: 0 auto; `;

const BackLink = styled.button`
  background: none; display: flex; align-items: center; gap: 8px; color: #1F3A93;
  font-family: 'Space Grotesk'; font-weight: 700; margin-bottom: 30px; cursor: pointer;
  &:hover { color: #FFD700; }
`;

const MainGrid = styled.div`
  display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

/* --- LUXURY GALLERY --- */
const Gallery = styled.div`
  display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 500px; gap: 15px;
  border-radius: 30px; overflow: hidden; margin-bottom: 40px;
  @media (max-width: 768px) { grid-template-columns: 1fr; grid-template-rows: auto; }
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const ContentCard = styled.div`
  background: white; border-radius: 30px; padding: 45px;
  border: 1px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
`;

const StickySidebar = styled.div`
  position: sticky; top: 110px; display: flex; flex-direction: column; gap: 25px;
`;

const ActionBox = styled.div`
  background: white; border-radius: 30px; padding: 35px;
  border: 1px solid #E2E8F0; box-shadow: 0 20px 50px rgba(31, 58, 147, 0.08);
`;

const Price = styled.h2`
  font-family: 'Space Grotesk'; font-size: 2.8rem; color: #1F3A93; margin-bottom: 10px;
`;

const GradientBtn = styled.button`
  width: 100%; padding: 18px; border-radius: 15px; margin-top: 15px;
  background: ${({ theme }) => theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800; text-transform: uppercase;
  display: flex; justify-content: center; align-items: center; gap: 10px;
  box-shadow: 0 10px 20px rgba(31, 58, 147, 0.2);
`;

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyById(id).then(res => { setData(res); setLoading(false); });
  }, [id]);

  if (loading) return <Page><Container><h2>Consulting AI Experts...</h2></Container></Page>;
  if (!data) return <Page><Container><h2>Listing Not Found</h2></Container></Page>;

  const title = data.title[i18n.language] || data.title['en'];
  const desc = data.description[i18n.language] || data.description['en'];

  return (
    <Page>
      <Container>
        <BackLink onClick={() => navigate(-1)}><ArrowLeft size={20}/> Back to Catalog</BackLink>
        
        <Gallery>
          <img src={data.images[0]} />
          <div style={{display:'grid', gridTemplateRows:'1fr 1fr', gap:'15px'}}>
            <img src={data.images[1] || data.images[0]} />
            <img src={data.images[2] || data.images[0]} />
          </div>
        </Gallery>

        <MainGrid>
          <div>
            <ContentCard>
               <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
                  <span style={{background:'#FFD700', color:'#1F3A93', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase'}}>Verified Luxury</span>
                  <span style={{background:'#F1F5F9', color:'#1F3A93', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase'}}>{data.propertyType}</span>
               </div>
               <h1 style={{fontSize:'3.2rem', marginBottom:'15px'}}>{title}</h1>
               <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#64748B', fontSize:'1.1rem', marginBottom:'40px'}}>
                  <MapPin size={22} color="#FFD700" /> {data.location.address}
               </div>

               <div style={{display:'flex', gap:'50px', marginBottom:'50px', borderBottom:'1px solid #F1F5F9', paddingBottom:'40px'}}>
                  {data.propertyType !== 'land' ? (
                    <>
                      <div style={{textAlign:'center'}}><Bed color="#1F3A93" size={30}/><p style={{fontWeight:800, color:'#1F3A93', marginTop:'10px'}}>{data.features.bedrooms} Beds</p></div>
                      <div style={{textAlign:'center'}}><Bath color="#1F3A93" size={30}/><p style={{fontWeight:800, color:'#1F3A93', marginTop:'10px'}}>{data.features.bathrooms} Baths</p></div>
                      <div style={{textAlign:'center'}}><Maximize color="#1F3A93" size={30}/><p style={{fontWeight:800, color:'#1F3A93', marginTop:'10px'}}>{data.features.size} m²</p></div>
                    </>
                  ) : (
                    <div style={{display:'flex', alignItems:'center', gap:'15px'}}><Trees color="#1F3A93" size={40}/><p style={{fontSize:'1.5rem', fontWeight:800, color:'#1F3A93'}}>{data.features.size} m² Land Area</p></div>
                  )}
               </div>

               <h3 style={{fontSize:'1.8rem', marginBottom:'20px'}}>The Sanctuary Experience</h3>
               <p style={{lineHeight:'1.8', color:'#475569', fontSize:'1.15rem'}}>{desc}</p>
            </ContentCard>
          </div>

          <StickySidebar>
            <ActionBox>
               <Price>{new Intl.NumberFormat().format(data.price)} RWF</Price>
               <p style={{color:'#64748B', fontWeight:600, borderBottom:'1px solid #EEE', paddingBottom:'25px'}}>Available for {data.type === 'sale' ? 'Purchase' : 'Lease'}</p>
               
               <div style={{marginTop:'30px'}}>
                  <p style={{fontWeight:800, color:'#1F3A93', marginBottom:'15px'}}>Broker Information</p>
                  <div style={{display:'flex', alignItems:'center', gap:'15px', background:'#F8FAFC', padding:'15px', borderRadius:'15px'}}>
                     <div style={{width:'50px', height:'50px', borderRadius:'50%', background:'#1F3A93', display:'flex', justifyContent:'center', alignItems:'center', color:'white', fontWeight:800}}>KG</div>
                     <div><p style={{fontWeight:800, fontSize:'0.9rem'}}>Kimelia Elite Partner</p><p style={{fontSize:'0.75rem', color:'#64748B'}}>Certified Broker</p></div>
                  </div>
               </div>

               <GradientBtn><Mail size={20}/> Send Inquiry</GradientBtn>
               <button style={{width:'100%', padding:'18px', borderRadius:'15px', marginTop:'15px', background:'none', border:'2px solid #1F3A93', color:'#1F3A93', fontWeight:800, display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}}><Phone size={20}/> Call Representative</button>
            </ActionBox>

            <ActionBox style={{background:'#1F3A93', color:'white'}}>
               <div style={{display:'flex', gap:'15px'}}>
                  <ShieldCheck color="#FFD700" size={30} />
                  <div><p style={{fontWeight:800}}>Kimelia AI Inspected</p><p style={{fontSize:'0.8rem', opacity:0.7}}>This listing meets our 50-point elite criteria.</p></div>
               </div>
            </ActionBox>
          </StickySidebar>
        </MainGrid>
      </Container>
    </Page>
  );
};

export default PropertyDetail;