import express from "express";
import * as bodyParser from "body-parser";
import Knex from 'knex';
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const pg = Knex({
    client: 'pg',
    connection: {
        host: 'YOUR_HOST_NAME',
        user: 'YOUR_USER_NAME',
        database: 'YOUR_DATABASE_NAME',
        password: 'YOUR_PASSWORD',
        port: "YOUR_PORT_NAME",
    }
});
class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // support application/json
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //inital route
        this.app.get('/', function (req: any, res: any) {
            res.send('Hello World!');
        });
        //adding item to database
        this.app.post('/add-item-cart', urlencodedParser, function (req: any, res: any) {
            if (!req.body) {
                return res.sendStatus(400);
            } else {
                const name = req.body['product_name'];

                pg('cart').select('*').where('product_name', name).first()
                    .then((data: any) => {
                        if (data) {
                            res.send('Product already exists');
                            return;
                        }
                        pg('cart').insert(req.body)
                            .then(() => console.log('Product added to the database'))
                            .then(res.send('Product added to the database'))
                            .catch(res.send('Error!!!'));
                    })
            }
        });

    }
}

export default new App().app;