# install dependencies
$ npm install

create needed databases in postgres

# set up connection db in knexfile.js
knexfile.js - change this line to your connection
connection:'postgres://localhost/test-repo-db',

# create needed tables in db
$ npm run migrate

# running testing
$ npm run test

# running server
$ npm run start
or
$ npm run watch

