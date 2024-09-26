"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const knex_1 = __importDefault(require("knex"));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const pg = knex_1.default({
    client: 'pg',
    connection: {
        user: 'pms',
        host: '54.71.18.74',
        database: 'postgres',
        password: 'ER78HTgV',
        port: 5435,
    }
});
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
    }
    config() {
        // support application/json
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //inital route
        this.app.get('/', function (req, res) {
            res.send('Hello World!');
        });
        //adding item to database
        this.app.post('/add-item-cart', urlencodedParser, function (req, res) {
            if (!req.body) {
                return res.sendStatus(400);
            }
            else {
                const name = req.body['product_name'];
                pg('cart').select('*').where('product_name', name).first()
                    .then((data) => {
                    if (data) {
                        res.send('Product already exists');
                        return;
                    }
                    pg('cart').insert(req.body)
                        .then(() => console.log('Product added to the database'))
                        .then(res.send('Product added to the database'))
                        .catch(res.send('Error!!!'));
                });
            }
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map