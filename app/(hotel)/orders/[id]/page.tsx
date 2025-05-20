"use client";

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function OrderStatusPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const orderId = params.id;
  const roomId = searchParams.get('r');

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-6">
      <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
      <p className="text-lg text-muted-foreground mb-2">Thank you for your order.</p>
      <p className="text-md text-muted-foreground mb-1">Order ID: <span className="font-semibold text-primary">{typeof orderId === 'string' ? orderId : JSON.stringify(orderId)}</span></p>
      {roomId && (
        <p className="text-md text-muted-foreground mb-6">Room Number: <span className="font-semibold text-primary">{roomId}</span></p>
      )}
      <p className="mb-8">Your order is being processed and you will receive updates soon.</p>
      
      <div className="flex space-x-4">
        <Link href={roomId ? `/menu?r=${roomId}` : "/menu"}>
          <Button variant="outline">Back to Menu</Button>
        </Link>
        {/* Later, a link to track this specific order in more detail via SSE (Step 6) */}
        {/* <Link href={`/orders/${orderId}/track${roomId ? `?r=${roomId}` : ""}`}>
          <Button>Track Your Order</Button>
        </Link> */}
      </div>
    </div>
  );
} 