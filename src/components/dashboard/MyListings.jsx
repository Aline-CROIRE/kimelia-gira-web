import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';
import PropertyCard from '../PropertyCard';
import { Plus, Loader2, Home, Edit3, Trash2 } from 'lucide-react';
import { deleteProperty } from '../../services/propertyService';

const Container = styled.div` display: flex; flex-direction: column; gap: 40px; `;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  @media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: 20px; }
`;

const ManageGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;
`;

const CardWrapper = styled.div`
  position: relative;
  .actions {
    position: absolute; bottom: 120px; right: 20px; z-index: 20;
    display: flex; gap: 10px; opacity: 0; transition: 0.3s;
  }
  &:hover .actions { opacity: 1; transform: translateY(-5px); }
`;

const IconButton = styled.button`
  width: 45px; height: 45px; border-radius: 12px; display: flex; 
  justify-content: center; align-items: center; border: none; cursor: pointer;
  background: ${props => props.$danger ? '#EF4444' : '#0B397F'};
  color: white; box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  &:hover { transform: scale(1.1); filter: brightness(1.2); }
`;

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyData = async () => {
    try {
      const res = await API.get('/properties');
      const allProps = res.data.data;
      const myStuff = allProps.filter(p => {
          const ownerId = p.owner?._id || p.owner;
          return String(ownerId) === String(user?._id || user?.id);
      });
      setListings(myStuff);
    } catch (err) { console.error("Portfolio Fetch Failed"); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (user) fetchMyData(); }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Permanent Action: This asset will be removed from the market. Proceed?")) {
      try {
        await deleteProperty(id);
        await fetchMyData(); // Instant Refresh
      } catch (err) { alert("Action Denied"); }
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'100px'}}><Loader2 className="animate-spin" color="#0B397F" size={40}/></div>;

  return (
    <Container>
      <Header>
        <div>
            <h2 style={{fontFamily:'Space Grotesk', fontSize:'2.2rem', color:'#0B397F'}}>My Portfolio</h2>
            <p style={{color:'#64748B', fontWeight:500}}>Managing {listings.length} live sanctuaries</p>
        </div>
        <button 
          onClick={() => navigate('/list-property')}
          style={{ background: 'linear-gradient(135deg, #0B397F 0%, #F5A623 100%)', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: 800, border: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk', display:'flex', alignItems:'center', gap:'10px' }}
        >
          <Plus size={18} /> LIST NEW ASSET
        </button>
      </Header>

      {listings.length === 0 ? (
        <div style={{background:'white', padding:'80px', borderRadius:'30px', textAlign:'center', border:'2px dashed #E2E8F0'}}>
            <Home size={40} color="#CBD5E1" style={{marginBottom:'15px'}}/>
            <p style={{fontWeight:600, color:'#64748B'}}>No active listings found in your account.</p>
        </div>
      ) : (
        <ManageGrid>
          {listings.map(p => (
            <CardWrapper key={p._id}>
                <PropertyCard data={p} />
                <div className="actions">
                    <IconButton onClick={() => navigate(`/edit-property/${p._id}`)}><Edit3 size={18}/></IconButton>
                    <IconButton $danger onClick={() => handleDelete(p._id)}><Trash2 size={18}/></IconButton>
                </div>
            </CardWrapper>
          ))}
        </ManageGrid>
      )}
    </Container>
  );
};

export default MyListings;