import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, MapPin, Loader2, Phone, Clock } from 'lucide-react';
import { getMyInquiries, sendReply } from '../../services/propertyService';
import { AuthContext } from '../../context/AuthContext';

/* --- STYLED CHAT ARCHITECTURE --- */
const MessengerLayout = styled.div`
  display: grid; grid-template-columns: 320px 1fr; 
  height: calc(100vh - 220px); background: white;
  border-radius: 30px; overflow: hidden; border: 1px solid #E2E8F0;
  box-shadow: ${({ theme }) => theme.shadows.premium};
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const Sidebar = styled.div`
  border-right: 1px solid #F1F5F9; background: #F8FAFC; 
  display: flex; flex-direction: column; overflow-y: auto;
`;

const ContactCard = styled.div`
  padding: 20px 25px; border-bottom: 1px solid #F1F5F9; cursor: pointer;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.$active ? 'white' : 'transparent'};
  border-left: 4px solid ${props => props.$active ? '#0B397F' : 'transparent'};
  &:hover { background: white; }
`;

const ChatWindow = styled.div` display: flex; flex-direction: column; background: white; `;

const MessageArea = styled.div`
  flex: 1; overflow-y: auto; padding: 40px;
  display: flex; flex-direction: column; gap: 20px; background: #F1F5F9;
`;

/* --- SMS BUBBLE LOGIC --- */
const BubbleWrapper = styled.div`
  display: flex; flex-direction: column;
  align-self: ${props => props.$isMe ? 'flex-end' : 'flex-start'};
  max-width: 70%;
`;

const Bubble = styled(motion.div)`
  padding: 14px 20px; border-radius: 20px; font-size: 0.95rem; font-family: 'Inter';
  font-weight: 500; line-height: 1.5;
  background: ${props => props.$isMe ? '#0B397F' : 'white'};
  color: ${props => props.$isMe ? 'white' : '#1E293B'};
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  
  /* The SMS "Tail" Logic */
  border-bottom-right-radius: ${props => props.$isMe ? '4px' : '20px'};
  border-bottom-left-radius: ${props => props.$isMe ? '20px' : '4px'};
  border: ${props => props.$isMe ? 'none' : '1px solid #E2E8F0'};
`;

const TimeStamp = styled.span`
  font-size: 0.65rem; color: #94A3B8; font-weight: 700; margin-top: 5px;
  text-align: ${props => props.$isMe ? 'right' : 'left'};
  text-transform: uppercase; letter-spacing: 0.5px;
`;

const InputBar = styled.div`
  padding: 25px 40px; background: white; border-top: 1px solid #F1F5F9;
  display: flex; gap: 15px; align-items: center;
  input { 
    flex: 1; border: none; background: #F1F5F9; padding: 16px 25px; 
    border-radius: 14px; outline: none; font-weight: 600; font-family: 'Inter';
  }
`;

const SendAction = styled.button`
  background: ${({ theme }) => theme.gradients.brand};
  width: 50px; height: 50px; border-radius: 12px; display: flex;
  justify-content: center; align-items: center; color: white; border: none; cursor: pointer;
  &:hover { transform: scale(1.05); filter: brightness(1.1); }
`;

const MessageCenter = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  const loadInbox = async () => {
    try {
      const data = await getMyInquiries();
      setChats(data);
      // Sync selected chat to show new messages
      if (selected) {
        const updated = data.find(c => c._id === selected._id);
        if (updated) setSelected(updated);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadInbox(); }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [selected?.conversation]);

  const handleReply = async () => {
    if (!text.trim() || !selected) return;
    try {
      await sendReply(selected._id, text);
      setText('');
      await loadInbox();
    } catch (err) { alert("Message delivery failed."); }
  };

  if (loading) return <div style={{textAlign:'center', padding:'100px'}}><Loader2 className="animate-spin" color="#0B397F" size={40}/></div>;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', color: '#0B397F', marginBottom: '30px' }}>Lead Center</h2>
      
      <MessengerLayout>
        <Sidebar>
          <div style={{padding:'20px 25px', fontWeight:800, fontSize:'0.7rem', color:'#94A3B8', letterSpacing:'2px', borderBottom:'1px solid #F1F5F9'}}>INBOX</div>
          {chats.length === 0 ? (
             <div style={{padding:'40px', textAlign:'center', color:'#CBD5E1'}}><MessageSquare size={40}/><p>No messages</p></div>
          ) : (
            chats.map(c => {
               // LOGIC: Show the name of the OTHER person
               const otherPerson = String(c.sender?._id || c.sender) === String(user?._id) ? c.owner : c.sender;
               return (
                 <ContactCard key={c._id} $active={selected?._id === c._id} onClick={() => setSelected(c)}>
                    <h4 style={{fontFamily:'Space Grotesk', color:'#0B397F', fontSize:'0.95rem'}}>{otherPerson?.name || 'Sanctuary Member'}</h4>
                    <p style={{fontSize:'0.75rem', color:'#64748B', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:'4px'}}>
                      {c.conversation?.[c.conversation.length - 1]?.text || 'Started a conversation'}
                    </p>
                 </ContactCard>
               );
            })
          )}
        </Sidebar>

        <ChatWindow>
          {selected ? (
            <>
              <div style={{padding:'20px 40px', borderBottom:'1px solid #F1F5F9', background:'white', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                 <div>
                    <h3 style={{fontFamily:'Space Grotesk', color:'#0B397F'}}>{String(selected.sender?._id || selected.sender) === String(user?._id) ? selected.owner?.name : selected.sender?.name}</h3>
                    <div style={{display:'flex', gap:'15px', marginTop:'4px'}}>
                        <p style={{fontSize:'0.7rem', color:'#64748B', display:'flex', alignItems:'center', gap:'4px', fontWeight:600}}><MapPin size={12} color="#F5A623"/> {selected.property?.title?.en}</p>
                        <p style={{fontSize:'0.7rem', color:'#16A34A', display:'flex', alignItems:'center', gap:'4px', fontWeight:800}}><Phone size={12}/> {selected.phone}</p>
                    </div>
                 </div>
              </div>

              <MessageArea ref={scrollRef}>
                {selected.conversation?.map((m, i) => {
                  const isMe = String(m.senderId) === String(user?._id);
                  return (
                    <BubbleWrapper key={i} $isMe={isMe}>
                        <Bubble $isMe={isMe} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
                            {m.text}
                        </Bubble>
                        <TimeStamp $isMe={isMe}>
                            {new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </TimeStamp>
                    </BubbleWrapper>
                  );
                })}
              </MessageArea>

              <InputBar>
                <input 
                  placeholder="Type a professional message..." 
                  value={text} 
                  onChange={e => setText(e.target.value)} 
                  onKeyPress={e => e.key === 'Enter' && handleReply()}
                />
                <SendAction onClick={handleReply}><Send size={20}/></SendAction>
              </InputBar>
            </>
          ) : (
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%', color:'#CBD5E1'}}>
                <MessageSquare size={60} strokeWidth={1} />
                <p style={{marginTop:'15px', fontWeight:700, fontFamily:'Space Grotesk', textTransform:'uppercase', letterSpacing:'1px'}}>Select a Lead to begin</p>
            </div>
          )}
        </ChatWindow>
      </MessengerLayout>
    </div>
  );
};

export default MessageCenter;