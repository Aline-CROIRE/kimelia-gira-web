import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import PropertyCard from '../PropertyCard';
import { Loader2, Heart } from 'lucide-react';

const Watchlist = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const res = await API.get('/interactions/favorites');
        setList(res.data.data || []);
      } catch (err) {
        console.error("Connection failed");
        setList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, []);

  if (loading) return <div style={{padding:'100px', textAlign:'center'}}><Loader2 className="animate-spin" color="#0B397F" size={40}/></div>;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', color: '#0B397F', marginBottom: '30px' }}>Watchlist</h2>
      {list.length === 0 ? (
          <div style={{ background: 'white', padding: '80px', borderRadius: '30px', textAlign: 'center', border: '2px dashed #E2E8F0' }}>
            <Heart size={40} color="#CBD5E1" style={{marginBottom:'15px'}} />
            <p style={{ color: '#64748B', fontWeight: 600 }}>No saved properties found.</p>
          </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {list.map(item => <PropertyCard key={item._id} data={item} />)}
        </div>
      )}
    </div>
  );
};

export default Watchlist;