import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import PropertyCard from '../PropertyCard';
import { Heart, Loader2 } from 'lucide-react';

const Watchlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const res = await API.get('/interactions/favorites');
        setFavorites(res.data.data || []);
      } catch (err) { console.error("Fav fetch failed"); }
      finally { setLoading(false); }
    };
    fetchFavs();
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}><Loader2 className="animate-spin" color="#0B397F" /></div>;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', color: '#0B397F', fontSize: '2.2rem', marginBottom: '30px' }}>Saved Sanctuaries</h2>
      
      {favorites.length === 0 ? (
        <div style={{ background: 'white', padding: '60px', borderRadius: '24px', textAlign: 'center', border: '2px dashed #E2E8F0' }}>
            <Heart size={40} color="#CBD5E1" style={{marginBottom:'15px'}} />
            <p style={{ color: '#64748B', fontWeight: 600 }}>Your watchlist is currently empty.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {favorites.map(item => <PropertyCard key={item._id} data={item} />)}
        </div>
      )}
    </div>
  );
};

export default Watchlist;