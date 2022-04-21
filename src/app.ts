import express from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routers/index.js";
import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(handleErrorsMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});