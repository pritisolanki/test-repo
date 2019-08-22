import express from 'express';
import {CartoController, createValidator} from "./controllers/carto";
import {isValid} from "./utils";

const controller = new CartoController();

// Create a new express application instance
const app: express.Application = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(urlencodedParser);

app.post('/add', isValid(createValidator), controller.add);

app.listen(process.env.PORT, function() {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

module.exports = app;