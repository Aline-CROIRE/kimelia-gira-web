import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Overlay = styled(motion.div)`
  position: fixed; inset: 0; background: rgba(10, 15, 30, 0.85);
  backdrop-filter: blur(10px); z-index: 3000;
  display: flex; justify-content: center; align-items: center; padding: 20px;
`;

const ModalCard = styled(motion.div)`
  background: white; width: 100%; max-width: 480px;
  border-radius: 32px; padding: 45px; position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
`;

const CloseBtn = styled.button`
  position: absolute; top: 25px; right: 25px; background: #F8FAFC;
  width: 40px; height: 40px; border-radius: 50%; display: flex;
  justify-content: center; align-items: center; color: #1F3A93;
  &:hover { background: #FFD700; transform: rotate(90deg); }
`;

const FormTitle = styled.h2`
  font-family: 'Space Grotesk'; font-size: 1.8rem; color: #1F3A93; margin-bottom: 8px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  label { display: block; margin-bottom: 10px; font-weight: 800; color: #1F3A93; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
  textarea {
    width: 100%; padding: 18px; border-radius: 14px; border: 1.5px solid #F1F5F9;
    background: #F8FAFC; font-family: 'Inter'; font-size: 0.95rem; outline: none; transition: 0.3s;
    resize: none;
    &:focus { border-color: #3B5BDB; background: white; }
  }
`;

const SubmitBtn = styled.button`
  width: 100%; padding: 20px; border-radius: 16px;
  background: ${({ theme }) => theme.gradients.brand};
  color: white; font-family: 'Space Grotesk'; font-weight: 800;
  text-transform: uppercase; display: flex; justify-content: center;
  align-items: center; gap: 10px; margin-top: 10px;
`;

const InquiryModal = ({ propertyId, propertyTitle, onClose }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(`Greetings, I am interested in exploring ${propertyTitle}.`);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // FIX: Use useEffect for side effects like closing the modal if user is missing
  useEffect(() => {
    if (!user) {
      onClose();
    }
  }, [user, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/interactions/inquiry/${propertyId}`, { message });
      setSent(true);
      setTimeout(onClose, 3000);
    } catch (err) {
      alert("System Error: Inquiry could not be processed.");
    } finally {
      setLoading(false);
    }
  };

  // If user is null, return null to avoid rendering anything during redirect
  if (!user) return null;

  return (
    <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ModalCard initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}>
        <CloseBtn onClick={onClose}><X size={20}/></CloseBtn>
        
        {sent ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
              <CheckCircle size={80} color="#22C55E" style={{ marginBottom: '25px' }} />
            </motion.div>
            <FormTitle>Inquiry Submitted</FormTitle>
            <p style={{ color: '#64748B', marginTop: '10px', fontFamily: 'Inter' }}>Our elite representative will contact you via email shortly.</p>
          </div>
        ) : (
          <>
            <FormTitle>Elite Inquiry</FormTitle>
            <p style={{ color: '#64748B', marginBottom: '35px', fontSize: '0.9rem', fontFamily: 'Inter' }}>
                Inquiring as: <strong style={{ color: '#1F3A93' }}>{user.name}</strong>
            </p>
            
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <label>Your Message</label>
                <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required />
              </InputGroup>
              <SubmitBtn type="submit" disabled={loading}>
                {loading ? "Processing..." : <><Send size={18}/> Send Inquiry</>}
              </SubmitBtn>
            </form>
          </>
        )}
      </ModalCard>
    </Overlay>
  );
};

export default InquiryModal;