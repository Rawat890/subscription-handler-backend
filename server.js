import { PORT } from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/database/db.js";

connectDB();

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});