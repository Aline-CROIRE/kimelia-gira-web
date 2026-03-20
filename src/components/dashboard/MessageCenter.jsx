import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MessageCircle, Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import API from '../../services/api';

const MessageList = styled.div`
  display: flex; flex-direction: column; gap: 15px;
`;

const MessageCard = styled.div`
  background: white; padding: 25px; border-radius: 20px;
  border: 1px solid #E2E8F0; display: flex; justify-content: space-between;
  align-items: center; transition: 0.3s;
  &:hover { border-color: #0B397F; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 15px; }
`;

const MessageCenter = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        // This hits the backend route we created in Phase 1
        const res = await API.get('/interactions/inquiry/me');
        setMessages(res.data.data || []);
      } catch (err) { console.error("Inquiry fetch failed"); }
      finally { setLoading(false); }
    };
    fetchInquiries();
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}><Loader2 className="animate-spin" color="#0B397F" /></div>;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', color: '#0B397F', fontSize: '2.2rem', marginBottom: '30px' }}>Inquiry Center</h2>
      
      {messages.length === 0 ? (
        <div style={{ background: 'white', padding: '60px', borderRadius: '24px', textAlign: 'center', border: '2px dashed #E2E8F0' }}>
            <MessageCircle size={40} color="#CBD5E1" style={{marginBottom:'15px'}} />
            <p style={{ color: '#64748B', fontWeight: 600 }}>No active inquiries at the moment.</p>
        </div>
      ) : (
        <MessageList>
          {messages.map(msg => (
            <MessageCard key={msg._id}>
              <div style={{ display:'flex', gap:'20px', alignItems:'center' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#F1F5F9', display: 'flex', justifyContent:'center', alignItems:'center', fontWeight:800, color:'#0B397F' }}>
                  {msg.sender?.name?.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontFamily:'Space Grotesk', color:'#0B397F' }}>{msg.sender?.name}</h4>
                  <p style={{ fontSize:'0.85rem', color:'#64748B' }}>Interested in: <strong style={{color:'#F5A623'}}>{msg.property?.title?.en}</strong></p>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <button style={{ background:'#0B397F', color:'white', border:'none', padding:'10px 20px', borderRadius:'10px', fontWeight:700, fontSize:'0.8rem', cursor:'pointer' }}>
                  VIEW MESSAGE
                </button>
              </div>
            </MessageCard>
          ))}
        </MessageList>
      )}
    </div>
  );
};

export default MessageCenter;