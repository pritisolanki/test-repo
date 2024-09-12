const mocha = require('ts-mocha');
const omit = require('lodash.omit');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.ts');
const knex = require("knex");
const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
let should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const db = knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  }
});

const default_cart = {
  'product_name': 'prod1',
  'qty': 'good',
  'unitPrice': 111.11,
  'userEmail': 'test@prod.com'
};

const createCart = async (cart = default_cart) => chai.request(server)
  .post('/add')
  .type('form')
  .send(cart);

describe('Add a product test', () => {
  it('Create cart without unitPrice should fall', async () => {
    const res = await createCart(omit(default_cart, 'unitPrice'));
    res.status.should.equal(400);
    res.text.should.equal("\"unitPrice\" is required");
  });

  it('Create cart without qty should fall', async () => {
    const res = await createCart(omit(default_cart, 'qty'));
    res.status.should.equal(400);
    res.text.should.equal("\"qty\" is required");
  });

  it('Create cart without product_name should fall', async () => {
    const res = await createCart(omit(default_cart, 'product_name'));
    res.status.should.equal(400);
    res.text.should.equal("\"product_name\" is required");
  });

  it('Create cart without userEmail should fall', async () => {
    const res = await createCart(omit(default_cart, 'userEmail'));
    res.status.should.equal(400);
    res.text.should.equal("\"userEmail\" is required");
  });

  it('Create cart with unitPrice as string should fall', async () => {
    const res = await createCart({...default_cart, unitPrice: 'string'});
    res.status.should.equal(400);
    res.text.should.equal("\"unitPrice\" must be a number");
  });

  it('Create cart with userEmail as number should fall', async () => {
    const res = await createCart({...default_cart, userEmail: 400});
    res.status.should.equal(400);
    res.text.should.equal("\"userEmail\" must be a valid email");
  });

  it('Create cart with not existing parameter should fall', async () => {
    const res = await createCart({...default_cart, test: 123});
    res.status.should.equal(400);
    res.text.should.equal("\"test\" is not allowed");
  });

  it('Create two identical cart should be fall', async () => {
    await createCart();
    const res = await createCart();
    res.status.should.equal(400);
    res.text.should.equal('Product already exists');
  });

  it('Create cart should be created (happy case)', async () => {
    const res = await createCart();
    res.status.should.equal(201);
    res.text.should.equal('ok');

    const createdCart = await db("cart").select('*').where("product_name", default_cart.product_name).first();
    createdCart.should.deep.equal({...default_cart, _id: createdCart._id});
  });

  afterEach(async () => {
    await db('cart').delete();
  });
});