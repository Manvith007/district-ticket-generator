import React from 'react';
import { 
  Film, 
  MapPin, 
  Calendar, 
  Armchair, 
  QrCode, 
  Upload, 
  RotateCcw, 
  Shuffle,
  Sparkles,
  Sliders,
  Trash2,
  Check
} from 'lucide-react';

export const TicketForm = ({ 
  ticketData, 
  onChange, 
  onReset, 
  onLoadPreset, 
  onPosterUpload,
  onQrImageUpload
}) => {
  const handleInputChange = (field, value) => {
    onChange({ ...ticketData, [field]: value });
  };

  const handlePosterFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onPosterUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onQrImageUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      backgroundColor: '#131722',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '24px',
      color: '#e2e8f0',
      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Form Header with Quick Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-flex',
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              color: '#a78bfa'
            }}>
              <Sliders size={18} />
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
              Ticket Customizer
            </h2>
          </div>
          <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '4px 0 0 0' }}>
            QR code updates automatically as you type
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={onReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#cbd5e1',
              padding: '7px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Clear all fields"
          >
            <RotateCcw size={14} />
            Clear
          </button>
          
          <button
            type="button"
            onClick={onLoadPreset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#3b82f6',
              border: 'none',
              color: '#ffffff',
              padding: '7px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            title="Load sample example preset"
          >
            <Shuffle size={14} />
            Load Sample
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Movie Info Section */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Film size={14} />
            Movie Details
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <input
                type="text"
                placeholder="Movie Title (e.g. Kalki 2898 AD, 418)"
                value={ticketData.movieName}
                onChange={(e) => handleInputChange('movieName', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={subLabelStyle}>Certification</label>
              <select
                value={ticketData.certification}
                onChange={(e) => handleInputChange('certification', e.target.value)}
                style={inputStyle}
              >
                <option value="U">U</option>
                <option value="U/A">U/A</option>
                <option value="A">A</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
              </select>
            </div>
            <div>
              <label style={subLabelStyle}>Language</label>
              <input
                type="text"
                placeholder="Telugu, Hindi, English"
                value={ticketData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={subLabelStyle}>Format</label>
              <input
                type="text"
                placeholder="2D, 3D, IMAX 3D"
                value={ticketData.format}
                onChange={(e) => handleInputChange('format', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Poster Upload & URL */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#a78bfa', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Upload size={14} />
            Movie Poster Image
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Paste poster image URL or upload file"
              value={ticketData.posterUrl}
              onChange={(e) => handleInputChange('posterUrl', e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              padding: '9px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#cbd5e1',
              whiteSpace: 'nowrap'
            }}>
              <Upload size={13} />
              <span>Upload Poster</span>
              <input type="file" accept="image/*" onChange={handlePosterFile} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* Schedule & Timing */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#34d399', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Calendar size={14} />
            Date & Time
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={subLabelStyle}>Date</label>
              <input
                type="text"
                placeholder="Friday 23 Oct"
                value={ticketData.dateDay}
                onChange={(e) => handleInputChange('dateDay', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={subLabelStyle}>Time</label>
              <input
                type="text"
                placeholder="2:30 PM"
                value={ticketData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Screen & Seating */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#fbbf24', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Armchair size={14} />
            Screen & Seats
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.5fr', gap: '10px' }}>
            <div>
              <label style={subLabelStyle}>Screen #</label>
              <input
                type="text"
                placeholder="2"
                value={ticketData.screenNumber}
                onChange={(e) => handleInputChange('screenNumber', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={subLabelStyle}>Class</label>
              <input
                type="text"
                placeholder="GOLD CLASS"
                value={ticketData.seatingClass}
                onChange={(e) => handleInputChange('seatingClass', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={subLabelStyle}>Seat Numbers</label>
              <input
                type="text"
                placeholder="A9, A8, A7"
                value={ticketData.seatNumbers}
                onChange={(e) => handleInputChange('seatNumbers', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Cinema & Venue */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#f43f5e', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <MapPin size={14} />
            Cinema & Address
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            <input
              type="text"
              placeholder="Cinema Name (e.g. Naaz Cinemas)"
              value={ticketData.cinemaName}
              onChange={(e) => handleInputChange('cinemaName', e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Address (e.g. Kothapet Main Road, Guntur)"
              value={ticketData.cinemaAddress}
              onChange={(e) => handleInputChange('cinemaAddress', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Booking ID */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#818cf8', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <QrCode size={14} />
            Booking ID
          </label>
          <input
            type="text"
            placeholder="e.g. 55610347/10000085286830"
            value={ticketData.bookingId}
            onChange={(e) => handleInputChange('bookingId', e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* QR Code Section */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
              <QrCode size={15} />
              QR Code (Auto-Generated from your Ticket Data)
            </label>
            <span style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: ticketData.qrImageUrl ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)',
              color: ticketData.qrImageUrl ? '#93c5fd' : '#86efac',
              fontWeight: '600'
            }}>
              {ticketData.qrImageUrl ? 'Custom Image Active' : 'Auto Dynamic QR Active'}
            </span>
          </div>

          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0' }}>
            The QR code automatically compiles and encodes your movie name, showtime, screen, seats, cinema, and booking ID in real-time.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Custom QR Image Upload (Optional) */}
            <div>
              <label style={subLabelStyle}>Optional: Override with Custom QR Image</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Paste QR image URL or upload image file"
                  value={ticketData.qrImageUrl || ''}
                  onChange={(e) => handleInputChange('qrImageUrl', e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  padding: '9px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  <Upload size={13} />
                  <span>Upload QR</span>
                  <input type="file" accept="image/*" onChange={handleQrFile} style={{ display: 'none' }} />
                </label>
                {ticketData.qrImageUrl && (
                  <button
                    type="button"
                    onClick={() => handleInputChange('qrImageUrl', '')}
                    title="Remove custom QR image and return to auto-generated QR"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Custom Manual QR Payload (Optional override) */}
            <div>
              <label style={subLabelStyle}>Optional: Manual QR Text Override (Leave blank to use auto-generated)</label>
              <input
                type="text"
                placeholder="Optional manual QR text/link (leave empty to auto-build from movie details)"
                value={ticketData.qrValue || ''}
                onChange={(e) => handleInputChange('qrValue', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  backgroundColor: '#0a0e17',
  border: '1px solid #334155',
  borderRadius: '10px',
  padding: '10px 14px',
  fontSize: '13px',
  color: '#ffffff',
  outline: 'none',
  transition: 'border-color 0.15s ease'
};

const subLabelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '500',
  color: '#94a3b8',
  marginBottom: '4px'
};
