import React from 'react';

const LogoComparison = () => {
  const svgContent = (
    <svg width="334" height="80" viewBox="0 0 334 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pmjGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#5E44C9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4272E6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* PMJ Text */}
      <text
        x="0"
        y="45"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="56"
        fontWeight="900"
        fill="url(#pmjGradient)"
        letterSpacing="-2"
      >
        PMJ
      </text>

      {/* SOLUTIONS Text */}
      <text
        x="1"
        y="62"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#5E44C9"
        letterSpacing="5"
      >
        SOLUTIONS
      </text>

      {/* Curved arc lines (swoosh effect) */}
      <path
        d="M 218 10 Q 250 20 280 42"
        stroke="#7855D0"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 232 18 Q 264 28 294 50"
        stroke="#5E5FE0"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 244 26 Q 276 36 306 58"
        stroke="#4272E6"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        PMJ Logo Comparison
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Original PNG */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#555', textAlign: 'center' }}>Original PNG</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            border: '2px dashed #ddd',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <img
              src="/pmj-logo-app.png"
              alt="Original PNG Logo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* SVG Version */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#555', textAlign: 'center' }}>SVG Version</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            border: '2px dashed #ddd',
            borderRadius: '8px',
            padding: '20px'
          }}>
            {svgContent}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '800px',
        margin: '40px auto 0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#555' }}>Comparison Notes</h3>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Compare the two logos side by side. Let me know if adjustments are needed to match colors,
          proportions, curves, or any other details.
        </p>
      </div>
    </div>
  );
};

export default LogoComparison;
