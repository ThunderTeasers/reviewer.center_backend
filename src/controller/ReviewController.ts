/**
 * Контроллер компании
 * =============
 *
 * @author Max Erokhin
 */

import Controller from './Controller';
import Review from '../model/Review';
import type Database from '../database/Database';

class ReviewController extends Controller {
  constructor(database: Database) {
    super(database);
  }

  /**
   * Получение списка компаний
   *
   * @param {number} limit - Количество компаний, которое нужно получить
   * @param {number} offset - Сдвиг начала списка
   * @returns {Promise<Review[]>} - Обещание, которое будет выполнено, когда
   *                                будет получен список объектов
   */
  public async getAll(
    categoryId: number = 0,
    limit: number = 10,
    offset: number = 0
  ): Promise<Review[]> {
    const query = `
      SELECT 
        id,
        rating,
        message,
        advantages,
        disadvantages,
        created_at,
        updated_at
      FROM review
      WHERE company_id = ?
      LIMIT ?
      OFFSET ?
    `;

    const rows: Review[] = (await this._database.query(query, [
      categoryId,
      limit,
      offset,
    ])) as Review[];

    return rows;
  }
}

export default ReviewController;
