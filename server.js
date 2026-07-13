import app from "./app.js";
import connectDB from "./database/db.js";
import { PORT } from "./config/config.js";

connectDB();

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});