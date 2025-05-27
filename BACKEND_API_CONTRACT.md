# Backend API Contract

This document outlines the API endpoints required by the Esthell Menu frontend application.

## 1. Menu API

Provides access to the restaurant menu.

-   **Endpoint**: `/api/menu`
-   **Method**: `GET`
-   **Description**: Fetches the entire menu, including categories and dishes.
-   **Request Body**: None
-   **Query Parameters**: None
-   **Response Body (Success - `200 OK`)**:
    ```json
    {
      "categories": [
        {
          "id": "string", // e.g., "starters", "main-course"
          "name": "string"  // e.g., "Starters", "Main Course"
        }
      ],
      "dishes": [
        {
          "id": "string",               // Unique dish identifier
          "name": "string",
          "description": "string",
          "price": "number",            // Price in local currency
          "categoryId": "string",       // ID of the category this dish belongs to
          "cookTimeMinutes": "number",
          "imageUrl": "string",         // URL to the primary dish image
          "imageUrls": ["string"],      // Optional: Array of URLs for image carousel
          "allergens": ["string"],      // Optional: List of allergens, e.g., ["gluten", "nuts"]
          "calories": "number"          // Optional: Caloric information
        }
      ]
    }
    ```
    *Type Definition Reference: `MenuData` in `types/menu.ts`*

-   **Response Body (Error - e.g., `500 Internal Server Error`)**:
    ```json
    {
      "message": "string" // Error description
    }
    ```

## 2. Order API

Handles order creation and management.

### 2.1 Create Order

-   **Endpoint**: `/api/order`
-   **Method**: `POST`
-   **Description**: Submits a new order from a guest.
-   **Request Body**:
    ```json
    {
      "roomId": "string", // Room identifier from QR code
      "items": [
        {
          "dishId": "string",    // ID of the dish
          "quantity": "number",  // Must be > 0
          "notes": "string"      // Optional: Special instructions from the guest
        }
      ]
      // The total amount should be calculated by the backend to prevent tampering.
    }
    ```
    *Type Definition Reference: `CartItem` for items structure (partially) in `types/menu.ts`*

-   **Response Body (Success - `201 Created`)**:
    ```json
    {
      "orderId": "string",        // Unique identifier for the newly created order
      "roomId": "string",
      "status": "string",         // Initial status, e.g., "Placed"
      "items": [
        {
          "dishId": "string",
          "quantity": "number",
          "notes": "string",
          "pricePerItem": "number" // Price of the dish at the time of order
        }
      ],
      "totalAmount": "number",      // Total amount calculated by the server
      "estimatedDeliveryTime": "string", // ISO 8601 DateTime string or human-readable (e.g., "30-45 minutes")
      "createdAt": "string"       // ISO 8601 DateTime string
    }
    ```
-   **Response Body (Error - e.g., `400 Bad Request`, `404 Not Found` for invalid dishId, `500 Internal Server Error`)**:
    ```json
    {
      "message": "string", // Error description
      "details": {}        // Optional: More specific error details, e.g., validation errors
    }
    ```

### 2.2 Order Status Stream (Server-Sent Events)

-   **Endpoint**: `/api/orders/{orderId}/stream`
-   **Method**: `GET`
-   **Description**: Streams real-time status updates for a specific order using Server-Sent Events (SSE). The connection should be filtered by `roomId` for security/privacy, which can be passed as a query parameter.
-   **Path Parameters**:
    *   `orderId`: The ID of the order to track.
-   **Query Parameters**:
    *   `roomId`: The room ID associated with the order. The backend should verify that the requesting client (associated with this `roomId`) is authorized to view updates for the given `orderId`.
-   **Response Headers**:
    *   `Content-Type: text/event-stream`
    *   `Cache-Control: no-cache`
    *   `Connection: keep-alive`
-   **SSE Events**:
    Each event will be in the format:
    ```
    event: <event_name>
    data: <json_payload>
    


    ```

    *   **Event Name**: `statusUpdate`
        **Data Payload**:
        ```json
        {
          "orderId": "string",
          "status": "Placed" | "Cooking" | "On the way" | "Delivered" | "Cancelled",
          "message": "string", // Optional: A human-readable message, e.g., "Your food is being prepared."
          "updatedAt": "string" // ISO 8601 DateTime string
        }
        ```
    *   **Event Name**: `error` (Used for stream-specific errors or if the order cannot be tracked)
        **Data Payload**:
        ```json
        {
          "message": "string" // Error description
        }
        ```
    *   The stream should close after a "Delivered" or "Cancelled" status, or if an unrecoverable error occurs.

## General API Conventions

-   **Authentication**: Currently, `roomId` from query parameters (`?r=ROOM_ID`) is used for identification. Future versions might implement more robust authentication.
-   **Error Handling**: Standard HTTP status codes should be used. Error responses should ideally include a `message` field.
-   **Data Format**: JSON for request and response bodies.
-   **Timestamps**: Use ISO 8601 format for all dates and times (e.g., `YYYY-MM-DDTHH:mm:ss.sssZ`). 