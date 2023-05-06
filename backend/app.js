const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express()
const router = express.Router()

mongoose.set('strictQuery', false);
const mongoUrl = "mongodb://0.0.0.0:27017/Badalp";


mongoose .connect(mongoUrl, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));


require('./Schemas/collectionTask')
require('./Schemas/collectionProject')
require('./Schemas/collectionModule')
require('./Schemas/collectionUser')
require('./Schemas/collectionTeam')
app.use(express.json());
app.use(cors());
app.use(require('./routes/auth'))
app.use(require('./routes/gitlab'))
app.use(require('./routes/database'))


 
app.listen(5030, () => {
    console.log("Server Started");
});
