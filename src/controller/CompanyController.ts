/**
 * Контроллер компании
 * =============
 *
 * @author Max Erokhin
 */

import Controller from './Controller';
import Company from '../model/Company';
import type Database from '../database/Database';

class CompanyController extends Controller {
  constructor(database: Database) {
    super(database);
  }

  /**
   * Получение одной компании
   *
   * @param {string} link Идентификатор компании
   * @returns {Promise<Company>} Обещание, которое будет выполнено, когда будет получен объект компании
   */
  public async getOne(link: string): Promise<Company> {
    const query = `
      SELECT 
        id,
        title,
        description,
        link,
        logo,
        category_id,
        created_at,
        updated_at
      FROM company
      WHERE link = ?
      LIMIT 1
    `;

    const rows: Company[] = (await this._database.query(query, [
      link,
    ])) as Company[];

    return rows[0];
  }

  /**
   * Получение списка компаний
   *
   * @param {number} limit - Количество компаний, которое нужно получить
   * @param {number} offset - Сдвиг начала списка
   * @returns {Promise<Company[]>} - Обещание, которое будет выполнено, когда
   *                                  будет получен список объектов компаний
   */
  public async getAll(
    categoryId: number = 0,
    limit: number = 10,
    offset: number = 0
  ): Promise<Company[]> {
    const query = `
      SELECT 
        id,
        title,
        link,
        created_at,
        updated_at
      FROM company
      WHERE category_id = ?
      LIMIT ?
      OFFSET ?
    `;

    const rows: Company[] = (await this._database.query(query, [
      categoryId,
      limit,
      offset,
    ])) as Company[];

    return rows;
  }
}

export default CompanyController;
