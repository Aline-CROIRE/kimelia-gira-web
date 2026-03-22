import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, MapPin, Loader2, Phone, Trash2, XCircle } from 'lucide-react';
import { getMyInquiries, sendReply, purgeChat, revokeMessage, markAsRead } from '../../services/propertyService';
import { AuthContext } from '../../context/AuthContext';

const MessengerLayout = styled.div`
  display: grid; grid-template-columns: 320px 1fr; height: calc(100vh - 220px); 
  background: white; border-radius: 30px; overflow: hidden; border: 1px solid #E2E8F0;
`;

const ContactCard = styled.div`
  padding: 20px 25px; border-bottom: 1px solid #F1F5F9; cursor: pointer;
  background: ${props => props.$active ? 'white' : 'transparent'};
  border-left: 5px solid ${props => props.$active ? '#0B397F' : '#F1F5F9'};
`;

const BubbleWrapper = styled.div`
  display: flex; flex-direction: column; align-self: ${props => props.$isMe ? 'flex-end' : 'flex-start'};
  max-width: 75%; position: relative;
`;

const RevokeBtn = styled.button`
  position: absolute; top: -10px; right: -10px; background: #EF4444; color: white;
  width: 22px; height: 22px; border-radius: 50%; display: flex; justify-content: center;
  align-items: center; border: none; cursor: pointer; opacity: 0; transition: 0.2s;
  ${BubbleWrapper}:hover & { opacity: 1; }
`;

const Bubble = styled(motion.div)`
  padding: 14px 20px; border-radius: 20px; font-size: 0.95rem; font-family: 'Inter';
  background: ${props => props.$isMe ? '#0B397F' : '#F1F5F9'};
  color: ${props => props.$isMe ? 'white' : '#1E293B'};
  border-bottom-right-radius: ${props => props.$isMe ? '4px' : '20px'};
  border-bottom-left-radius: ${props => props.$isMe ? '20px' : '4px'};
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
`;

const MessageCenter = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  const loadInbox = async () => {
    const data = await getMyInquiries();
    setChats(data);
    if (selected) {
        const fresh = data.find(c => c._id === selected._id);
        setSelected(fresh || null);
    }
  };

  useEffect(() => { loadInbox().then(() => setLoading(false)); }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [selected?.conversation]);

  const handleReply = async () => {
    if (!text.trim() || !selected) return;
    try {
      await sendReply(selected._id, text);
      setText('');
      await loadInbox(); // REACTIVE UPDATE
    } catch (err) { console.error(err); }
  };

  const handleRevoke = async (msgId) => {
    if (window.confirm("Revoke this message?")) {
        await revokeMessage(selected._id, msgId);
        await loadInbox(); // REACTIVE UPDATE
    }
  };

  const handlePurge = async () => {
    if (window.confirm("Clear this chat for you?")) {
        await purgeChat(selected._id);
        setSelected(null);
        await loadInbox();
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'100px'}}><Loader2 className="animate-spin" color="#0B397F" size={40}/></div>;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', color: '#0B397F', marginBottom: '25px' }}>Lead Center</h2>
      <MessengerLayout>
        <div style={{ background:'#F8FAFC', borderRight:'1px solid #F1F5F9', overflowY:'auto' }}>
          {chats.map(c => {
             const other = String(c.sender?._id || c.sender) === String(user?._id) ? c.owner : c.sender;
             return (
               <ContactCard key={c._id} $active={selected?._id === c._id} onClick={() => setSelected(c)}>
                  <h4 style={{fontFamily:'Space Grotesk', color:'#0B397F', fontSize:'0.95rem'}}>{other?.name}</h4>
                  <p style={{fontSize:'0.7rem', color:'#64748B', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:'4px'}}>{c.conversation[c.conversation.length-1]?.text}</p>
               </ContactCard>
             );
          })}
        </div>

        <div style={{ display:'flex', flexDirection:'column', background:'white' }}>
          {selected ? (
            <>
              <div style={{padding:'20px 40px', borderBottom:'1px solid #F1F5F9', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <h4 style={{fontFamily:'Space Grotesk'}}>{String(selected.sender?._id || selected.sender) === String(user?._id) ? selected.owner?.name : selected.sender?.name}</h4>
                  <button onClick={handlePurge} style={{background:'none', border:'none', color:'#EF4444', cursor:'pointer'}}><Trash2 size={20}/></button>
              </div>
              <div ref={scrollRef} style={{ flex:1, overflowY:'auto', padding:'40px', display:'flex', flexDirection:'column', gap:'20px', background:'#F1F5F9' }}>
                {selected.conversation?.map((m, i) => {
                  const isMe = String(m.senderId) === String(user?._id);
                  const isLast = i === selected.conversation.length - 1;
                  return (
                    <BubbleWrapper key={i} $isMe={isMe}>
                        {isMe && isLast && <RevokeBtn onClick={() => handleRevoke(m._id)}><XCircle size={14}/></RevokeBtn>}
                        <Bubble $isMe={isMe} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>{m.text}</Bubble>
                    </BubbleWrapper>
                  );
                })}
              </div>
              <div style={{ padding:'25px 40px', background:'white', display:'flex', gap:'15px' }}>
                <input style={{flex:1, border:'none', background:'#F1F5F9', padding:'15px 25px', borderRadius:'12px', outline:'none', fontWeight:600}} placeholder="Message..." value={text} onChange={e => setText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleReply()} />
                <button onClick={handleReply} style={{background:'#0B397F', width:50, height:50, borderRadius:'12px', border:'none', color:'white', cursor:'pointer'}}><Send size={18}/></button>
              </div>
            </>
          ) : (
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%', color:'#CBD5E1'}}><MessageSquare size={60}/><p style={{marginTop:'10px', fontWeight:600}}>Select a Lead</p></div>
          )}
        </div>
      </MessengerLayout>
    </div>
  );
};

export default MessageCenter;