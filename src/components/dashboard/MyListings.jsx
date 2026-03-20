import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';
import PropertyCard from '../PropertyCard';
import { Plus, Loader2, Home, LayoutGrid } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: 20px; }
`;

const TitleBox = styled.div`
  h2 { font-family: 'Space Grotesk'; font-size: 2.2rem; color: #1F3A93; font-weight: 700; margin: 0; }
  p { color: #64748B; font-weight: 500; font-size: 0.9rem; margin-top: 5px; }
`;

const AddListingBtn = styled.button`
  background: ${({ theme }) => theme.gradients.brand};
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  font-family: 'Space Grotesk';
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: ${({ theme }) => theme.shadows.premium};
  border: none;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
    box-shadow: 0 10px 25px rgba(31, 58, 147, 0.25);
  }
`;

const EmptyState = styled.div`
  background: white;
  padding: 80px 40px;
  border-radius: 30px;
  text-align: center;
  border: 2px dashed #E2E8F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .icon-bg {
    width: 80px; height: 80px; border-radius: 50%;
    background: #F8FAFC; display: flex; justify-content: center; align-items: center;
    color: #CBD5E1;
  }

  h3 { color: #1F3A93; font-family: 'Space Grotesk'; font-size: 1.4rem; }
  p { color: #64748B; max-width: 300px; line-height: 1.5; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
`;

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await API.get('/properties');
        const allProps = res.data.data;
        
        // Exact ID matching logic
        const myStuff = allProps.filter(p => {
            const ownerId = p.owner?._id || p.owner;
            const currentUserId = user?._id || user?.id;
            return String(ownerId) === String(currentUserId);
        });

        setListings(myStuff);
      } catch (err) {
        console.error("Fetch failed in Dashboard");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyData();
  }, [user]);

  if (loading) return (
    <div style={{ padding: '100px', textAlign: 'center', color: '#1F3A93' }}>
      <Loader2 className="animate-spin" size={40} />
      <p style={{ marginTop: '20px', fontFamily: 'Space Grotesk', fontWeight: 700, opacity: 0.6 }}>Securing Portfolio Data...</p>
    </div>
  );

  return (
    <Container>
      <Header>
        <TitleBox>
          <h2>My Portfolio</h2>
          <p>Manage and track your listed architectural assets.</p>
        </TitleBox>
        <AddListingBtn onClick={() => navigate('/list-property')}>
          <Plus size={18} />
          List New Asset
        </AddListingBtn>
      </Header>

      {listings.length === 0 ? (
        <EmptyState>
          <div className="icon-bg">
            <Home size={40} />
          </div>
          <div>
            <h3>Your Portfolio is Empty</h3>
            <p>Ready to showcase your first property to our network of elite investors?</p>
          </div>
          <AddListingBtn onClick={() => navigate('/list-property')}>
            <Plus size={18} />
            Add Your First Property
          </AddListingBtn>
        </EmptyState>
      ) : (
        <Grid>
          {listings.map(p => (
            <PropertyCard key={p._id} data={p} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyListings;