import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Maximize, ShieldCheck, Mail, 
  Phone, ArrowLeft, Share2, Heart, Trees, Lock, Loader2 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPropertyById } from '../services/propertyService';
import { AuthContext } from '../context/AuthContext';
import InquiryModal from '../components/InquiryModal';

/* --- STYLED COMPONENTS --- */
const PageWrapper = styled.div`
  padding: 120px 0 80px; 
  background: ${({ theme }) => theme.colors.bgSlate}; 
  min-height: 100vh;
`;

const Container = styled.div` 
  width: 90%; 
  max-width: 1300px; 
  margin: 0 auto; 
`;

const TopNav = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 30px;
`;

const BackBtn = styled.button`
  background: none; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  color: ${({ theme }) => theme.colors.primary}; 
  font-family: 'Space Grotesk'; 
  font-weight: 700; 
  cursor: pointer; 
  transition: 0.3s;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  &:hover { color: ${({ theme }) => theme.colors.secondary}; transform: translateX(-5px); }
`;

/* --- GALLERY ENGINE --- */
const GalleryGrid = styled.div`
  display: grid; 
  grid-template-columns: 2.2fr 1fr; 
  grid-template-rows: 550px; 
  gap: 15px;
  border-radius: 28px; 
  overflow: hidden; 
  margin-bottom: 50px;
  box-shadow: ${({ theme }) => theme.shadows.premium};
  @media (max-width: 900px) { grid-template-columns: 1fr; grid-template-rows: 350px; }
  
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover { filter: brightness(1.1); }
  }
`;

const SideGallery = styled.div`
  display: grid; 
  grid-template-rows: 1fr 1fr; 
  gap: 15px;
  @media (max-width: 900px) { display: none; }
`;

/* --- CONTENT GRID --- */
const MainGrid = styled.div`
  display: grid; 
  grid-template-columns: 1.8fr 1fr; 
  gap: 50px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

const ContentCard = styled.div`
  background: white; 
  border-radius: 32px; 
  padding: 50px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  @media (max-width: 600px) { padding: 30px 20px; }
`;

const Sidebar = styled.div` 
  position: sticky; 
  top: 120px; 
  display: flex; 
  flex-direction: column; 
  gap: 30px; 
`;

const ActionBox = styled.div`
  background: white; 
  border-radius: 32px; 
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border}; 
  box-shadow: ${({ theme }) => theme.shadows.premium};
`;

const PriceDisplay = styled.h2`
  font-family: 'Space Grotesk'; 
  font-size: 2.8rem; 
  color: ${({ theme }) => theme.colors.primary}; 
  margin-bottom: 5px;
  letter-spacing: -0.04em;
`;

const PrimaryBtn = styled(motion.button)`
  width: 100%; 
  padding: 20px; 
  border-radius: 16px; 
  margin-top: 20px;
  background: ${props => props.$locked ? '#94A3B8' : props.theme.gradients.brand};
  color: white; 
  font-family: 'Space Grotesk'; 
  font-weight: 800; 
  text-transform: uppercase; 
  letter-spacing: 1px;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  gap: 12px;
  box-shadow: 0 10px 25px rgba(31, 58, 147, 0.15);
`;

const SpecItem = styled.div`
  text-align: center;
  p { 
    font-family: 'Space Grotesk'; 
    font-weight: 700; 
    color: ${({ theme }) => theme.colors.primary}; 
    margin-top: 12px;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
`;

/* --- MAIN COMPONENT --- */
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
        <Container style={{ textAlign: 'center', paddingTop: '100px' }}>
            <Loader2 size={50} className="animate-spin" color="#1F3A93" style={{ margin: '0 auto' }} />
            <h2 style={{ fontFamily: 'Space Grotesk', marginTop: '20px', color: '#1F3A93' }}>CONSULTING AI PORTFOLIO...</h2>
        </Container>
    </PageWrapper>
  );
  
  if (!data) return (
    <PageWrapper>
        <Container style={{ textAlign: 'center', paddingTop: '100px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk' }}>Sanctuary Not Found</h2>
            <BackBtn onClick={() => navigate('/properties')} style={{ margin: '20px auto' }}>Return to Catalog</BackBtn>
        </Container>
    </PageWrapper>
  );

  const currentTitle = data.title?.[i18n.language] || data.title?.['en'] || "Premium Property";
  const currentDesc = data.description?.[i18n.language] || data.description?.['en'] || "Details being optimized by AI...";
  const images = data.images && data.images.length > 0 ? data.images : ["https://via.placeholder.com/1200x800?text=Kimelia+Gira+Luxury"];

  const handleAction = () => {
    if (!user) navigate('/login');
    else setShowInquiry(true);
  };

  return (
    <PageWrapper>
      <Container>
        <TopNav>
            <BackBtn onClick={() => navigate(-1)}><ArrowLeft size={18}/> BACK TO LISTINGS</BackBtn>
            <div style={{ display: 'flex', gap: '15px' }}>
                <button style={{ background: 'white', padding: '10px', borderRadius: '50%', border: '1px solid #E2E8F0', cursor: 'pointer' }}><Share2 size={20} color="#1F3A93"/></button>
                <button style={{ background: 'white', padding: '10px', borderRadius: '50%', border: '1px solid #E2E8F0', cursor: 'pointer' }}><Heart size={20} color="#FF4757"/></button>
            </div>
        </TopNav>

        {/* Cinematic Gallery Grid */}
        <GalleryGrid>
          <img src={images[0]} alt="Primary View" />
          <SideGallery>
            <img src={images[1] || images[0]} alt="Side View 1" />
            <img src={images[2] || images[0]} alt="Side View 2" />
          </SideGallery>
        </GalleryGrid>

        <MainGrid>
          <ContentCard>
             <div style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
                <span style={{ background: '#FFD700', color: '#1F3A93', padding: '8px 20px', borderRadius: '50px', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {t('prop_verified')}
                </span>
                <span style={{ background: '#F1F5F9', color: '#1F3A93', padding: '8px 20px', borderRadius: '50px', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {data.propertyType}
                </span>
             </div>
             
             <h1 style={{ fontSize: '3.5rem', color: '#1F3A93', fontFamily: 'Space Grotesk', lineHeight: 1, marginBottom: '20px' }}>
                {currentTitle}
             </h1>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '1.1rem', marginBottom: '50px' }}>
                <MapPin size={22} color="#FFD700" /> {data.location?.address || "Kigali, Rwanda"}
             </div>

             {/* Property Specifications Row */}
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', marginBottom: '50px', borderBottom: '1px solid #F1F5F9', paddingBottom: '40px' }}>
                {data.propertyType !== 'land' ? (
                  <>
                    <SpecItem><Bed color="#1F3A93" size={32}/><p>{data.features?.bedrooms || 0} {t('prop_beds')}</p></SpecItem>
                    <SpecItem><Bath color="#1F3A93" size={32}/><p>{data.features?.bathrooms || 0} {t('prop_baths')}</p></SpecItem>
                    <SpecItem><Maximize color="#1F3A93" size={32}/><p>{data.features?.size || 0} {t('prop_area')}</p></SpecItem>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Trees color="#1F3A93" size={45}/>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1F3A93', fontFamily: 'Space Grotesk' }}>
                        {data.features?.size || 0} {t('prop_area')}
                    </p>
                  </div>
                )}
             </div>

             <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#1F3A93', fontFamily: 'Space Grotesk' }}>Architectural Overview</h3>
             <p style={{ lineHeight: '2', color: '#475569', fontSize: '1.1rem', fontFamily: 'Inter' }}>
                {currentDesc}
             </p>
          </ContentCard>

          <Sidebar>
            <ActionBox>
               <PriceDisplay>{new Intl.NumberFormat().format(data.price)} RWF</PriceDisplay>
               <p style={{ color: '#64748B', fontWeight: 700, borderBottom: '1px solid #F1F5F9', paddingBottom: '25px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                Asset Listed for {data.type}
               </p>
               
               <PrimaryBtn 
                 whileHover={{ scale: 1.02 }} 
                 whileTap={{ scale: 0.98 }} 
                 onClick={handleAction} 
                 $locked={!user}
               >
                 {user ? <><Mail size={20}/> {t('prop_inquiry')}</> : <><Lock size={18}/> LOGIN TO INQUIRE</>}
               </PrimaryBtn>

               <button style={{ width: '100%', padding: '18px', borderRadius: '16px', marginTop: '15px', background: 'none', border: '2px solid #1F3A93', color: '#1F3A93', fontWeight: 800, fontFamily: 'Space Grotesk', textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer' }}>
                {t('prop_call')}
               </button>
            </ActionBox>

            <ActionBox style={{ background: '#1F3A93', color: 'white', border: 'none' }}>
               <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <ShieldCheck color="#FFD700" size={40} />
                  <div>
                    <p style={{ fontWeight: 800, fontFamily: 'Space Grotesk', letterSpacing: '1px' }}>{t('prop_ai_inspect')}</p>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '5px', lineHeight: '1.4' }}>{t('prop_ai_desc')}</p>
                  </div>
               </div>
            </ActionBox>
          </Sidebar>
        </MainGrid>
      </Container>

      {/* Inquiry Modal Injection with AnimatePresence */}
      <AnimatePresence>
        {showInquiry && (
            <InquiryModal 
            propertyId={data._id} 
            propertyTitle={currentTitle} 
            onClose={() => setShowInquiry(false)} 
            />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default PropertyDetail;