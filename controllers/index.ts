import knex from "knex";
const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const db = knex({
    client: DB_CLIENT,
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    }
});

export default class BaseController {
    protected db: knex = db;
}