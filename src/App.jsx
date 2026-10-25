import React, { useState, useRef } from 'react';
import { TicketCard } from './components/TicketCard';
import { TicketForm } from './components/TicketForm';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { 
  FileText, 
  Image as ImageIcon, 
  Check, 
  Layers 
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
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#f8fafc', padding: '24px 16px' }}>
      
      {/* Top Navigation Bar */}
      <header style={{
        maxWidth: '1280px',
        margin: '0 auto 28px auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '16px 24px',
        backgroundColor: '#111622',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '18px',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
          }}>
            D
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
              District Ticket Generator
            </h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              Dynamic Ticket Generator • Exact Photo Layout
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
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Layers size={16} />
            {showOriginalComparison ? 'Hide Reference' : 'Compare with Reference'}
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
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isExporting ? 'wait' : 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
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
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isExporting ? 'wait' : 'pointer',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
            }}
          >
            <FileText size={16} />
            Download PDF
          </button>
        </div>
      </header>

      {/* Success Notification Alert */}
      {downloadSuccess && (
        <div style={{
          maxWidth: '1280px',
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
          fontWeight: '600'
        }}>
          <Check size={18} />
          {downloadSuccess}
        </div>
      )}

      {/* Main Grid: Form on Left, Live Preview on Right */}
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(360px, 1fr)',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Customizer Form */}
        <div>
          <TicketForm
            ticketData={ticketData}
            onChange={setTicketData}
            onReset={handleReset}
            onLoadPreset={handleLoadPreset}
            onPosterUpload={handlePosterUpload}
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
              Updates with every change
            </span>
          </div>

          {/* Ticket Display Canvas */}
          <div style={{
            padding: '24px',
            backgroundColor: '#000000',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)',
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
              textAlign: 'center'
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
