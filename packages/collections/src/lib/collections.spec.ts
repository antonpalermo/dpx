import { CollectionClient } from './collections.js';

describe('collections unit testing', () => {
  const client = CollectionClient({ mid: '', secretKey: '' });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('can create collection transaction', async () => {
    await client.collect('', {
      amount: 1.0,
      currency: 'PHP',
      email: '',
      description: 'Test Payment',
    });

    expect('test').toBe('test');
  });
});
