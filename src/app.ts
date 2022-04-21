import express from "express";
import cors from "cors";
import "express-async-errors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});