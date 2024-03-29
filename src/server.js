require("dotenv").config();

const app = require('./app');
const { db } = require('./database/config');
const initModel = require("./models/initModel");

const port = process.env.PORT || 3000;

db.authenticate()
    .then(() => console.log("Database authenticated"))
    .catch((err) => console.log(err))

initModel();

db.sync()
    .then(() => console.log("Database synced"))
    .catch((err) => console.log(err))

app.listen(port, () => console.log(`Running on port:${port}`))