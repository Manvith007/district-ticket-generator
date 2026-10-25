import React from 'react';

// District brand logo replicating the exact typographic style seen in the District ticket
export const DistrictLogo = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* "district" wordmark with bold blocky aesthetic and stylized dot */}
      <div style={{
        fontFamily: "'Montserrat', 'Inter', -apple-system, sans-serif",
        fontSize: '28px',
        fontWeight: '900',
        letterSpacing: '-0.06em',
        lineHeight: '0.9',
        color: '#ffffff',
        textTransform: 'lowercase',
        display: 'flex',
        alignItems: 'baseline'
      }}>
        <span>dis</span>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          t
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-1px',
            width: '4px',
            height: '4px',
            backgroundColor: '#ffffff',
            borderRadius: '1px'
          }}></span>
        </span>
        <span>rict</span>
      </div>
      {/* "movies" in elegant soft italic script */}
      <div style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontStyle: 'italic',
        fontSize: '15px',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.85)',
        letterSpacing: '0.04em',
        marginTop: '2px'
      }}>
        movies
      </div>
    </div>
  );
};
