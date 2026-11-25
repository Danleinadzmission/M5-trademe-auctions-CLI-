#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { Command } = require("commander");
const { connect, disconnect } = require("./db");
const Auction = require("./model-auction");

//cli for auctions that seeds or deletes
const program = new Command();
program
  .name("auction-cli")
  .description("Seed or delete auction data in MongoDB");

// Runs a task: connect, do the work, always disconnect
async function run(task) {
  try {
    await connect();
    await task();
  } catch (err) {
    console.error("Error:", err.message);
    process.exitCode = 1;
  } finally {
    await disconnect();
  }
}
//seed command that adds items to db
program
  .command("seed")
  .description("Add the sample auction items to the database")
  .action(() =>
    run(async () => {
      const items = require("./data-auctions");
      await Auction.deleteMany({}); // clear first so you don't get duplicates
      const result = await Auction.insertMany(items);
      console.log(`Seeded ${result.length} auction items`);
    }),
  );

//delete command follows the seed command
program
  .command("delete")
  .description("Delete all auction items from the database")
  .action(() =>
    run(async () => {
      const result = await Auction.deleteMany({});
      console.log(`Deleted ${result.deletedCount} auction items`);
    }),
  );

program.parseAsync();
