import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Phone } from 'lucide-react';
import { createInquiry } from '../services/propertyService';
import { AuthContext } from '../context/AuthContext';

const Overlay = styled(motion.div)`
  position: fixed; inset: 0; background: rgba(10, 15, 30, 0.9);
  backdrop-filter: blur(10px); z-index: 4000;
  display: flex; justify-content: center; align-items: center; padding: 20px;
`;

const ModalCard = styled(motion.div)`
  background: white; width: 100%; max-width: 480px;
  border-radius: 35px; overflow: hidden; position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
`;

const FormPadding = styled.div` padding: 45px; `;

const InputGroup = styled.div`
  margin-bottom: 20px;
  label { display: block; margin-bottom: 8px; font-weight: 800; color: #0B397F; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; font-family: 'Space Grotesk'; }
  .field {
    position: relative;
    input, textarea {
        width: 100%; padding: 16px 16px 16px 45px; border-radius: 12px; border: 1.5px solid #F1F5F9;
        background: #F8FAFC; font-family: 'Inter'; font-size: 0.95rem; outline: none; transition: 0.3s;
        &:focus { border-color: #F5A623; background: white; }
    }
    textarea { padding: 16px; resize: none; }
    svg { position: absolute; left: 15px; top: 18px; color: #0B397F; opacity: 0.4; }
  }
`;

const SubmitBtn = styled.button`
  width: 100%; padding: 20px; border-radius: 16px; border: none;
  background: ${({ theme }) => theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800;
  text-transform: uppercase; cursor: pointer; display: flex;
  justify-content: center; align-items: center; gap: 12px;
  box-shadow: 0 10px 25px rgba(11, 57, 127, 0.2);
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const InquiryModal = ({ property, onClose }) => {
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Greetings, I am interested in exploring this sanctuary.`);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createInquiry(property._id, message, phone);
      if (res.data.success) {
        setSent(true);
        setTimeout(onClose, 3000);
      }
    } catch (err) {
      alert("Submission Error: Verify all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ModalCard initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
        <button onClick={onClose} style={{ position:'absolute', top:25, right:25, background:'none', border:'none', cursor:'pointer' }}><X size={22} color="#0B397F"/></button>
        
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="success" initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ padding: '60px 40px', textAlign: 'center' }}>
              <CheckCircle size={70} color="#16A34A" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontFamily: 'Space Grotesk', color: '#0B397F' }}>Lead Transmitted</h2>
              <p style={{ color: '#64748B', marginTop: '10px', fontFamily: 'Inter' }}>Your request has been prioritized.</p>
            </motion.div>
          ) : (
            <FormPadding key="form">
              <h2 style={{ fontFamily: 'Space Grotesk', color: '#0B397F', marginBottom: '30px' }}>Elite Inquiry</h2>
              
              <form onSubmit={handleSubmit}>
                <InputGroup>
                  <label>Contact Phone</label>
                  <div className="field">
                    <Phone size={18} />
                    <input type="tel" required placeholder="+250..." value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </InputGroup>
                <InputGroup>
                  <label>Message</label>
                  <div className="field">
                    <textarea rows="4" value={message} onChange={e => setMessage(e.target.value)} required />
                  </div>
                </InputGroup>
                <SubmitBtn type="submit" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={20}/> : <><Send size={18}/> SEND INQUIRY</>}
                </SubmitBtn>
              </form>
            </FormPadding>
          )}
        </AnimatePresence>
      </ModalCard>
    </Overlay>
  );
};

export default InquiryModal;