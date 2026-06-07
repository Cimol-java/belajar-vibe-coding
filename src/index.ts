import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', () => 'Hello Elysia!')
  .get('/users', async () => {
    try {
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (e: any) {
      return { error: e.message };
    }
  })
  .post('/users', async ({ body }: { body: any }) => {
    try {
      await db.insert(users).values({
        name: body.name || 'Anonymous',
        email: body.email || `anon_${Date.now()}@example.com`,
      });
      return { success: true };
    } catch (e: any) {
      return { error: e.message };
    }
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
