## Turner's Car Company Image Recognition Application - Frontend README

### Description

Turner's Car Company Image Recognition Application's frontend is built using React, Vite, and Tailwind CSS. It provides a user interface for uploading images or URLs containing car images and visualizing the results from the backend analysis.

### Technology Stack

- **React**
- **Vite**
- **Tailwind CSS**

### Installation

1. Navigate to the `client` folder:

   ```bash
   cd turners-car-app/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` folder and set the following environment variables:

   ```env
   VITE_API_KEY=your_azure_computer_vision_key
   VITE_API_ENDPOINT=your_azure_computer_vision_endpoint
   VITE_PATH_BACKEND_IMAGE="http://localhost:5000/analyzeImage"
   VITE_PATH_BACKEND_="http://localhost:5000/analyze"
   ```

4. Run the frontend development server:

   ```bash
   npm start
   ```

### Configuration

- The frontend configuration is managed through the `.env` file in the `client` folder. Ensure the following variables are correctly set:

  - `VITE_API_KEY`: Your Azure Computer Vision API key.
  - `VITE_API_ENDPOINT`: Your Azure Computer Vision API endpoint.
  - `VITE_PATH_BACKEND_IMAGE`: The backend endpoint for image analysis, e.g., "http://localhost:5000/analyzeImage".
  - `VITE_PATH_BACKEND_`: The backend endpoint for general analysis, e.g., "http://localhost:5000/analyze".

---
