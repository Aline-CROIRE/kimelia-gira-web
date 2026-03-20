import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Maximize, ShieldCheck, Mail, 
  Phone, ArrowLeft, Share2, Heart, Trees, Lock, Loader2 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// CORRECT IMPORT PATH
import { getPropertyById } from '../services/propertyService';
import { AuthContext } from '../context/AuthContext';
import InquiryModal from '../components/InquiryModal';
import ImageGallery from '../components/ImageGallery';

const PageWrapper = styled.div`
  padding: 120px 0 80px; background: #F1F5F9; min-height: 100vh;
`;

const Container = styled.div` width: 90%; max-width: 1300px; margin: 0 auto; `;

const ContentGrid = styled.div`
  display: grid; grid-template-columns: 1.8fr 1fr; gap: 50px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

const InfoSection = styled.div`
  background: white; border-radius: 35px; padding: 50px;
  border: 1px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  @media (max-width: 600px) { padding: 30px 20px; }
`;

const Sidebar = styled.div`
  position: sticky; top: 120px; display: flex; flex-direction: column; gap: 30px;
`;

const ActionBox = styled.div`
  background: white; border-radius: 35px; padding: 40px;
  border: 1px solid #E2E8F0; box-shadow: 0 30px 60px rgba(11, 57, 127, 0.1);
`;

const PriceTag = styled.h2`
  font-family: 'Space Grotesk'; font-size: 3rem; color: #0B397F; 
  letter-spacing: -2px; margin-bottom: 5px;
`;

const PrimaryAction = styled.button`
  width: 100%; padding: 20px; border-radius: 16px; margin-top: 20px;
  background: ${({ theme }) => theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1px; border: none; cursor: pointer;
  display: flex; justify-content: center; align-items: center; gap: 10px;
`;

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { user } = useContext(AuthContext);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getPropertyById(id).then(res => { 
        setData(res); 
        setLoading(false); 
    });
  }, [id]);

  if (loading) return (
    <PageWrapper>
        <Container style={{textAlign:'center', paddingTop:'100px'}}>
            <Loader2 size={50} className="animate-spin" color="#0B397F" style={{margin:'0 auto'}}/>
            <h2 style={{fontFamily:'Space Grotesk', marginTop:'20px', color:'#0B397F'}}>CONSULTING AI ASSETS...</h2>
        </Container>
    </PageWrapper>
  );

  if (!data) return <PageWrapper><Container><div style={{textAlign:'center'}}><h2>Sanctuary Not Found</h2><button onClick={() => navigate('/properties')}>Back to Catalog</button></div></Container></PageWrapper>;

  const title = data.title?.[i18n.language] || data.title?.['en'] || "Premium Property";
  const desc = data.description?.[i18n.language] || data.description?.['en'];

  return (
    <PageWrapper>
      <Container>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'30px'}}>
            <button onClick={() => navigate(-1)} style={{background:'none', border:'none', display:'flex', alignItems:'center', gap:'10px', color:'#0B397F', fontWeight:800, cursor:'pointer', fontFamily:'Space Grotesk'}}>
                <ArrowLeft size={18}/> CATALOG
            </button>
        </div>

        <ImageGallery images={data.images} />

        <ContentGrid>
          <InfoSection>
            <div style={{display:'flex', gap:'12px', marginBottom:'20px'}}>
                <span style={{background:'#F5A623', color:'#0B397F', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase'}}>Verified Luxury</span>
                <span style={{background:'#F1F5F9', color:'#0B397F', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase'}}>{data.propertyType}</span>
            </div>

            <h1 style={{fontSize:'3.5rem', color:'#0B397F', fontFamily:'Space Grotesk', lineHeight:1, marginBottom:'15px'}}>{title}</h1>
            <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#64748B', fontWeight:600, marginBottom:'40px'}}>
                <MapPin size={22} color="#F5A623" /> {data.location?.address || "Kigali, Rwanda"}
            </div>

            <div style={{display:'flex', gap:'40px', padding:'30px 0', borderTop:'1px solid #F1F5F9', borderBottom:'1px solid #F1F5F9', marginBottom:'40px'}}>
                {data.propertyType !== 'land' ? (
                  <>
                    <div style={{textAlign:'center'}}><Bed color="#0B397F" size={32}/><p style={{fontFamily:'Space Grotesk', fontWeight:800, color:'#0B397F', marginTop:'5px'}}>{data.features?.bedrooms} BEDS</p></div>
                    <div style={{textAlign:'center'}}><Bath color="#0B397F" size={32}/><p style={{fontFamily:'Space Grotesk', fontWeight:800, color:'#0B397F', marginTop:'5px'}}>{data.features?.bathrooms} BATHS</p></div>
                    <div style={{textAlign:'center'}}><Maximize color="#0B397F" size={32}/><p style={{fontFamily:'Space Grotesk', fontWeight:800, color:'#0B397F', marginTop:'5px'}}>{data.features?.size} m²</p></div>
                  </>
                ) : (
                  <div style={{display:'flex', alignItems:'center', gap:'15px'}}><Trees color="#0B397F" size={45}/><p style={{fontSize:'1.8rem', fontWeight:800, color:'#0B397F', fontFamily:'Space Grotesk'}}>{data.features?.size} m² AREA</p></div>
                )}
            </div>

            <h3 style={{fontFamily:'Space Grotesk', fontSize:'1.8rem', color:'#0B397F', marginBottom:'20px'}}>Architectural Narrative</h3>
            <p style={{fontFamily:'Inter', lineHeight:'2', color:'#475569', fontSize:'1.1rem'}}>{desc}</p>
          </InfoSection>

          <Sidebar>
            <ActionBox>
                <PriceTag>{new Intl.NumberFormat().format(data.price)} RWF</PriceTag>
                <p style={{color:'#64748B', fontWeight:700, borderBottom:'1px solid #F1F5F9', paddingBottom:'25px', textTransform:'uppercase', fontSize:'0.8rem', letterSpacing:'1px'}}>Available for {data.type}</p>
                
                <PrimaryAction onClick={() => user ? setShowInquiry(true) : navigate('/login')}>
                    {user ? <><Mail size={20}/> SEND INQUIRY</> : "LOGIN TO INQUIRE"}
                </PrimaryAction>
                <button style={{width:'100%', padding:'18px', borderRadius:'16px', marginTop:'15px', background:'none', border:'2px solid #0B397F', color:'#0B397F', fontWeight:800, fontFamily:'Space Grotesk', cursor:'pointer'}}>CALL BROKER</button>
            </ActionBox>

            <ActionBox style={{background:'#0B397F', color:'white', border:'none'}}>
                <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                    <ShieldCheck color="#F5A623" size={45} />
                    <div>
                        <p style={{fontWeight:800, fontFamily:'Space Grotesk', letterSpacing:'1px', fontSize:'0.9rem'}}>AI CERTIFIED</p>
                        <p style={{fontSize:'0.85rem', opacity:0.7, marginTop:'5px', lineHeight:'1.5'}}>Market value and legal integrity verified by AI.</p>
                    </div>
                </div>
            </ActionBox>
          </Sidebar>
        </ContentGrid>
      </Container>

      <AnimatePresence>
        {showInquiry && <InquiryModal propertyId={data._id} propertyTitle={title} onClose={() => setShowInquiry(false)} />}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default PropertyDetail;