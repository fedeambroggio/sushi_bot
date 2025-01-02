const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./index");

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database succesfully connected"))
  .catch((err) => console.error("Error connecting to MongoDb:", err));

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});