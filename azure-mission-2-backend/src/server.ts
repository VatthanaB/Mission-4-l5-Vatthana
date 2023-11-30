import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import CarModel from "./Model/car.model";
import bodyParser = require("body-parser");
import { fetchData, fetchSimilarCars, filterDataFromImage } from "./request";
import { Tags } from "./interfaces/interfaces";
import axios from "axios";
// import .env variables
const MONGOURL = process.env.MONGO;
const KEY = process.env.SUBSCRIPTION_KEY;
const URL = process.env.ENDPOINT;

// Create Express server
const app = express();

// Express configuration - middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

// Express configuration - port
const port = process.env.PORT || 8080;

// MongoDB connection
const mangoURL: string = MONGOURL || "mongodb://localhost:27017/MissionReady";

app.get("/", (req, res) => {
  const documentationHTML = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car API Documentation</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        margin: 20px;
        background-color: #f7f7f7;
      }

      h1 {
        color: #333;
      }

      p {
        color: #555;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        margin-bottom: 15px;
      }

      strong {
        color: #007BFF;
      }
    </style>
  </head>
  <body>

    <h1>Welcome to Car API Documentation</h1>

    <p>This API provides endpoints to interact with a database of cars. Below are the available endpoints:</p>

    <ul>
      <li>
        <strong>GET /</strong> - Home endpoint
      </li>
      <li>
        <strong>POST /analyze</strong> - Analyze image and return similar cars
        <ul>
          <li>Request Body: { "imageUrl": "URL_TO_IMAGE" }</li>
          <li>Response Format: { "tags": { "tag1": "value1", "tag2": "value2" }, "result": { "car1": { "details": "..." }, "car2": { "details": "..." } } }</li>
        </ul>
      </li>
      <li>
        <strong>POST /analyzeImage</strong> - Analyze image from data and return similar cars
        <ul>
          <li>Request Body: { "data": { /* image data */ } }</li>
          <li>Response Format: { "tags": { "tag1": "value1", "tag2": "value2" }, "result": { "car1": { "details": "..." }, "car2": { "details": "..." } } }</li>
        </ul>
      </li>
      <li>
        <strong>POST /cars</strong> - Create a new car in the database
        <ul>
          <li>Request Body: { "image": "URL_TO_IMAGE", "brand": "Brand", "color": "Color", "price": 10000, "type": "Type" }</li>
          <li>Response Format: { "image": "URL_TO_IMAGE", "brand": "Brand", "color": "Color", "price": 10000, "type": "Type", "_id": "ObjectId" }</li>
        </ul>
      </li>
      <li>
        <strong>POST /azure</strong> - Make a request to Azure service
        <ul>
          <li>Request Body: { "url": "URL_TO_IMAGE" }</li>
          <li>Response Format: Azure service response</li>
        </ul>
      </li>
    </ul>

  </body>
</html>
  `;

  res.send(documentationHTML);
});
// POST endpoint to analyze image and return similar cars
app.post("/analyze", async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    // console.log("imageUrl", imageUrl);

    const tags: Tags | undefined = await fetchData(imageUrl);
    let result;
    if (tags) {
      // fetch similar cars from database
      result = await fetchSimilarCars(tags);
    } else {
      res.status(400).json({
        error: "No tags found, image might not be relevent to cars. ",
      });
    }

    res.status(200).json({ tags: tags, result: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint to analyze image and return similar cars from database using fata from image
app.post("/analyzeImage", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("data", data);
    // console.log("imageUrl", imageUrl);

    let tags: Tags | undefined;
    tags = await filterDataFromImage(data);
    let result = {};
    if (tags) {
      // fetch similar cars from database
      result = await fetchSimilarCars(tags);
    } else {
      res.status(400).json({
        error: "No tags found, image might not be relevent to cars.  ",
      });
    }

    res.status(200).json({ tags: tags, result: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// POST endpoint to create a new car in the database
app.post("/cars", async (req, res) => {
  try {
    const { image, brand, color, price, type } = req.body;

    // Validate required fields
    if (!image || !brand || !color || !price || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCarData = {
      image,
      brand,
      color,
      price,
      type,
    };

    const newCar = new CarModel(newCarData);
    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/azure", async (req, res) => {
  const axiosConfig = {
    method: "post",
    url: URL,
    data: {
      url: "https://di-uploads-pod15.dealerinspire.com/lakeforestsportscars/uploads/2019/10/Ferrari-LaFerrari-Aperta.jpg",
    },
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": KEY,
    },
  };
  try {
    const response = await axios(axiosConfig);

    const data = response.data.tagsResult.values;
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error:", error.response);
  }
});
// mongo connection and server start
mongoose
  .connect(mangoURL, {
    serverSelectionTimeoutMS: 5000, // Increase the timeout value
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
