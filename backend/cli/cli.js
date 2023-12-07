#!/usr/bin/env ts-node
// cli.js
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");
const program = require("commander");
const readline = require("readline-sync");
program
  .version("1.0.0")
  .description("CLI tool to create MongoDB database locally from a JSON file");

// command to import the data from the JSON file to the database./cli.js clean myDatabase myCollection
program
  .command("import <jsonFilePath> <databaseName> <collectionName>")
  .description("Import data from JSON file to MongoDB database")
  .action(async (jsonFilePath) => {
    try {
      const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db("Mission-Ready-M4");
      const collection = db.collection("cars");

      await collection.insertMany(jsonData);

      console.log("Data imported successfully.");

      await client.close();
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

// Run this command in the terminal to import the data from the JSON file to the database:
// node cli.js import ./db.json MissionReady cars

// command to clean the database

program
  .command("clean")
  .description("Clean all data from MongoDB collection")
  .action(async () => {
    const answer = readline.question(
      "Are you sure you want to clean the database? (Y/N) "
    );

    if (answer.toLowerCase() !== "y") {
      console.log("Operation cancelled.");
      return;
    }

    try {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db("Mission-Ready-M4");
      const collection = db.collection("cars");

      // Remove all documents from the collection
      await collection.deleteMany({});

      console.log("Database cleaned successfully.");

      await client.close();
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
//   Run this command in the terminal to clean the database:
// node cli.js clean

// Retrieve entry from MongoDB database using ID
program
  .command("retrieve")
  .description("Retrieve entry from MongoDB database by ID")
  .action(async (databaseName, collectionName) => {
    const entryId = readline.question("Please enter the entry ID: ");

    try {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db("Mission-Ready-M4");
      const collection = db.collection("cars");

      // Convert entryId to ObjectId
      const objectId = new ObjectId(entryId);

      const result = await collection.findOne({ _id: objectId });

      if (result) {
        console.log("Retrieved entry:", result);
      } else {
        console.log("Entry not found.");
      }

      await client.close();
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
// Run this command in the terminal to retrieve entry from MongoDB database using ID:
// node cli.js retrieve

// Update the price of a car in MongoDB database by ID
// Update the price of a car in MongoDB database by ID
program
  .command("update-price")
  .description("Update the price of a car in MongoDB database by ID")
  .action(async () => {
    const entryId = readline.question("Please enter the entry ID: ");
    const newPrice = readline.question("Please enter the new price: ");

    try {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db("Mission-Ready-M4");
      const collection = db.collection("cars");

      // Convert entryId to ObjectId
      const objectId = new ObjectId(entryId);

      const result = await collection.findOneAndUpdate(
        { _id: objectId },
        { $set: { price: parseInt(newPrice) } },
        { returnDocument: "after" }
      );

      if (result) {
        if (result.ok === 1 && result.value) {
          console.log("Updated entry:", result.value);
        } else {
          console.log("Entry not found or update unsuccessful.");
          console.error("Update result:", result);
        }
      } else {
        console.log("Update unsuccessful. Result is null.");
      }

      await client.close();
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
// update the price of a car in the database:
// node cli.js update-price

// Create a new car in the database
program
  .command("add-car")
  .description("Add a new car to the MongoDB database")
  .action(async () => {
    const carData = {
      image: readline.question("Please enter the car image URL: "),
      brand: readline.question("Please enter the car brand: "),
      color: readline.question("Please enter the car color: "),
      price: readline.question("Please enter the car price: "),
      type: readline.question("Please enter the car type: "),
    };

    try {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db("Mission-Ready-M4");
      const collection = db.collection("cars");

      const result = await collection.insertOne(carData);

      if (result) {
        const newCar = await collection.findOne({ _id: result.insertedId });
        console.log("Car added successfully:", newCar);
      } else {
        console.log("Failed to add car.");
      }

      await client.close();
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
// node cli.js add-car

// program .parse method parses process.argv and calls the action handler
program.parse(process.argv);
