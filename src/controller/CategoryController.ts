/**
 * Контроллер категорий
 * =============
 *
 * @author Max Erokhin
 */

import Controller from './Controller';
import Category from '../model/Category';
import type Database from '../database/Database';

class CategoryController extends Controller {
  constructor(database: Database) {
    super(database);
  }

  /**
   * Получение одной категории
   *
   * @param {number} id - Идентификатор категории
   * @returns {Promise<Category>} - Обещание, которое будет выполнено, когда
   *                                будет получен объект категории
   */
  public async getOne(id: number): Promise<Category> {
    const query = `
      SELECT id, title, description, parent_id, created_at, updated_at
      FROM category
      WHERE id = ?
      LIMIT 1
    `;

    const rows: Category[] = (await this._database.query(query, [
      id,
    ])) as Category[];

    return rows[0];
  }

  /**
   * Получение списка категорий
   *
   * @param {number} limit - Количество категорий, которое нужно получить
   * @param {number} offset - Сдвиг начала списка
   * @returns {Promise<Category[]>} - Обещание, которое будет выполнено, когда
   *                                  будет получен список объектов категорий
   */
  public async getAll(limit: number, offset: number): Promise<Category[]> {
    const query = `
      SELECT id, title, description, parent_id, created_at, updated_at
      FROM category
      LIMIT ?
      OFFSET ?
    `;

    const rows: Category[] = (await this._database.query(query, [
      limit,
      offset,
    ])) as Category[];

    return rows;
  }
}

export default CategoryController;
