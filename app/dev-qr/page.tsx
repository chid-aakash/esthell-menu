"use client";

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const sampleRoomIds = ["101", "205", "312", "suite-A", "penthouse"];

export default function DevQrPage() {
  const [baseUrl, setBaseUrl] = useState('');
  const [customRoomId, setCustomRoomId] = useState('');

  useEffect(() => {
    // Ensure this runs only on the client where window is available
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const generateLink = (roomId: string) => {
    if (!baseUrl) return 'Resolving base URL...';
    return `${baseUrl}/?r=${encodeURIComponent(roomId)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-brand-primary mb-2">Developer QR Code Generator</h1>
        <p className="text-lg text-muted-foreground">
          Use these QR codes to test the application flow with different room IDs.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Base URL: {baseUrl || 'Loading...'}
        </p>
      </header>

      <section className="mb-12 p-6 border rounded-lg shadow-sm bg-card">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4">Custom Room ID</h2>
        <div className="flex space-x-2 mb-4">
          <Input 
            type="text" 
            placeholder="Enter custom Room ID (e.g., 404-B)" 
            value={customRoomId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomRoomId(e.target.value)}
            className="flex-grow"
          />
        </div>
        {customRoomId && baseUrl && (
          <div className="p-4 border rounded-md bg-background">
            <h3 className="font-semibold mb-1 break-all">{generateLink(customRoomId)}</h3>
            <div className="mt-2 flex justify-center">
                <QRCodeSVG value={generateLink(customRoomId)} size={160} includeMargin={true} />
            </div>
            <Link href={generateLink(customRoomId)} passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Button variant="link" className="mt-2 text-sm">Open in new tab</Button>
              </a>
            </Link>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Sample Room IDs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {sampleRoomIds.map((roomId) => (
            <div key={roomId} className="p-4 border rounded-lg shadow-sm flex flex-col items-center bg-card">
              <h3 className="text-xl font-medium text-card-foreground mb-2">Room: {roomId}</h3>
              {baseUrl ? (
                <QRCodeSVG value={generateLink(roomId)} size={160} includeMargin={true} />
              ) : (
                <div className="w-[160px] h-[160px] bg-muted flex items-center justify-center text-sm text-muted-foreground rounded-md">Loading QR...</div>
              )}
              <Link href={generateLink(roomId)} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="mt-3 text-sm">Open link</Button>
                </a>
              </Link>
              <p className="text-xs text-muted-foreground mt-1 break-all text-center">{generateLink(roomId)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 