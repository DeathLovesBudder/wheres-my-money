import express from "express";

const app = express();
const PORT = 5000;

//Middelware
app.use(express.json());
app.use((req, res, next) => {
  if (req.url === "/favicon.ico") {
    return next();
  }
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

//Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/expenses", (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ error: "Title and amount are required" });
  }

  res.status(201).json({
    message: "Expense created",
    expense: { title, amount }
  });
});

//Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
