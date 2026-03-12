import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import FeaturedGrid from '../components/FeaturedGrid';

const Home = () => {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedGrid />
      {/* Footer will go here */}
    </>
  );
};

export default Home;