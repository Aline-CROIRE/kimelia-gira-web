import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Maximize, ShieldCheck, Mail, 
  Phone, ArrowLeft, Share2, Heart, Trees, Lock, Loader2 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Internal System Imports
import { getPropertyById } from '../services/propertyService';
import { AuthContext } from '../context/AuthContext';
import InquiryModal from '../components/InquiryModal';
import ImageGallery from '../components/ImageGallery';

/* --- STYLED ARCHITECTURE --- */
const PageWrapper = styled.div`
  padding: 120px 0 80px; 
  background: #F1F5F9; 
  min-height: 100vh;
`;

const Container = styled.div` 
  width: 90%; 
  max-width: 1300px; 
  margin: 0 auto; 
`;

const HeaderNav = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 30px;
`;

const BackBtn = styled.button`
  background: none; border: none; display: flex; align-items: center; gap: 10px; 
  color: #0B397F; font-family: 'Space Grotesk'; font-weight: 800; 
  cursor: pointer; transition: 0.3s;
  &:hover { color: #F5A623; transform: translateX(-5px); }
`;

const LayoutGrid = styled.div`
  display: grid; 
  grid-template-columns: 1.8fr 1fr; 
  gap: 50px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

const InfoSection = styled.div`
  background: white; 
  border-radius: 35px; 
  padding: 50px;
  border: 1px solid #E2E8F0; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  @media (max-width: 600px) { padding: 30px 20px; }
`;

const StickySidebar = styled.div`
  position: sticky; 
  top: 120px; 
  display: flex; 
  flex-direction: column; 
  gap: 30px;
`;

const ActionBox = styled.div`
  background: white; 
  border-radius: 35px; 
  padding: 40px;
  border: 1px solid #E2E8F0; 
  box-shadow: 0 30px 60px rgba(11, 57, 127, 0.1);
`;

const PriceTag = styled.h2`
  font-family: 'Space Grotesk'; 
  font-size: clamp(2rem, 4vw, 3rem); 
  color: #0B397F; 
  letter-spacing: -2px; 
  margin-bottom: 5px;
  font-weight: 800;
`;

const SpecGrid = styled.div`
  display: flex; 
  flex-wrap: wrap; 
  gap: 40px; 
  margin: 40px 0;
  padding: 30px 0; 
  border-top: 1px solid #F1F5F9; 
  border-bottom: 1px solid #F1F5F9;
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  span { font-family: 'Space Grotesk'; font-weight: 800; color: #0B397F; font-size: 0.9rem; text-transform: uppercase; }
`;

const InquiryBtn = styled(motion.button)`
  width: 100%; 
  padding: 20px; 
  border-radius: 16px; 
  margin-top: 20px;
  background: ${props => props.$locked ? '#94A3B8' : 'linear-gradient(135deg, #0B397F 0%, #F5A623 100%)'};
  color: white; 
  font-family: 'Space Grotesk'; 
  font-weight: 800;
  text-transform: uppercase; 
  letter-spacing: 1px; 
  border: none; 
  cursor: pointer;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  gap: 12px;
  box-shadow: 0 10px 20px rgba(31, 58, 147, 0.2);
`;

/* --- PAGE COMPONENT --- */
const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { user } = useContext(AuthContext);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
        <Container style={{textAlign:'center', paddingTop:'150px'}}>
            <Loader2 size={50} className="animate-spin" color="#0B397F" style={{margin:'0 auto'}}/>
            <h2 style={{fontFamily:'Space Grotesk', marginTop:'20px', color:'#0B397F'}}>SECURELY FETCHING ASSET DATA...</h2>
        </Container>
    </PageWrapper>
  );

  if (!data) return (
    <PageWrapper>
        <Container style={{textAlign:'center', paddingTop:'150px'}}>
            <h1 style={{fontFamily:'Space Grotesk', color:'#0B397F'}}>Sanctuary Not Found</h1>
            <BackBtn onClick={() => navigate('/properties')} style={{margin:'30px auto'}}>Return to Catalog</BackBtn>
        </Container>
    </PageWrapper>
  );

  // Dynamic Translation Mapping
  const title = data.title?.[i18n.language] || data.title?.['en'] || "Elite Listing";
  const desc = data.description?.[i18n.language] || data.description?.['en'] || "Description currently being optimized by AI.";

  const handleAction = () => {
    if (!user) navigate('/login');
    else setShowModal(true);
  };

  return (
    <PageWrapper>
      <Container>
        <HeaderNav>
            <BackBtn onClick={() => navigate(-1)}><ArrowLeft size={18}/> BACK TO CATALOG</BackBtn>
            <div style={{display:'flex', gap:'15px'}}>
                <button style={{background:'white', padding:'12px', borderRadius:'50%', border:'1px solid #E2E8F0', cursor:'pointer'}}><Share2 size={18} color="#0B397F"/></button>
                <button style={{background:'white', padding:'12px', borderRadius:'50%', border:'1px solid #E2E8F0', cursor:'pointer'}}><Heart size={18} color="#FF4757"/></button>
            </div>
        </HeaderNav>

        {/* Modular Gallery Component */}
        <ImageGallery images={data.images} />

        <LayoutGrid>
          <InfoSection>
            <div style={{display:'flex', gap:'12px', marginBottom:'20px'}}>
                <span style={{background:'#F5A623', color:'#0B397F', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'1px'}}>Verified Luxury</span>
                <span style={{background:'#F1F5F9', color:'#0B397F', padding:'6px 16px', borderRadius:'50px', fontWeight:800, fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'1px'}}>{data.propertyType}</span>
            </div>

            <h1 style={{fontSize:'3.5rem', color:'#0B397F', fontFamily:'Space Grotesk', lineHeight:1.1, marginBottom:'15px', letterSpacing:'-2px'}}>{title}</h1>
            
            <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#64748B', fontWeight:600, marginBottom:'50px'}}>
                <MapPin size={22} color="#F5A623" /> {data.location?.address || "Kigali, Rwanda"}
            </div>

            {/* Dynamic Specification Row */}
            <SpecGrid>
                {data.propertyType !== 'land' ? (
                  <>
                    <SpecItem><Bed color="#0B397F" size={32}/><span>{data.features?.bedrooms || 0} Beds</span></SpecItem>
                    <SpecItem><Bath color="#0B397F" size={32}/><span>{data.features?.bathrooms || 0} Baths</span></SpecItem>
                    <SpecItem><Maximize color="#0B397F" size={32}/><span>{data.features?.size || 0} m²</span></SpecItem>
                  </>
                ) : (
                  <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                    <Trees color="#0B397F" size={45}/>
                    <p style={{fontSize:'1.8rem', fontWeight:800, color:'#0B397F', fontFamily:'Space Grotesk'}}>{data.features?.size || 0} m² TOTAL AREA</p>
                  </div>
                )}
            </SpecGrid>

            <h3 style={{fontFamily:'Space Grotesk', fontSize:'1.8rem', color:'#0B397F', marginBottom:'20px'}}>The Narrative</h3>
            <p style={{fontFamily:'Inter', lineHeight:'2', color:'#475569', fontSize:'1.1rem'}}>{desc}</p>
          </InfoSection>

          <StickySidebar>
            <ActionBox>
                <PriceTag>{new Intl.NumberFormat().format(data.price)} RWF</PriceTag>
                <p style={{color:'#64748B', fontWeight:700, borderBottom:'1px solid #F1F5F9', paddingBottom:'25px', textTransform:'uppercase', fontSize:'0.75rem', letterSpacing:'1px'}}>Asset Listed for {data.type}</p>
                
                <InquiryBtn 
                  $locked={!user} 
                  onClick={handleAction}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                    {user ? <><Mail size={20}/> SEND INQUIRY</> : <><Lock size={18}/> LOGIN TO INQUIRE</>}
                </InquiryBtn>

                <button style={{width:'100%', padding:'18px', borderRadius:'16px', marginTop:'15px', background:'none', border:'2px solid #0B397F', color:'#0B397F', fontWeight:800, fontFamily:'Space Grotesk', textTransform:'uppercase', fontSize:'0.8rem', cursor:'pointer'}}>
                    CALL REPRESENTATIVE
                </button>
            </ActionBox>

            <ActionBox style={{background:'#0B397F', color:'white', border:'none'}}>
                <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
                    <ShieldCheck color="#F5A623" size={45} />
                    <div>
                        <p style={{fontWeight:800, fontFamily:'Space Grotesk', letterSpacing:'1px', fontSize:'0.9rem'}}>AI INSPECTED</p>
                        <p style={{fontSize:'0.85rem', opacity:0.7, marginTop:'5px', lineHeight:'1.5'}}>Market value and legal authenticity verified by Kimelia Intelligence Unit.</p>
                    </div>
                </div>
            </ActionBox>
          </StickySidebar>
        </LayoutGrid>
      </Container>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {showModal && (
            <InquiryModal 
            property={data} // Passes entire property object for context
            onClose={() => setShowModal(false)} 
            />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default PropertyDetail;