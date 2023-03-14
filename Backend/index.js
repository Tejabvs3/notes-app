const express = require("express");
const connectToMysql = require('./dbConnect');
const cors = require('cors')

const app = express();
port = 5001

app.use(cors())
app.use(express.json());



 app.use("/api/notes",require('./routes/notes'));

app.listen(port, () => {
    console.log(`enotes backend listening on port ${port}`)
  });

  