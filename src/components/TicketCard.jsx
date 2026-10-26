import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { TICKET_TEMPLATE_BASE64 } from './templateData';

export const TicketCard = forwardRef(({ ticketData, isExporting = false }, ref) => {
  const {
    movieName = '',
    posterUrl = '',
    certification = 'U/A',
    language = '',
    format = '2D',
    dateDay = '',
    time = '',
    screenNumber = '',
    seatingClass = '',
    seatNumbers = '',
    cinemaName = '',
    cinemaAddress = '',
    bookingId = '',
    tagline = '#JoinTheHype',
    qrValue = '',
    qrImageUrl = ''
  } = ticketData;

  const cinemaFullString = [cinemaName, cinemaAddress].filter(Boolean).join(', ');

  // Template original natural coordinates: width = 453, height = 817
  // We display at width 380px (scale = 380 / 453 = 0.8388)
  const TICKET_WIDTH = 380;
  const TICKET_HEIGHT = Math.round(817 * (TICKET_WIDTH / 453)); // ~685px
  const scale = TICKET_WIDTH / 453;

  // Build automatic QR payload from the entered ticket details
  const autoQrPayload = (() => {
    // If user provided a specific QR override value, use that
    if (qrValue && qrValue.trim()) return qrValue.trim();

    // Otherwise automatically construct from entered fields:
    const parts = [
      movieName ? `MOVIE:${movieName}` : null,
      (dateDay || time) ? `SHOW:${[dateDay, time].filter(Boolean).join(' ')}` : null,
      screenNumber ? `SCREEN:${screenNumber}` : null,
      (seatingClass || seatNumbers) ? `SEATS:${[seatingClass, seatNumbers].filter(Boolean).join('-')}` : null,
      cinemaName ? `CINEMA:${cinemaName}` : null,
      bookingId ? `BOOKING_ID:${bookingId}` : null
    ].filter(Boolean);

    if (parts.length > 0) {
      return `DISTRICT|${parts.join('|')}`;
    }
    return '';
  })();

  const hasQrContent = Boolean(qrImageUrl || autoQrPayload);

  return (
    <div
      ref={ref}
      style={{
        width: `${TICKET_WIDTH}px`,
        height: `${TICKET_HEIGHT}px`,
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        userSelect: 'none',
        boxShadow: isExporting
          ? 'none'
          : '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        backgroundColor: '#121316',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      {/* 1. Base Layer: The exact photo background (authentic district movies logo, mesh textures, notch cutouts, scan text) */}
      <img
        src={TICKET_TEMPLATE_BASE64}
        alt="District Ticket Base"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* 2. Dynamic Movie Poster (x: 26..92, y: 168..262 on 453x817 canvas) */}
      <div
        style={{
          position: 'absolute',
          left: `${26 * scale}px`,
          top: `${168 * scale}px`,
          width: `${66 * scale}px`,
          height: `${94 * scale}px`,
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: '#16171c',
          zIndex: 3,
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.6)'
        }}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movieName || 'Movie Poster'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            crossOrigin="anonymous"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            fontSize: '9.5px',
            textAlign: 'center',
            fontWeight: 700,
            padding: '4px',
            border: '1px dashed #334155',
            borderRadius: '6px'
          }}>
            POSTER
          </div>
        )}
      </div>

      {/* 3. Dynamic Movie Details: Title, Cert, Lang, Format, Date, Time (x: 108..425, y: 166..265) */}
      <div
        style={{
          position: 'absolute',
          left: `${106 * scale}px`,
          top: `${166 * scale}px`,
          width: `${320 * scale}px`,
          height: `${96 * scale}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          zIndex: 3,
          color: '#ffffff'
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: `${20 * scale}px`,
            fontWeight: '800',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: movieName ? '#ffffff' : '#64748b',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {movieName || 'Movie Name'}
        </div>

        {/* Certification | Language | Format */}
        <div
          style={{
            fontSize: `${13.5 * scale}px`,
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.68)',
            display: 'flex',
            alignItems: 'center',
            gap: `${8 * scale}px`,
            marginTop: `${6 * scale}px`
          }}
        >
          <span>{certification || 'U/A'}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.28)' }}>|</span>
          <span>{language || 'Language'}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.28)' }}>|</span>
          <span>{format || '2D'}</span>
        </div>

        {/* Date | Time */}
        <div
          style={{
            fontSize: `${14.5 * scale}px`,
            fontWeight: '700',
            color: dateDay || time ? '#ffffff' : '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: `${8 * scale}px`,
            marginTop: `${8 * scale}px`
          }}
        >
          <span>{dateDay || 'Show Date'}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.35)', fontWeight: 300 }}>|</span>
          <span>{time || 'Show Time'}</span>
        </div>
      </div>

      {/* 4. QR Code Container (x: 125..329, y: 331..536) */}
      <div
        style={{
          position: 'absolute',
          left: `${125 * scale}px`,
          top: `${331 * scale}px`,
          width: `${204 * scale}px`,
          height: `${205 * scale}px`,
          borderRadius: `${24 * scale}px`,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
          padding: `${14 * scale}px`,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden'
        }}
      >
        {qrImageUrl ? (
          <img
            src={qrImageUrl}
            alt="Custom QR Code"
            style={{
              width: `${176 * scale}px`,
              height: `${176 * scale}px`,
              objectFit: 'contain',
              display: 'block'
            }}
            crossOrigin="anonymous"
          />
        ) : autoQrPayload ? (
          <QRCodeSVG
            value={autoQrPayload}
            size={Math.round(176 * scale)}
            level="M"
            fgColor="#000000"
            bgColor="#ffffff"
          />
        ) : (
          /* Clean placeholder waiting for ticket data */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: `${11 * scale}px`,
            fontWeight: '600',
            textAlign: 'center',
            padding: '8px',
            border: '2px dashed #cbd5e1',
            borderRadius: `${14 * scale}px`,
            width: '100%',
            height: '100%'
          }}>
            <span style={{ fontSize: `${12 * scale}px`, color: '#64748b' }}>QR CODE</span>
            <span style={{ fontSize: `${10 * scale}px`, color: '#94a3b8', marginTop: '2px' }}>Auto-generates as you type</span>
          </div>
        )}
      </div>

      {/* 5. Screen & Seat Numbers (y: 554..618) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${554 * scale}px`,
          textAlign: 'center',
          zIndex: 3,
          color: '#ffffff'
        }}
      >
        <div
          style={{
            fontSize: `${14 * scale}px`,
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: screenNumber ? '#ffffff' : '#64748b',
            marginBottom: `${4 * scale}px`
          }}
        >
          {screenNumber ? `SCREEN ${screenNumber}` : 'SCREEN'}
        </div>
        <div
          style={{
            fontSize: `${14.5 * scale}px`,
            fontWeight: '700',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: (seatingClass || seatNumbers) ? '#ffffff' : '#64748b'
          }}
        >
          {(seatingClass || seatNumbers) ? (
            `${seatingClass ? `${seatingClass}-` : ''}${seatNumbers}`
          ) : (
            'CLASS - SEAT NUMBERS'
          )}
        </div>
      </div>

      {/* 6. Cinema Venue & Address (y: 670..718) */}
      <div
        style={{
          position: 'absolute',
          left: `${24 * scale}px`,
          right: `${24 * scale}px`,
          top: `${670 * scale}px`,
          textAlign: 'center',
          zIndex: 3,
          fontSize: `${13.5 * scale}px`,
          fontWeight: '500',
          color: cinemaFullString ? 'rgba(255, 255, 255, 0.9)' : '#64748b',
          lineHeight: 1.35
        }}
      >
        {cinemaFullString || 'Cinema Name & Address'}
      </div>

      {/* 7. Booking ID (y: 724..750) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${724 * scale}px`,
          textAlign: 'center',
          zIndex: 3,
          fontSize: `${11.5 * scale}px`,
          color: bookingId ? 'rgba(255, 255, 255, 0.5)' : '#475569',
          letterSpacing: '0.02em',
          fontFamily: "'Inter', monospace"
        }}
      >
        {bookingId ? `Booking ID: ${bookingId}` : 'Booking ID'}
      </div>

      {/* 8. Hashtag / Tagline (y: 760..795) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${762 * scale}px`,
          textAlign: 'center',
          zIndex: 3,
          fontSize: `${13.5 * scale}px`,
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.8)',
          letterSpacing: '0.01em'
        }}
      >
        {tagline}
      </div>
    </div>
  );
});

TicketCard.displayName = 'TicketCard';
