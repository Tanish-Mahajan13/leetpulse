require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.route");
app.use("/users", userRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected!'))
  .catch((e) => console.log(e));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server"
  });
});

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});