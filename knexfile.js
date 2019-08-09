// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/test-repo-db',
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/test-repo-db-test',
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  },

}

