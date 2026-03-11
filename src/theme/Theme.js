export const theme = {
  colors: {
    primary: '#1F3A93',      // Deep Blue
    accent: '#FFD700',       // Premium Gold
    bgLight: '#F5F7FA',      
    white: '#FFFFFF',
    textDark: '#1A1A1A',     
    textSecondary: '#6B7280', 
  },
  gradients: {
    // We add a mid-stop to make the gradient look vibrant, not muddy
    brand: 'linear-gradient(135deg, #1F3A93 0%, #3b5bdb 50%, #FFD700 100%)',
    heroOverlay: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.7) 100%)',
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    card: '0 20px 60px rgba(0, 0, 0, 0.1)',
  }
};