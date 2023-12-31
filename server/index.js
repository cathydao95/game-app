import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Cathy");
});

app.get("/api/trivia", (req, res) => {
  const params = new URLSearchParams({
    amount: "5",
    difficulty: req.query.difficulty,
    type: "multiple",
  });

  if (req.query.category) {
    params.category = req.query.category;
  }
  const url = `https://opentdb.com/api.php?${params}`;
  console.log("url", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => res.send({ data }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
