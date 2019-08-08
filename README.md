
Clone the repository, install the dependencies.

```bash

$ cd <application-name>

$ cp .env.example .env # Update database credentials

$ yarn migrate
```
Load fake data in database.

```bash
$ yarn load:fake <FactoryName> <Number>
```
Start the application.

```bash
$ yarn build

$ yarn start # For production

$ yarn start:dev # For development
```

## Generating Migrations and Seeds

To create migration use `make:migration` and seed use `make:seeder`:

```bash
$ yarn make:migration create_{table_name}_table

$ yarn make:seeder {table_name}_table_seeder
```

Example,

```bash
$ yarn make:migration create_posts_table

$ yarn make:seeder post_table_seeder
```

Modify migration and seeder file as per the requirement. Then finally:

```bash
$ yarn migrate # to migrate

$ yarn seed # to seed
```