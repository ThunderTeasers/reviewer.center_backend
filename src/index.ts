import Router from './router/Router';
import Database from './database/Database';
import CategoryController from './controller/CategoryController';
import CompanyController from './controller/CompanyController';

const database: Database = new Database();

new Router()
  .get('/', () => 'main')
  .get('/categories', async () => {
    return await new CategoryController(database).getAll();
  })
  .get('/categories/:link', async ({ params }: any) => {
    return await new CategoryController(database).getOne(params.link);
  })
  .get('/companies', async ({ query }: any) => {
    return await new CompanyController(database).getAll(query.get('category'));
  })
  .get('/about', () => 'about')
  .get('/faq', () => 'faq')
  .listen();
