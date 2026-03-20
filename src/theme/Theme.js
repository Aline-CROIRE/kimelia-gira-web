export const theme = {
  colors: {
    // Exact colors from your logo
    primary: '#0B397F',      // Deep Brand Blue
    accent: '#F5A623',       // Warm Sunset Gold
    secondary: '#1F3A93',    // Mid-tone Blue
    white: '#FFFFFF',
    bgSlate: '#F1F5F9',      
    bgElevated: '#F8FAFC',
    textDark: '#0B397F',     // Headings match the logo blue
    textMuted: '#64748B',
    border: 'rgba(11, 57, 127, 0.08)', // Tinted with brand blue
  },
  gradients: {
    /* 
       THE BRAND SWIPE: 
       This mimics the exact flow of the swoosh under your logo.
    */
    brand: 'linear-gradient(135deg, #0B397F 0%, #1F3A93 50%, #F5A623 100%)',
    
    /* Dark professional overlay */
    heroDark: 'linear-gradient(180deg, rgba(11, 57, 127, 0.9) 0%, rgba(10, 15, 30, 0.95) 100%)',
  },
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.03)',
    premium: '0 20px 40px rgba(11, 57, 127, 0.1)', // Blue-tinted shadow
    goldGlow: '0 10px 25px rgba(245, 166, 35, 0.2)',
  },
  radius: {
    small: '10px',
    medium: '18px',
    large: '28px',
  }
};