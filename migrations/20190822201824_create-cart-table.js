exports.up = function (knex, Promise) {
    let createQuery = `CREATE TABLE cart(
        cartid SERIAL PRIMARY KEY NOT NULL,
        product_name TEXT,
        qty INTEGER,
        price INTEGER,
        email TEXT,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
}

exports.down = function (knex, Promise) {
    let dropQuery = `DROP TABLE <examples>`
    return knex.raw(dropQuery)
}