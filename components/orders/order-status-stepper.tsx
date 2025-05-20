"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Dot } from 'lucide-react'; // Removed unused Circle

interface OrderStatusStepperProps {
  stages: string[];
  currentStage: string;
}

export default function OrderStatusStepper({ stages, currentStage }: OrderStatusStepperProps) {
  const currentStageIndex = stages.indexOf(currentStage);

  return (
    <div className="w-full max-w-2xl mx-auto py-4 px-2">
      <ol className="relative flex items-center justify-between text-sm font-medium text-center text-muted-foreground sm:text-base">
        {stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <li 
              key={stage} 
              className={cn(
                "relative flex-1 flex items-center justify-center",
                // Add connector lines, ensuring they don't extend beyond the first/last item
                index > 0 && "after:content-[''] after:w-full after:h-0.5 after:border-b after:border-1 after:absolute after:top-1/2 after:left-[-50%] after:-translate-y-1/2 after:z-[-1]",
                isCompleted && "after:border-brand-primary",
                (isActive || isPending) && "after:border-gray-200 dark:after:border-gray-700"
              )}
            >
              <div className="flex flex-col items-center text-center space-y-1.5 z-10">
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                    isCompleted ? 'bg-brand-primary text-brand-primary-foreground' : '',
                    isActive ? 'bg-brand-primary text-brand-primary-foreground ring-4 ring-brand-accent/50' : '',
                    isPending ? 'bg-gray-200 text-muted-foreground dark:bg-gray-700' : ''
                  )}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : 
                   isActive ? <Dot className="w-5 h-5 animate-pulse" /> : 
                   <span className="text-xs font-semibold">{index + 1}</span>}
                </span>
                <span 
                    className={cn(
                        "font-medium text-xs sm:text-sm",
                        isActive ? "text-brand-primary dark:text-brand-accent" : "",
                        isCompleted ? "text-brand-primary dark:text-brand-accent/80" : "text-muted-foreground"
                    )}
                >
                    {stage}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
} 