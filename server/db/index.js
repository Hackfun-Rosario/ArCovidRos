const mongoose = require("mongoose");
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSW;
console.log(user);
mongoose
  .connect(
    `mongodb+srv://${user}:${password}@alcalaw-cluster-13oup.mongodb.net/coronabaires?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
