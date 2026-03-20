import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
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
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute; top: 25px; right: 25px; background: #F8FAFC;
  width: 40px; height: 40px; border-radius: 50%; display: flex;
  justify-content: center; align-items: center; color: #0B397F;
  &:hover { background: #FFD700; transform: rotate(90deg); }
  transition: 0.3s;
`;

const FormTitle = styled.h2`
  font-family: 'Space Grotesk'; font-size: 1.8rem; color: #0B397F; margin-bottom: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px; text-align: left;
  label { display: block; margin-bottom: 10px; font-weight: 800; color: #0B397F; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
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
  align-items: center; gap: 10px; margin-top: 10px; border: none; cursor: pointer;
  box-shadow: 0 10px 25px rgba(11, 57, 127, 0.2);
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const SuccessIcon = styled(motion.div)`
  width: 80px; height: 80px; background: #DCFCE7; color: #166534;
  border-radius: 50%; display: flex; justify-content: center; align-items: center;
  margin: 0 auto 25px;
`;

const InquiryModal = ({ propertyId, propertyTitle, onClose }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(`Greetings, I am interested in exploring ${propertyTitle}.`);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Security check: close if user session expires
  useEffect(() => {
    if (!user) onClose();
  }, [user, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to the backend we built in Phase 1
      await API.post(`/interactions/inquiry/${propertyId}`, { message });
      
      // TRIGGER SUCCESS STATE
      setSent(true);

      // AUTO-CLOSE after 3 seconds so user can keep browsing
      setTimeout(() => {
        onClose();
      }, 3500);

    } catch (err) {
      alert("System Error: Inquiry could not be processed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ModalCard 
        initial={{ scale: 0.9, y: 30 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.9, y: 30 }}
      >
        <CloseBtn onClick={onClose}><X size={20}/></CloseBtn>
        
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '20px 0' }}
            >
              <SuccessIcon 
                initial={{ rotate: -45, scale: 0 }} 
                animate={{ rotate: 0, scale: 1 }} 
                transition={{ type: 'spring', damping: 12 }}
              >
                <CheckCircle size={45} />
              </SuccessIcon>
              <FormTitle style={{ color: '#166534' }}>Inquiry Sent</FormTitle>
              <p style={{ color: '#64748B', marginTop: '10px', fontFamily: 'Inter', fontWeight: 500 }}>
                Your request has been prioritized. An elite representative will contact you shortly.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }}>
              <FormTitle>Elite Inquiry</FormTitle>
              <p style={{ color: '#64748B', marginBottom: '35px', fontSize: '0.9rem', fontFamily: 'Inter', fontWeight: 500 }}>
                  Signed in as: <strong style={{ color: '#0B397F' }}>{user?.name}</strong>
              </p>
              
              <form onSubmit={handleSubmit}>
                <InputGroup>
                  <label>Personal Message to Broker</label>
                  <textarea 
                    rows="5" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                    placeholder="Provide details about your interest..."
                  />
                </InputGroup>
                <SubmitBtn type="submit" disabled={loading}>
                  {loading ? (
                    <><Loader2 size={20} className="animate-spin" /> Processing...</>
                  ) : (
                    <><Send size={18}/> Send Inquiry</>
                  )}
                </SubmitBtn>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalCard>
    </Overlay>
  );
};

export default InquiryModal;