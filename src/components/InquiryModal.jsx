import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Phone, Loader2 } from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Overlay = styled(motion.div)`
  position: fixed; inset: 0; background: rgba(10, 15, 30, 0.9);
  backdrop-filter: blur(10px); z-index: 4000;
  display: flex; justify-content: center; align-items: center; padding: 20px;
`;

const ModalCard = styled(motion.div)`
  background: white; width: 100%; max-width: 500px;
  border-radius: 35px; overflow: hidden; position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
`;

const InquiryModal = ({ property, onClose }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ phone: '', message: `I am interested in ${property.title.en}.` });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/interactions/inquiry/send/${property._id}`, formData);
      setSent(true);
      setTimeout(onClose, 3000);
    } catch (err) { alert("Failed to transmit lead."); }
    finally { setLoading(false); }
  };

  return (
    <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ModalCard initial={{ y: 50 }} animate={{ y: 0 }}>
        <button onClick={onClose} style={{ position:'absolute', top:20, right:20, background:'none', border:'none', cursor:'pointer' }}><X color="#0B397F"/></button>
        
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="success" initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ padding: '60px 40px', textAlign: 'center' }}>
              <CheckCircle size={70} color="#16A34A" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontFamily: 'Space Grotesk', color: '#0B397F' }}>Inquiry Secured</h2>
              <p style={{ color: '#64748B', marginTop: '10px' }}>Your professional profile has been shared with the broker.</p>
            </motion.div>
          ) : (
            <div style={{ padding: '40px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', color: '#0B397F', marginBottom: '10px' }}>Elite Inquiry</h2>
              <p style={{ color: '#64748B', marginBottom: '30px', fontSize:'0.9rem' }}>Contacting representative for: <strong>{property.title.en}</strong></p>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:'20px' }}>
                    <label style={{ display:'block', fontWeight:800, fontSize:'0.7rem', color:'#0B397F', marginBottom:'8px' }}>CONTACT PHONE</label>
                    <div style={{ position:'relative' }}>
                        <Phone size={16} style={{ position:'absolute', left:15, top:18, color:'#0B397F', opacity:0.5 }}/>
                        <input required type="tel" placeholder="+250..." 
                            style={{ width:'100%', padding:'16px 16px 16px 45px', borderRadius:'12px', border:'1.5px solid #F1F5F9', background:'#F8FAFC' }}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                </div>

                <div style={{ marginBottom:'25px' }}>
                    <label style={{ display:'block', fontWeight:800, fontSize:'0.7rem', color:'#0B397F', marginBottom:'8px' }}>MESSAGE</label>
                    <textarea rows="4" value={formData.message} required 
                        style={{ width:'100%', padding:'15px', borderRadius:'12px', border:'1.5px solid #F1F5F9', background:'#F8FAFC', outline:'none' }}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                </div>

                <button disabled={loading} style={{ width:'100%', padding:'20px', borderRadius:'15px', border:'none', background:'linear-gradient(135deg, #0B397F 0%, #F5A623 100%)', color:'white', fontWeight:800, fontFamily:'Space Grotesk', cursor:'pointer' }}>
                  {loading ? "SECURING..." : "TRANSMIT LEAD"}
                </button>
              </form>
            </div>
          )}
        </AnimatePresence>
      </ModalCard>
    </Overlay>
  );
};

export default InquiryModal;