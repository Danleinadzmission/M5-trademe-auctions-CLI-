# TradeMe Auctions

Seed, delete and search auction items in a local MongoDB database, with a Node.js CLI tool and an Express API.

## Setup

1. Install and start MongoDB locally.
2. Clone the repo and install packages:
   ```
   npm install
   ```
3. Create a `.env` file in the root:
   ```
   MONGO_URI=mongodb://localhost:27017/trademe
   ```

## CLI tool

```
npm run seed     # add the sample auction items
npm run delete   # remove all auction items
```

## Search API

```
npm run dev
```

Then search by keyword (matches title or description, ignores case):

```
GET http://localhost:3000/api/auctions/search?q=bike
```

Returns only `title`, `description`, `start_price` and `reserve_price`.
A missing search term returns a 400 error.
