const express = require("express");
const { connect } = require("./db");
const Auction = require("./model-auction");

const app = express();
const PORT = process.env.PORT || 3000;

// Makes symbols like + or ? in a search safe to use
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// GET /api/auctions/search?q=bike
app.get("/api/auctions/search", async (req, res) => {
  const q = (req.query.q || "").trim();

  if (!q) {
    return res
      .status(400)
      .json({ error: "Please provide a search term, e.g. ?q=bike" });
  }

  try {
    const pattern = new RegExp(escapeRegex(q), "i"); // 'i' = ignore upper/lower case
    const items = await Auction.find({
      $or: [{ title: pattern }, { description: pattern }],
    }).select("title description start_price reserve_price -_id");

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Connect to MongoDB first, then start listening for requests
connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`API running on http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  });
