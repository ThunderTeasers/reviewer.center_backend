import Router from './router/Router';
import Database from './database/Database';
import CategoryController from './controller/CategoryController';

const database: Database = new Database();

new Router()
  .get('/', () => 'main')
  .get('/categories/:link', async ({ params }: any) => {
    return await new CategoryController(database).getOne(params.link);
  })
  .get('/categories', async () => {
    return await new CategoryController(database).getAll(10, 0);
  })
  .get('/posts/:id', ({ params }: any) => `post with id ${params.id}`)
  .get('/about', () => 'about')
  .get('/faq', () => 'faq')
  .listen();
