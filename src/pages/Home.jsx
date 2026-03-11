import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import FeaturedSection from '../components/FeaturedSection';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <FeaturedSection />
      {/* We will add Footer later */}
    </>
  );
};

export default Home;