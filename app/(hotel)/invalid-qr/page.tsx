"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function InvalidQrPage() {
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center p-6 bg-background">
      <AlertTriangle className="w-20 h-20 text-destructive mb-6" />
      <h1 className="text-3xl font-bold text-foreground mb-3">Invalid QR Code</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The QR code you scanned is invalid or the room information is missing. 
        Please find a valid QR code in your room and try scanning again.
      </p>
      <p className="text-sm text-muted-foreground">
        If you continue to experience issues, please contact the front desk for assistance.
      </p>
      {/* Optional: A button to go to a generic help page or back to a neutral state if applicable */}
      {/* For now, no explicit button is added as the primary action is to re-scan a physical QR */}
    </div>
  );
} 