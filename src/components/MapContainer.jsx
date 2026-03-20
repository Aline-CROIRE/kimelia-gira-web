import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 100%; 
  height: 100%; 
  border-radius: 28px; 
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.premium};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: -1.9441, lng: 30.0619 }; // Kigali Center

const MapContainer = ({ properties = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // TO DO: Replace with your real API Key from the steps below
    googleMapsApiKey: "" 
  });

  if (!isLoaded) return (
    <MapWrapper style={{ background: '#E2E8F0', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', color: '#1F3A93' }}>MAP ENGINE</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '10px' }}>Please provide a Google Maps API Key to activate the geospatial view.</p>
        </div>
    </MapWrapper>
  );

  return (
    <MapWrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {properties.map(p => {
          // SAFETY CHECK: Ensure location and coordinates exist
          const lat = p.location?.coordinates?.[1];
          const lng = p.location?.coordinates?.[0];

          // If coordinates are missing, don't render a marker for this property
          if (!lat || !lng) return null;

          return (
            <Marker 
              key={p._id} 
              position={{ lat, lng }} 
              title={p.title?.en || "Property"}
            />
          );
        })}
      </GoogleMap>
    </MapWrapper>
  );
};

export default MapContainer;