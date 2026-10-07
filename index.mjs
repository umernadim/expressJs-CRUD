import express from "express";
const app = express();
import ContactRoutes from "./routes/contacts.routes.js";
import ConnectDB from "./config/database.js";

const PORT = process.env.PORT;
// Database connection
ConnectDB();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

// Routes
app.use("/",ContactRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})