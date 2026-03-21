import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Loader2, Inbox, Mail } from 'lucide-react';
import { getMyInquiries } from '../../services/propertyService';
import { AuthContext } from '../../context/AuthContext';

const MessageCenter = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      setLoading(true);
      try {
        const data = await getMyInquiries();
        setMessages(data);
      } catch (err) {
        console.error("Messenger Load Error");
        setMessages([]);
      } finally {
        setLoading(false); // <--- ENSURES LOADING STOPS
      }
    };
    if (user) fetchInbox();
  }, [user]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <Loader2 size={40} className="animate-spin" color="#0B397F" />
      <p style={{ fontFamily: 'Space Grotesk', marginTop: '15px', color: '#0B397F', fontWeight: 700 }}>SYNCHRONIZING SECURE LINE...</p>
    </div>
  );

  return (
    <div style={{ background: 'white', padding: '60px', borderRadius: '30px', textAlign: 'center', border: '2px dashed #E2E8F0' }}>
      {messages.length === 0 ? (
        <>
          <Mail size={50} color="#CBD5E1" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontFamily: 'Space Grotesk', color: '#0B397F' }}>No Leads Found</h3>
          <p style={{ color: '#64748B' }}>When inquiries are submitted for your assets, they will appear here.</p>
        </>
      ) : (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', color: '#0B397F', marginBottom: '30px' }}>Lead Conversations ({messages.length})</h2>
            <p>You have {messages.length} active threads.</p>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;