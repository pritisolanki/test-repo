import knex from './knex';
import Bookshelf from 'bookshelf';

const bookshelf: Bookshelf = Bookshelf(knex);

bookshelf.plugin(['virtuals', 'pagination', 'visibility', 'bookshelf-camelcase']);

export default bookshelf;
