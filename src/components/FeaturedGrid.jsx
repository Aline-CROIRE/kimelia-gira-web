import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { getProperties } from '../services/propertyService';
import PropertyCard from './PropertyCard';

const Section = styled.section`
  padding: 100px 8%;
  background-color: #F1F5F9; /* Pro Slate - Perfect balance of brightness */
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const TitleGroup = styled.div`
  h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    color: #1F3A93;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 10px;
    letter-spacing: -0.04em;

    span {
      /* Signature Monochromatic Blue Gradient Mask */
      background: ${({ theme }) => theme.gradients.brand};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    font-family: 'Inter', sans-serif;
    color: #64748B;
    font-weight: 500;
    font-size: 1.1rem;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 40px;
`;

const ViewAllBtn = styled(motion.button)`
  background: ${({ theme }) => theme.gradients.brand};
  color: white;
  padding: 18px 45px;
  border-radius: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 80px auto 0;
  box-shadow: ${({ theme }) => theme.shadows.premium};
  border: none;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  color: #1F3A93;
  
  p {
    margin-top: 20px;
    font-family: 'Space Grotesk';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.6;
  }
`;

const FeaturedGrid = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch properties using the Hybrid Service (Real + Dummy)
    getProperties().then(data => {
      // Show only top 6 for the home page featured section
      setList(data.slice(0, 6));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Section>
        <LoadingContainer>
          <Loader2 size={45} className="animate-spin" />
          <p>Analyzing Market Opportunities...</p>
        </LoadingContainer>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Header>
          <TitleGroup>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Elite <span>Selections</span>
            </motion.h2>
            <p>Handpicked architectural masterpieces and high-yield assets.</p>
          </TitleGroup>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3B5BDB', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'Space Grotesk' }}>
            <Sparkles size={16} color="#FFD700" />
            AI-POWERED RECOMMENDATIONS
          </div>
        </Header>

        <Grid
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {list.map(item => (
            <motion.div key={item._id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <PropertyCard data={item} />
            </motion.div>
          ))}
        </Grid>

        <ViewAllBtn 
          whileHover={{ scale: 1.05, translateY: -5 }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/properties')}
        >
          Explore Entire Catalog <ArrowRight size={20} />
        </ViewAllBtn>
      </Container>
    </Section>
  );
};

export default FeaturedGrid;