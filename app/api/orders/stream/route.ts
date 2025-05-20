export const dynamic = 'force-dynamic'; // Ensures the route is not statically cached

const orderStages = ["Placed", "Cooking", "On the way", "Delivered"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  // const roomId = searchParams.get('roomId'); // Removed as it's unused in this mock

  if (!orderId) {
    return new Response("Missing orderId parameter", { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      let currentStageIndex = 0;
      // console.log(`SSE connection started for orderId: ${orderId}`);

      const sendEvent = () => {
        if (currentStageIndex >= orderStages.length) {
          // console.log(`SSE connection closing for orderId: ${orderId} - All stages sent.`);
          controller.close();
          return;
        }

        const stage = orderStages[currentStageIndex];
        const data = JSON.stringify({ orderId, status: stage, timestamp: new Date().toISOString() });
        controller.enqueue(`data: ${data}\n\n`);
        // console.log(`Sent SSE for orderId: ${orderId}, status: ${stage}`);
        
        currentStageIndex++;
      };

      // Send the first event immediately
      sendEvent();
      
      // Then send subsequent events at intervals
      const intervalId = setInterval(() => {
        sendEvent();
        if (currentStageIndex >= orderStages.length) {
          clearInterval(intervalId);
        }
      }, 5000); // Send update every 5 seconds

      // Clean up when the client closes the connection
      request.signal.addEventListener('abort', () => {
        // console.log(`SSE connection aborted by client for orderId: ${orderId}`);
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
} 