## Turner's Car Company Image Recognition Application - Backend README

### Description

Turner's Car Company Image Recognition Application's backend is responsible for handling server-side operations, interacting with the MongoDB database, and facilitating communication with Azure Computer Vision for image analysis.

### Technology Stack

- **Node.js**
- **Express.js**
- **MongoDB**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mission-Ready-Group-2/Vatthana-mission-2.git
   ```

2. Navigate to the `backend` folder:

   ```bash
   cd turners-car-app/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` folder and set the following environment variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   AZURE_COMPUTER_VISION_KEY=your_azure_computer_vision_key
   AZURE_COMPUTER_VISION_ENDPOINT=your_azure_computer_vision_endpoint
   ```

5. Run the backend server:

   ```bash
   npm start
   ```

### Configuration

- The backend configuration is managed through the `.env` file in the `backend` folder. Ensure the following variables are correctly set:

  - `PORT`: The port on which the backend server runs.
  - `MONGODB_URI`: The MongoDB connection URI.
  - `AZURE_COMPUTER_VISION_KEY`: The Azure Computer Vision API key.
  - `AZURE_COMPUTER_VISION_ENDPOINT`: The Azure Computer Vision API endpoint.

---
