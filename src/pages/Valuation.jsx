import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Zap, ShieldCheck, TrendingUp, Search, 
  Home, MapPin, Maximize, Bed, Bath, Sparkles, RefreshCcw, FileText
} from 'lucide-react';
import API from '../services/api';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 120px 5% 80px;
  background-color: #F8FAFC;
  display: flex;
  justify-content: center;
`;

const MainGrid = styled.div`
  width: 100%;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

/* --- FORM STYLING --- */
const FormContainer = styled(motion.div)`
  background: white;
  padding: 45px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  border: 1px solid #F1F5F9;
`;

const TitleArea = styled.div`
  margin-bottom: 35px;
  h1 { font-size: 2.5rem; color: #1F3A93; margin-bottom: 8px; font-weight: 800; }
  p { color: #64748B; font-size: 1.1rem; }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  label { 
    display: flex; align-items: center; gap: 8px;
    font-weight: 700; color: #1F3A93; font-size: 0.9rem; margin-bottom: 10px;
  }
  input, select {
    width: 100%; padding: 16px; border-radius: 12px;
    border: 2px solid #F1F5F9; background: #F8FAFC;
    font-size: 1rem; font-weight: 500; transition: 0.3s;
    &:focus { border-color: #FFD700; background: white; outline: none; }
  }
`;

const DoubleField = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

/* THE ACTION BUTTON (IMPROVED) */
const MainActionBtn = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #1F3A93, #FFD700);
  color: white;
  padding: 22px;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex; justify-content: center; align-items: center; gap: 12px;
  box-shadow: 0 15px 35px rgba(31, 58, 147, 0.25);
  margin-top: 20px;
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

/* --- RESULT CARD STYLING (IMPROVED & RESPONSIVE) --- */
const ResultSide = styled.div`
  display: flex; flex-direction: column; gap: 25px;
  position: sticky; top: 120px;
`;

const CertificateCard = styled(motion.div)`
  background: #1F3A93;
  color: white;
  padding: 45px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(31, 58, 147, 0.3);
  
  &::before {
    content: ''; position: absolute; top: -100px; right: -100px;
    width: 300px; height: 300px; background: #FFD700; opacity: 0.1; border-radius: 50%;
  }
`;

const SummaryPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SummaryItem = styled.div`
  font-size: 0.85rem;
  span { display: block; opacity: 0.6; margin-bottom: 4px; }
  strong { color: #FFD700; font-weight: 700; }
`;

const PriceTag = styled.div`
  text-align: center;
  margin: 30px 0;
  span { color: #FFD700; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; font-size: 0.9rem; }
  h2 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin: 10px 0; }
`;

const ConfidenceBadge = styled.div`
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
  padding: 10px 20px;
  border-radius: 100px;
  font-weight: 700;
  width: fit-content;
  margin: 0 auto;
`;

const Valuation = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    propertyType: 'house',
    size: 150,
    bedrooms: 3,
    bathrooms: 2,
    locationFactor: 1.0,
    condition: 'good'
  });

  const runAI = async () => {
    setLoading(true);
    try {
      const res = await API.post('/valuation/estimate', {
        ...formData,
        language: i18n.language
      });
      setResult(res.data.data);
    } catch (err) {
      alert("Error calculating valuation.");
    }
    setLoading(false);
  };

  return (
    <PageWrapper>
      <MainGrid>
        {/* LEFT: FORM COMMAND CENTER */}
        <FormContainer initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <TitleArea>
            <h1>{t('val_title')}</h1>
            <p>{t('val_subtitle')}</p>
          </TitleArea>

          <InputGroup>
            <label><Home size={18} color="#FFD700"/> {t('val_type')}</label>
            <select value={formData.propertyType} onChange={(e) => setFormData({...formData, propertyType: e.target.value})}>
              <option value="house">Modern House / Villa</option>
              <option value="apartment">Luxury Apartment</option>
              <option value="land">Prime Land</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </InputGroup>

          <DoubleField>
            <InputGroup>
              <label><Maximize size={18} color="#FFD700"/> {t('val_size')}</label>
              <input type="number" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
            </InputGroup>
            <InputGroup>
              <label><Bed size={18} color="#FFD700"/> {t('val_rooms')}</label>
              <input type="number" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />
            </InputGroup>
          </DoubleField>

          <DoubleField>
            <InputGroup>
              <label><Bath size={18} color="#FFD700"/> {t('val_bathrooms')}</label>
              <input type="number" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} />
            </InputGroup>
            <InputGroup>
              <label><MapPin size={18} color="#FFD700"/> {t('val_location')}</label>
              <select value={formData.locationFactor} onChange={(e) => setFormData({...formData, locationFactor: e.target.value})}>
                <option value="1.5">{t('val_prime')}</option>
                <option value="1.0">{t('val_urban')}</option>
                <option value="0.7">{t('val_rural')}</option>
              </select>
            </InputGroup>
          </DoubleField>

          <InputGroup>
            <label><Sparkles size={18} color="#FFD700"/> {t('val_condition')}</label>
            <select value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})}>
              <option value="new">{t('val_cond_new')}</option>
              <option value="good">{t('val_cond_good')}</option>
              <option value="old">{t('val_cond_old')}</option>
            </select>
          </InputGroup>

          <MainActionBtn 
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(31, 58, 147, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={runAI}
            disabled={loading}
          >
            {loading ? <RefreshCcw className="animate-spin" /> : <><Zap size={24} /> {t('val_btn')}</>}
          </MainActionBtn>
        </FormContainer>

        {/* RIGHT: LIVE RESULT & SUMMARY */}
        <ResultSide>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '100px 20px', color: '#64748B' }}
              >
                <Search size={60} style={{ marginBottom: '20px', opacity: 0.2 }} />
                <h3>Ready to Valuate?</h3>
                <p>Fill the form and hit the gradient button to see the AI magic.</p>
              </motion.div>
            ) : (
              <CertificateCard 
                key="result"
                initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                  <FileText size={30} color="#FFD700" />
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Report ID: #KG-{Math.floor(Math.random()*9000)}</span>
                </div>

                {/* THE INPUT SUMMARY SECTION */}
                <SummaryPanel>
                  <SummaryItem><span>Type</span><strong>{formData.propertyType.toUpperCase()}</strong></SummaryItem>
                  <SummaryItem><span>Total Area</span><strong>{formData.size} m²</strong></SummaryItem>
                  <SummaryItem><span>Bed / Bath</span><strong>{formData.bedrooms} / {formData.bathrooms}</strong></SummaryItem>
                  <SummaryItem><span>Condition</span><strong>{formData.condition.toUpperCase()}</strong></SummaryItem>
                </SummaryPanel>

                <PriceTag>
                  <span>{t('val_result')}</span>
                  <h2>{new Intl.NumberFormat(i18n.language, { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 }).format(result.estimatedPrice)}</h2>
                </PriceTag>

                <ConfidenceBadge>
                  <ShieldCheck size={20} />
                  {t('val_confidence')}: {result.confidenceScore}%
                </ConfidenceBadge>

                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                   <div style={{ opacity: 0.7 }}>Min: {new Intl.NumberFormat().format(result.lowEstimate)}</div>
                   <div style={{ opacity: 0.7 }}>Max: {new Intl.NumberFormat().format(result.highEstimate)}</div>
                </div>

                <motion.button 
                  onClick={() => setResult(null)}
                  style={{ background: 'white', color: '#1F3A93', width: '100%', padding: '15px', borderRadius: '12px', marginTop: '30px', fontWeight: 'bold' }}
                  whileHover={{ scale: 1.03 }}
                >
                  New Estimation
                </motion.button>
              </CertificateCard>
            )}
          </AnimatePresence>
        </ResultSide>
      </MainGrid>
    </PageWrapper>
  );
};

export default Valuation;