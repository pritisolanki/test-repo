const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.ts');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Add a product test', () => {
  it('Checks if the product exists', () => {
    const request = {
      'product_name': 'prod1',
      'qty': 'good',
      'unit_price': '111.11',
      'user_email': 'test@prod.com'
    };
    chai.request(server)
      .post('/add')
      .type('form')
      .send(request)
      .end((err, res) => {
        expect(res.text).to.equal('Product exists');
      });
  });
  it('Checks if the product added', () => {
    const request = {
      'product_name': 'prod12',
      'qty': 'good',
      'unit_price': '111.11',
      'user_email': 'test@prod.com'
    };
    chai.request(server)
      .post('/add')
      .type('form')
      .send(request)
      .end((err, res) => {
        expect(res.text).to.equal('Product added to the database');
      });
  });
});