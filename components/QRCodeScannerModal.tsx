
import React, { useState, useEffect, useRef } from 'react';
// FIX: Added .ts extension to the import path.
import type { QRCodePayload } from '../types.ts';

declare const Html5Qrcode: any;

interface QRCodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, data?: any) => void;
  scanType: 'attendance' | 'library';
}

const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({ isOpen, onClose, onAction, scanType }) => {
  const [scanResult, setScanResult] = useState<QRCodePayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scannerRef = useRef<any>(null);

  const cleanupScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch((err: Error) => console.error("Error stopping scanner:", err));
    }
  };

  useEffect(() => {
    if (isOpen) {
      setScanResult(null);
      setErrorMessage(null);

      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;
      
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => {
          try {
            const payload: QRCodePayload = JSON.parse(decodedText);
            
            if (payload.type === scanType) {
              cleanupScanner();
              setScanResult(payload);
              setErrorMessage(null);
            } else {
              setErrorMessage(`Invalid QR Code. Expected '${scanType}', but found '${payload.type}'.`);
            }
          } catch (e) {
            setErrorMessage("Invalid QR Code format. Not a valid JSON.");
          }
        },
        (error: string) => { /* Ignore non-critical scan errors */ }
      ).catch((err: Error) => {
        setErrorMessage("Could not start camera. Please grant permission and refresh.");
      });
    }

    return () => {
      cleanupScanner();
    };
  }, [isOpen, scanType]);

  const handleAction = (action: string) => {
    onAction(action, scanResult);
    onClose();
  };
  
  const handleClose = () => {
      cleanupScanner();
      onClose();
  }

  if (!isOpen) return null;

  const renderScanResult = () => {
    if (!scanResult) return null;

    if (scanResult.type === 'attendance') {
      return (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Scan Successful!</h2>
          <p className="text-gray-600 mt-2">Course Detected: <span className="font-semibold">{scanResult.courseName}</span></p>
          <div className="mt-6 flex space-x-4">
            <button onClick={() => handleAction('check-in')} className="flex-1 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600">Check In</button>
            <button onClick={() => handleAction('check-out')} className="flex-1 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700">Check Out</button>
          </div>
        </>
      );
    }
    
    if (scanResult.type === 'library') {
      return (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Library Desk Verified!</h2>
          <p className="text-gray-600 mt-2">Location: <span className="font-semibold">{scanResult.location}</span></p>
          <p className="text-gray-500 text-sm">Please select your action.</p>
          <div className="mt-6 flex space-x-4">
            <button onClick={() => handleAction('issue')} className="flex-1 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600">Issue Book</button>
            <button onClick={() => handleAction('return')} className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600">Return Book</button>
          </div>
        </>
      );
    }
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-center">
        {!scanResult && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan QR Code</h2>
            <p className="text-gray-500 mb-4">Point your camera at the <span className="font-semibold">{scanType}</span> QR code.</p>
            <div id="reader" className="w-full rounded-lg overflow-hidden border bg-gray-900"></div>
            {errorMessage && <p className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">{errorMessage}</p>}
          </>
        )}

        {scanResult && (
          <div className="animate-fade-in">
            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {renderScanResult()}
          </div>
        )}

        <button onClick={handleClose} className="mt-6 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
        <style>{`.animate-fade-in { animation: fadeIn 0.3s ease-out; } @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
      </div>
    </div>
  );
};

export default QRCodeScannerModal;