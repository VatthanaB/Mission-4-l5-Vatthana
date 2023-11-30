#!/usr/bin/env ts-node
// cli.js

const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");
const program = require("commander");

program
  .version("1.0.0")
  .description("CLI tool to create MongoDB database locally from a JSON file");

// command to import the data from the JSON file to the database./cli.js clean myDatabase myCollection
program
  .command("import <jsonFilePath> <databaseName> <collectionName>")
  .description("Import data from JSON file to MongoDB database")
  .action(async (jsonFilePath, databaseName, collectionName) => {
    try {
      const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);

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
  .command("clean <databaseName> <collectionName>")
  .description("Clean all data from MongoDB collection")
  .action(async (databaseName, collectionName) => {
    try {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);

      // Remove all documents from the collection
      await collection.deleteMany({});

      console.log("Database cleaned successfully.");

      await client.close();
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
//   Run this command in the terminal to clean the database:
// node cli.js clean MissionReady cars

// Retrieve entry from MongoDB database using ID
program
  .command("retrieve <databaseName> <collectionName> <entryId>")
  .description("Retrieve entry from MongoDB database by ID")
  .action(async (databaseName, collectionName, entryId) => {
    try {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);

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
// node cli.js retrieve MissionReady cars 6569084b6632564e6d1da70e

// Update the price of a car in MongoDB database by ID
// Update the price of a car in MongoDB database by ID
program
  .command("update-price <databaseName> <collectionName> <entryId> <newPrice>")
  .description("Update the price of a car in MongoDB database by ID")
  .action(async (databaseName, collectionName, entryId, newPrice) => {
    try {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);

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
// node cli.js update-price MissionReady cars 5f8a2e4e7e5a5e0f6c4a7f1a 10000

// program .parse method parses process.argv and calls the action handler
program.parse(process.argv);
