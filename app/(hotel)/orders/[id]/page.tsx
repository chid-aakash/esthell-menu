"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, PackageSearch, ChefHat, Truck, PartyPopper } from 'lucide-react';
import OrderStatusStepper from '@/components/orders/order-status-stepper';

// Define a type for the SSE event data
interface OrderStatusEvent {
  orderId: string;
  status: string;
  timestamp: string;
}

const ORDER_STAGES = ["Placed", "Cooking", "On the way", "Delivered"];

const statusIcons: { [key: string]: React.ElementType } = {
  "Placed": PackageSearch,
  "Cooking": ChefHat,
  "On the way": Truck,
  "Delivered": PartyPopper,
};

const statusMessages: { [key: string]: string } = {
  "Placed": "Your order has been placed and is awaiting confirmation.",
  "Cooking": "The kitchen has started preparing your order.",
  "On the way": "Your order is on its way to your room!",
  "Delivered": "Your order has been delivered. Enjoy your meal!",
};

export default function OrderStatusPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const orderId = params.id as string;
  const roomId = searchParams.get('r');

  const [currentStatus, setCurrentStatus] = useState<string>(ORDER_STAGES[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const eventSourceUrl = `/api/orders/stream?orderId=${orderId}${roomId ? `&roomId=${roomId}` : ''}`;
    const eventSource = new EventSource(eventSourceUrl);

    eventSource.onmessage = (event) => {
      try {
        const data: OrderStatusEvent = JSON.parse(event.data);
        if (data.orderId === orderId && ORDER_STAGES.includes(data.status)) {
          setCurrentStatus(data.status);
          if (data.status === ORDER_STAGES[ORDER_STAGES.length - 1]) {
            eventSource.close();
          }
        }
      } catch (e) {
        console.error("Failed to parse SSE event data:", e);
        setError("Error receiving status updates.");
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      setError("Connection to status updates failed. Please refresh.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [orderId, roomId]);

  const CurrentIcon = statusIcons[currentStatus] || CheckCircle2;
  const statusMessage = statusMessages[currentStatus] || "Your order is being processed.";

  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-start text-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-2xl mb-8">
        <OrderStatusStepper stages={ORDER_STAGES} currentStage={currentStatus} />
      </div>

      <CurrentIcon className={`w-24 h-24 mb-5 ${currentStatus === 'Delivered' ? 'text-green-500' : 'text-brand-primary'}`} />
      
      <h1 className="text-4xl font-bold mb-2">{currentStatus === 'Delivered' ? 'Order Delivered!' : 'Tracking Your Order'}</h1>
      <p className="text-lg text-muted-foreground mb-4">{statusMessage}</p>
      
      <div className="bg-card border p-4 rounded-lg shadow-sm mb-6 w-full max-w-md">
        <p className="text-md text-card-foreground mb-1">Order ID: <span className="font-semibold text-brand-primary">{orderId}</span></p>
        {roomId && (
          <p className="text-md text-card-foreground">Room Number: <span className="font-semibold text-brand-primary">{roomId}</span></p>
        )}
      </div>

      {error && (
        <p className="text-destructive mb-4 text-sm">Error: {error}</p>
      )}
      
      <div className="flex space-x-4 mt-4">
        <Link href={roomId ? `/menu?r=${roomId}` : "/menu"}>
          <Button variant="outline" size="lg">Back to Menu</Button>
        </Link>
      </div>
    </div>
  );
} 