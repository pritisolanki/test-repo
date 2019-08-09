import * as MockKnex from 'mock-knex'

export const tracker = MockKnex.getTracker()

beforeEach(() => {
  tracker.install()
})

afterEach(() => {
  tracker.uninstall()
})
