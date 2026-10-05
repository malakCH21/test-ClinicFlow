require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT;


app.listen(PORT, () => { console.log(`ClinicFlow server is running on port ${PORT}`); });





/*const connectDB = require("./config/db");


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});*/
