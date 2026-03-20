import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, MapPin, Info, Maximize, UploadCloud, Loader2, AlertCircle, CheckCircle, X, Image as ImageIcon
} from 'lucide-react';
import API from '../services/api';

const Page = styled.div`
  padding: 130px 8% 80px; background: #F1F5F9; min-height: 100vh;
`;

const FormCard = styled.div`
  background: white; border-radius: 32px; padding: 50px;
  max-width: 900px; margin: 0 auto; border: 1px solid #E2E8F0;
  box-shadow: ${props => props.theme.shadows.premium};
  @media (max-width: 600px) { padding: 30px 20px; }
`;

const SectionTitle = styled.h3`
  font-family: 'Space Grotesk'; font-size: 1rem; color: #1F3A93;
  margin-bottom: 25px; display: flex; align-items: center; gap: 10px;
  border-bottom: 1px solid #F1F5F9; padding-bottom: 15px;
  text-transform: uppercase; letter-spacing: 2px;
`;

const InputGroup = styled.div`
  display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;
  label { font-weight: 700; color: #1F3A93; font-size: 0.75rem; font-family: 'Space Grotesk'; text-transform: uppercase; }
  input, select, textarea {
    padding: 16px; border-radius: 12px; border: 1.5px solid #F1F5F9;
    background: #F8FAFC; font-family: 'Inter'; outline: none; transition: 0.3s;
    font-size: 0.95rem;
    &:focus { border-color: #3B5BDB; background: white; }
  }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

/* --- MULTI-IMAGE UPLOADER & PREVIEW --- */
const UploaderArea = styled.div`
  border: 2px dashed #CBD5E1; padding: 40px; border-radius: 24px;
  text-align: center; background: #F8FAFC; cursor: pointer; transition: 0.3s;
  margin-bottom: 20px;
  &:hover { border-color: #3B5BDB; background: #EEF2FF; }
`;

const PreviewGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px;
  margin-top: 20px;
`;

const PreviewCard = styled(motion.div)`
  height: 120px; border-radius: 12px; overflow: hidden; position: relative;
  border: 1px solid #E2E8F0;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const RemoveBtn = styled.button`
  position: absolute; top: 5px; right: 5px; background: rgba(255,0,0,0.8);
  color: white; width: 24px; height: 24px; border-radius: 50%;
  display: flex; justify-content: center; align-items: center;
`;

const PublishBtn = styled(motion.button)`
  width: 100%; padding: 22px; border-radius: 16px; margin-top: 40px;
  background: ${props => props.theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800;
  text-transform: uppercase; letter-spacing: 2px; border: none; cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', type: 'sale',
    propertyType: 'house', address: '', bedrooms: '0', bathrooms: '0', size: '',
    lat: '-1.9441', lng: '30.0619' 
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
        return alert("Maximum 5 images allowed for elite listings.");
    }
    
    setImages(prev => [...prev, ...files]);

    // Create local URLs for immediate preview
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return setError("Please upload at least one image.");

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    images.forEach(img => data.append('images', img));

    try {
      await API.post('/properties', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/dashboard');
    } catch (err) {
      setError("Failed to publish. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3rem', color: '#1F3A93', fontFamily: 'Space Grotesk' }}>List Your Asset</h1>
          <p style={{ color: '#64748B', fontWeight: 500 }}>Our AI will optimize your listing for elite visibility.</p>
        </div>

        <FormCard>
          {error && <div style={{background:'#FEE2E2', color:'#B91C1C', padding:'15px', borderRadius:'12px', marginBottom:'20px'}}><AlertCircle size={18}/> {error}</div>}

          <form onSubmit={handleSubmit}>
            <SectionTitle><Info size={18} color="#FFD700"/> Basic Information</SectionTitle>
            <InputGroup>
              <label>Headline</label>
              <input required placeholder="e.g. Modern Villa in Nyarutarama" onChange={e => setFormData({...formData, title: e.target.value})}/>
            </InputGroup>

            <Grid>
                <InputGroup><label>Listing Mode</label><select onChange={e => setFormData({...formData, type: e.target.value})}><option value="sale">For Sale</option><option value="rent">For Rent</option></select></InputGroup>
                <InputGroup><label>Asset Type</label><select onChange={e => setFormData({...formData, propertyType: e.target.value})}><option value="house">House</option><option value="apartment">Apartment</option><option value="land">Land</option></select></InputGroup>
            </Grid>

            <InputGroup>
                <label>Price (RWF)</label>
                <input type="number" required placeholder="55,000,000" onChange={e => setFormData({...formData, price: e.target.value})}/>
            </InputGroup>

            <InputGroup>
              <label>Description</label>
              <textarea rows="6" required placeholder="Enter in any language, AI will handle translation..." onChange={e => setFormData({...formData, description: e.target.value})}/>
            </InputGroup>

            <SectionTitle><Maximize size={18} color="#FFD700"/> Specifications</SectionTitle>
            <Grid>
                <InputGroup><label>Bedrooms</label><input type="number" placeholder="0" onChange={e => setFormData({...formData, bedrooms: e.target.value})}/></InputGroup>
                <InputGroup><label>Size (m²)</label><input type="number" required placeholder="350" onChange={e => setFormData({...formData, size: e.target.value})}/></InputGroup>
            </Grid>

            <SectionTitle><Camera size={18} color="#FFD700"/> Visual Assets</SectionTitle>
            <input type="file" multiple id="file" hidden onChange={handleImageChange} accept="image/*" />
            <UploaderArea onClick={() => document.getElementById('file').click()}>
                <UploadCloud size={40} color="#1F3A93" style={{opacity:0.3, marginBottom:'10px'}}/>
                <p style={{fontWeight:800, color:'#1F3A93', fontFamily:'Space Grotesk'}}>UPLOAD MULTIPLE PHOTOS</p>
                <p style={{fontSize:'0.75rem', color:'#64748B', marginTop:'5px'}}>Select up to 5 high-resolution images</p>
            </UploaderArea>

            <PreviewGrid>
              {previews.map((url, i) => (
                <PreviewCard key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <img src={url} alt="preview" />
                  <RemoveBtn type="button" onClick={() => removeImage(i)}><X size={14}/></RemoveBtn>
                </PreviewCard>
              ))}
            </PreviewGrid>

            <PublishBtn type="submit" disabled={loading} whileHover={{scale:1.01}} whileTap={{scale:0.99}}>
              {loading ? <><Loader2 size={22} className="animate-spin" style={{marginRight:'12px'}}/> AI OPTIMIZING...</> : "Publish to Marketplace"}
            </PublishBtn>
          </form>
        </FormCard>
      </motion.div>
    </Page>
  );
};

export default AddProperty;