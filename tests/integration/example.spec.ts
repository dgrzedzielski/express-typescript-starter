import supertest from 'supertest';
import { createApp } from '~/app';

const request = supertest(createApp());

describe('example', () => {
  it('should work properly', async () => {
    const response = await request.get('/api');

    expect(response.status).toBe(200);
  });
});
