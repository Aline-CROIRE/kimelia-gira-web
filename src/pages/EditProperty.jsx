import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getPropertyById, updateProperty } from '../services/propertyService';
import { 
  Save, ArrowLeft, Loader2, Info, MapPin, 
  DollarSign, Maximize, Bed, Bath 
} from 'lucide-react';

const PageWrapper = styled.div`
  padding: 140px 8% 80px; background: #F1F5F9; min-height: 100vh;
`;

const FormCard = styled.div`
  background: white; border-radius: 35px; padding: 50px;
  max-width: 800px; margin: 0 auto; border: 1px solid #E2E8F0;
  box-shadow: 0 20px 50px rgba(11, 57, 127, 0.05);
  @media (max-width: 600px) { padding: 30px 20px; }
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
  label { 
    display: flex; align-items: center; gap: 8px; font-family: 'Space Grotesk';
    font-weight: 700; color: #0B397F; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 10px;
  }
  input, textarea {
    width: 100%; padding: 18px; border-radius: 14px; border: 1.5px solid #F1F5F9;
    background: #F8FAFC; font-family: 'Inter'; font-weight: 500; outline: none; transition: 0.3s;
    &:focus { border-color: #0B397F; background: white; }
  }
`;

const UpdateBtn = styled(motion.button)`
  width: 100%; padding: 22px; border-radius: 16px; margin-top: 30px;
  background: ${({ theme }) => theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800;
  text-transform: uppercase; letter-spacing: 2px; border: none; cursor: pointer;
  box-shadow: 0 15px 30px rgba(11, 57, 127, 0.2);
`;

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', address: '', bedrooms: '', bathrooms: '', size: ''
  });

  useEffect(() => {
    getPropertyById(id).then(res => {
      if (res) {
        setFormData({
          title: res.title?.en || '',
          description: res.description?.en || '',
          price: res.price || '',
          address: res.location?.address || '',
          bedrooms: res.features?.bedrooms || 0,
          bathrooms: res.features?.bathrooms || 0,
          size: res.features?.size || ''
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const cleanData = {
          ...formData,
          price: Number(formData.price),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          size: Number(formData.size)
      };
      await updateProperty(id, cleanData);
      navigate('/dashboard'); 
    } catch (err) {
      alert("Update Failed. Check local backend connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <PageWrapper style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Loader2 size={50} className="animate-spin" color="#0B397F"/>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <div style={{maxWidth:800, margin:'0 auto'}}>
        <button onClick={() => navigate(-1)} style={{background:'none', border:'none', color:'#0B397F', fontWeight:800, marginBottom:'30px', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px', fontFamily:'Space Grotesk'}}>
            <ArrowLeft size={18}/> BACK TO PORTFOLIO
        </button>

        <FormCard>
          <h1 style={{fontFamily:'Space Grotesk', color:'#0B397F', fontSize:'2.2rem', marginBottom:'35px'}}>Refine Asset</h1>
          <form onSubmit={handleUpdate}>
            <InputGroup><label><Info size={16}/> Headline</label><input value={formData.title} required onChange={e => setFormData({...formData, title: e.target.value})} /></InputGroup>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
              <InputGroup><label><DollarSign size={16}/> Price</label><input type="number" value={formData.price} required onChange={e => setFormData({...formData, price: e.target.value})} /></InputGroup>
              <InputGroup><label><MapPin size={16}/> Location</label><input value={formData.address} required onChange={e => setFormData({...formData, address: e.target.value})} /></InputGroup>
            </div>
            <InputGroup><label>Deep Narrative</label><textarea rows="6" value={formData.description} required onChange={e => setFormData({...formData, description: e.target.value})} /></InputGroup>
            <UpdateBtn type="submit" disabled={saving}>
              {saving ? "SYNCHRONIZING..." : <><Save size={20}/> UPDATE SANCTUARY</>}
            </UpdateBtn>
          </form>
        </FormCard>
      </div>
    </PageWrapper>
  );
};

export default EditProperty;