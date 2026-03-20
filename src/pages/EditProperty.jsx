import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getPropertyById, updateProperty } from '../services/propertyService';
import { 
  Save, ArrowLeft, Loader2, Info, MapPin, 
  DollarSign, Maximize, Bed, Bath, Sparkles 
} from 'lucide-react';

/* --- STYLED COMPONENTS --- */
const PageWrapper = styled.div`
  padding: 140px 8% 80px; 
  background: ${({ theme }) => theme.colors.bgSlate}; 
  min-height: 100vh;
`;

const Container = styled.div` 
  width: 90%; 
  max-width: 800px; 
  margin: 0 auto; 
`;

const FormCard = styled.div`
  background: white; 
  border-radius: 35px; 
  padding: 50px;
  border: 1px solid ${({ theme }) => theme.colors.border}; 
  box-shadow: ${({ theme }) => theme.shadows.premium};
  @media (max-width: 600px) { padding: 30px 20px; }
`;

const HeaderArea = styled.div`
  margin-bottom: 40px;
  h1 { 
    font-family: 'Space Grotesk'; 
    font-size: 2.5rem; 
    color: ${({ theme }) => theme.colors.primary}; 
    margin-bottom: 10px; 
    letter-spacing: -1px; 
  }
  p { color: ${({ theme }) => theme.colors.textMuted}; font-weight: 500; }
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
  label { 
    display: flex; 
    align-items: center; 
    gap: 8px; 
    font-family: 'Space Grotesk';
    font-weight: 700; 
    color: ${({ theme }) => theme.colors.primary}; 
    font-size: 0.8rem; 
    text-transform: uppercase; 
    margin-bottom: 10px;
  }
  input, select, textarea {
    width: 100%; 
    padding: 18px; 
    border-radius: 14px; 
    border: 1.5px solid ${({ theme }) => theme.colors.bgSlate};
    background: ${({ theme }) => theme.colors.bgElevated}; 
    font-family: 'Inter'; 
    font-weight: 500; 
    outline: none; 
    transition: 0.3s;
    &:focus { 
        border-color: ${({ theme }) => theme.colors.primary}; 
        background: white;
        box-shadow: 0 0 0 4px rgba(11, 57, 127, 0.05);
    }
  }
`;

const Grid = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const UpdateBtn = styled(motion.button)`
  width: 100%; 
  padding: 22px; 
  border-radius: 16px; 
  margin-top: 30px;
  background: ${({ theme }) => theme.gradients.brand};
  color: white; 
  font-family: 'Space Grotesk'; 
  font-weight: 800;
  text-transform: uppercase; 
  letter-spacing: 2px; 
  border: none; 
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(11, 57, 127, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

/* --- MAIN COMPONENT --- */
const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    price: '', 
    address: '', 
    bedrooms: '', 
    bathrooms: '', 
    size: '',
    type: 'sale',
    propertyType: 'house'
  });

  useEffect(() => {
    // Fetch existing data to fill the form
    getPropertyById(id).then(res => {
      if (res) {
        setFormData({
          title: res.title?.en || '',
          description: res.description?.en || '',
          price: res.price || '',
          address: res.location?.address || '',
          bedrooms: res.features?.bedrooms || 0,
          bathrooms: res.features?.bathrooms || 0,
          size: res.features?.size || '',
          type: res.type || 'sale',
          propertyType: res.propertyType || 'house'
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    // CRITICAL: Ensure all numerical values are sent as Numbers, not Strings
    const cleanData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        size: Number(formData.size)
    };

    try {
      await updateProperty(id, cleanData);
      navigate('/dashboard'); // Go back to dashboard on success
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update listing.";
      alert("ERROR: " + errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <PageWrapper>
        <Container style={{textAlign: 'center', paddingTop: '100px'}}>
            <Loader2 size={40} className="animate-spin" color="#0B397F" style={{margin: '0 auto'}}/>
            <h2 style={{fontFamily:'Space Grotesk', marginTop: '20px'}}>Syncing Metadata...</h2>
        </Container>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <Container>
        <button 
            onClick={() => navigate(-1)} 
            style={{background:'none', border:'none', color:'#0B397F', fontWeight:800, marginBottom:'30px', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px', fontFamily:'Space Grotesk'}}
        >
            <ArrowLeft size={18}/> BACK TO PORTFOLIO
        </button>

        <FormCard>
          <HeaderArea>
            <h1>Refine Asset</h1>
            <p>Update the technical and financial parameters of your sanctuary.</p>
          </HeaderArea>

          <form onSubmit={handleUpdate}>
            <InputGroup>
              <label><Info size={16} color="#F5A623"/> Listing Headline</label>
              <input 
                value={formData.title} 
                required 
                placeholder="e.g. Modern Villa in Nyarutarama"
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </InputGroup>

            <Grid>
              <InputGroup>
                <label><DollarSign size={16} color="#F5A623"/> Valuation (RWF)</label>
                <input 
                    type="number" 
                    value={formData.price} 
                    required 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                />
              </InputGroup>
              <InputGroup>
                <label><MapPin size={16} color="#F5A623"/> Physical Address</label>
                <input 
                    value={formData.address} 
                    required 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                />
              </InputGroup>
            </Grid>

            <InputGroup>
              <label>Architectural Narrative</label>
              <textarea 
                rows="6" 
                value={formData.description} 
                required 
                placeholder="Tell the story of this property..."
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </InputGroup>

            <Grid>
                <InputGroup>
                    <label><Bed size={16} color="#F5A623"/> Bedrooms</label>
                    <input 
                        type="number" 
                        value={formData.bedrooms} 
                        onChange={e => setFormData({...formData, bedrooms: e.target.value})} 
                    />
                </InputGroup>
                <InputGroup>
                    <label><Bath size={16} color="#F5A623"/> Bathrooms</label>
                    <input 
                        type="number" 
                        value={formData.bathrooms} 
                        onChange={e => setFormData({...formData, bathrooms: e.target.value})} 
                    />
                </InputGroup>
            </Grid>

            <InputGroup>
                <label><Maximize size={16} color="#F5A623"/> Surface Area (m²)</label>
                <input 
                    type="number" 
                    value={formData.size} 
                    required 
                    onChange={e => setFormData({...formData, size: e.target.value})} 
                />
            </InputGroup>

            <UpdateBtn 
                type="submit" 
                disabled={saving} 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
            >
              {saving ? (
                <><Loader2 size={22} className="animate-spin"/> SYNCHRONIZING...</>
              ) : (
                <><Save size={20}/> UPDATE SANCTUARY</>
              )}
            </UpdateBtn>
          </form>
        </FormCard>
      </Container>
    </PageWrapper>
  );
};

export default EditProperty;