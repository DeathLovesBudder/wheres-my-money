import express from "express";

const app = express();
const PORT = 5000;

//Middleware
app.use(express.json());
app.use((req, res, next) => {
  if (req.url === "/favicon.ico") {
    return next();
  }
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

//--------------
// Routes
//--------------

//GET
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

//POST
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

app.post("/api/echo", (req, res) => {
  res.status(201).json({
    receivedBody: req.body
  });
});

//Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
