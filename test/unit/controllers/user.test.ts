import { expect } from 'chai'
import { tracker } from '../helpers'
import * as request from 'supertest'

import { Application } from 'express'
import * as App from '@/app'

export const app = App as Application

describe('GET 12 /echo', () => {
  it('should return to equal message', async () => {
    tracker.on('query', query => {
      expect(query.method).to.equal('insert')
      query.response([])
    })

    const res = await request(app)
      .post('/user')
      .send({name: 'john', age: 1})

    expect(res.body).to.deep.equal({name: 'john', age: 1})
  })
})
