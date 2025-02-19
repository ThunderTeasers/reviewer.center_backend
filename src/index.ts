import Router from './router/Router';
import Database from './database/Database';
import CategoryController from './controller/CategoryController';
import CompanyController from './controller/CompanyController';
import ReviewController from './controller/ReviewController';
import type Category from './model/Category';
import type Company from './model/Company';
import type Review from './model/Review';

const database: Database = new Database();

new Router()
  .get('/', () => 'main')
  .get('/categories', async () => {
    return await new CategoryController(database).getAll();
  })
  .get('/categories/:link', async ({ params }: any) => {
    const category: Category = await new CategoryController(database).getOne(
      params.link
    );
    const companies: Company[] = await new CompanyController(database).getAll(
      category.id,
      10,
      0
    );

    return {
      category,
      companies,
    };
  })
  .get('/companies', async ({ query }: any) => {
    return await new CompanyController(database).getAll(query.get('category'));
  })
  .get('/companies/:link', async ({ params }: any) => {
    const company: Company = await new CompanyController(database).getOne(
      params.link
    );

    const reviews: Review[] = await new ReviewController(database).getAll(
      company.id,
      10,
      0
    );

    return {
      company,
      reviews,
    };
  })
  .get('/about', () => 'about')
  .get('/faq', () => 'faq')
  .listen();
