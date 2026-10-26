import React, { useState, useRef } from 'react';
import { TicketCard } from './components/TicketCard';
import { TicketForm } from './components/TicketForm';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { 
  FileText, 
  Image as ImageIcon, 
  Check, 
  Layers,
  Film,
  Sparkles,
  Ticket,
  ExternalLink
} from 'lucide-react';

const ORIGINAL_TICKET_DATA = {
  movieName: '418',
  posterUrl: '/poster-exact.png',
  certification: 'A',
  language: 'Telugu',
  format: '2D',
  dateDay: 'Friday 23 Oct',
  time: '2:30 PM',
  screenNumber: '2',
  seatingClass: 'GOLD CLASS',
  seatNumbers: 'A9,A8,A7',
  cinemaName: 'Naaz Cinemas',
  cinemaAddress: 'Kothapet Main Road, Guntur',
  bookingId: '55610347/10000085286830',
  qrValue: 'DISTRICT-NAAZ-418-S2-A9A8A7-55610347',
  qrImageUrl: '',
  tagline: '#JoinTheHype'
};

const SAMPLE_PRESET_DATA = {
  movieName: 'Kalki 2898 AD',
  posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60',
  certification: 'U/A',
  language: 'Hindi',
  format: 'IMAX 3D',
  dateDay: 'Saturday 24 Oct',
  time: '7:15 PM',
  screenNumber: '1',
  seatingClass: 'PLATINUM RECLINER',
  seatNumbers: 'H12,H13',
  cinemaName: 'PVR INOX Forum Mall',
  cinemaAddress: 'Koramangala, Bengaluru',
  bookingId: '98432104/20000918237411',
  qrValue: 'DISTRICT-PVR-KALKI-H12H13-98432104',
  qrImageUrl: '',
  tagline: '#JoinTheHype'
};

export function App() {
  const [ticketData, setTicketData] = useState(ORIGINAL_TICKET_DATA);
  const [isExporting, setIsExporting] = useState(false);
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const ticketRef = useRef(null);

  const handleReset = () => {
    setTicketData(ORIGINAL_TICKET_DATA);
  };

  const handleLoadPreset = () => {
    setTicketData(SAMPLE_PRESET_DATA);
  };

  const handlePosterUpload = (base64) => {
    setTicketData(prev => ({ ...prev, posterUrl: base64 }));
  };

  const handleQrImageUpload = (base64) => {
    setTicketData(prev => ({ ...prev, qrImageUrl: base64 }));
  };

  // High-Quality PNG Export
  const handleDownloadPNG = async () => {
    if (!ticketRef.current) return;
    try {
      setIsExporting(true);
      await new Promise(r => setTimeout(r, 100));

      const dataUrl = await toPng(ticketRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#000000'
      });

      const link = document.createElement('a');
      link.download = `District_Ticket_${ticketData.movieName.replace(/\s+/g, '_')}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess('PNG Ticket downloaded in high resolution!');
      setTimeout(() => setDownloadSuccess(''), 4000);
    } catch (err) {
      console.error('Failed to export PNG:', err);
      alert('Could not export PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // High-Quality PDF Export
  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    try {
      setIsExporting(true);
      await new Promise(r => setTimeout(r, 100));

      const dataUrl = await toPng(ticketRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#000000'
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [120, 220]
      });

      pdf.addImage(dataUrl, 'PNG', 10, 10, 100, 200, undefined, 'FAST');
      pdf.save(`District_Ticket_${ticketData.movieName.replace(/\s+/g, '_')}.pdf`);

      setDownloadSuccess('PDF Ticket downloaded successfully!');
      setTimeout(() => setDownloadSuccess(''), 4000);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      alert('Could not export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070a12',
      color: '#f8fafc',
      padding: '24px 16px',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* Background Cinematic Atmosphere Glows */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        left: '20%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-10%',
        right: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Top Navigation Bar */}
      <header style={{
        maxWidth: '1320px',
        margin: '0 auto 24px auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '16px 24px',
        backgroundColor: 'rgba(17, 22, 34, 0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '20px',
            color: '#fff',
            boxShadow: '0 6px 16px rgba(139, 92, 246, 0.45)'
          }}>
            <Ticket size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '19px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: '#ffffff' }}>
                District Ticket Studio
              </h1>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                color: '#c4b5fd',
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                PRO
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>
              Dynamic Ticket Generator • Exact Photo Layout & Custom QR Support
            </p>
          </div>
        </div>

        {/* Global Export & Toggle Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowOriginalComparison(!showOriginalComparison)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: showOriginalComparison ? '#4f46e5' : '#1e293b',
              color: '#ffffff',
              border: '1px solid #374151',
              padding: '9px 15px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Layers size={16} />
            {showOriginalComparison ? 'Hide Reference' : 'Reference Image'}
          </button>

          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isExporting ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.15s ease'
            }}
          >
            <ImageIcon size={16} />
            Download PNG
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isExporting ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
              transition: 'all 0.15s ease'
            }}
          >
            <FileText size={16} />
            Download PDF
          </button>
        </div>
      </header>

      {/* Hero Visual Banner with Cinema Imagery */}
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto 28px auto',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 1
      }}>
        {/* Cinema Background Banner */}
        <div style={{
          height: '140px',
          width: '100%',
          backgroundImage: 'linear-gradient(90deg, rgba(7, 10, 18, 0.95) 0%, rgba(7, 10, 18, 0.75) 45%, rgba(7, 10, 18, 0.92) 100%), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              <Sparkles size={16} />
              District Cinema Experience
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Create, Customize & Download Authentic Tickets
            </h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '4px 0 0 0' }}>
              Now supporting custom QR code uploads, dynamic poster integration, and print-ready downloads.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)'
            }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Movie</span>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#38bdf8' }}>{ticketData.movieName || '418'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {downloadSuccess && (
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto 20px auto',
          backgroundColor: '#064e3b',
          border: '1px solid #059669',
          color: '#a7f3d0',
          padding: '12px 20px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 8px 20px rgba(6, 78, 59, 0.4)'
        }}>
          <Check size={18} />
          {downloadSuccess}
        </div>
      )}

      {/* Main Grid: Form on Left, Live Preview on Right */}
      <main style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(380px, 1fr)',
        gap: '32px',
        alignItems: 'start',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Left Column: Customizer Form */}
        <div>
          <TicketForm
            ticketData={ticketData}
            onChange={setTicketData}
            onReset={handleReset}
            onLoadPreset={handleLoadPreset}
            onPosterUpload={handlePosterUpload}
            onQrImageUpload={handleQrImageUpload}
          />
        </div>

        {/* Right Column: Live Ticket Preview */}
        <div style={{
          position: 'sticky',
          top: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '380px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 10px #22c55e'
              }}></span>
              <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1' }}>
                Live Ticket Preview
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Auto updates live
            </span>
          </div>

          {/* Ticket Display Canvas */}
          <div style={{
            padding: '24px',
            backgroundColor: '#000000',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <TicketCard
              ref={ticketRef}
              ticketData={ticketData}
              isExporting={isExporting}
            />
          </div>

          {/* Optional Reference Comparison Preview */}
          {showOriginalComparison && (
            <div style={{
              width: '100%',
              maxWidth: '380px',
              backgroundColor: '#161922',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '16px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '10px' }}>
                Original Uploaded Photo Reference
              </div>
              <img
                src="/reference-ticket.jpg"
                alt="Uploaded Original District Ticket"
                style={{
                  width: '100%',
                  maxHeight: '450px',
                  objectFit: 'contain',
                  borderRadius: '12px'
                }}
              />
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
export default App;
