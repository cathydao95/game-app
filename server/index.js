import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HI");
});

app.get("/api/trivia", (req, res) => {
  const params = new URLSearchParams({
    amount: "5",
    category: req.query.category,
    difficulty: req.query.difficulty,
    type: "multiple",
  });
  const url = `https://opentdb.com/api.php?${params}`;
  console.log("url", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => res.send({ data }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
