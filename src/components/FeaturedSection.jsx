import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../services/api';
import PropertyCard from './PropertyCard'; // We build this card next

const Section = styled.section`
  padding: 100px 8%;
`;

const FeaturedSection = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/properties')
      .then(res => {
        setList(res.data.data.slice(0, 6)); // Only show top 6
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'100px'}}>Loading...</div>;

  return (
    <Section>
      <h2 style={{fontSize:'2.5rem', color:'#1F3A93', marginBottom:'40px'}}>
        Featured <span>Properties</span>
      </h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'30px'}}>
        {list.map(prop => <PropertyCard key={prop._id} property={prop} />)}
      </div>
    </Section>
  );
};

export default FeaturedSection;