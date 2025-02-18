/**
 * База данных
 * =============
 *
 * @author Max Erokhin
 */

import mysql, { type Pool } from 'mysql2/promise';

class Database {
  private readonly _pool: Pool;

  /**
   * Создает пул соединений с базой данных
   *
   * @remarks
   * Параметры:
   * host - хост базы данных,
   * user - имя пользователя,
   * password - пароль,
   * database - имя базы данных,
   * waitForConnections - ждать если нет свободных соединений,
   * connectionLimit - ограничение на количество соединений,
   * idleTimeout - время ожидания закрытия неиспользуемого соединения,
   * queueLimit - ограничение на количество запросов в очереди,
   * enableKeepAlive - использовать keep-alive,
   * keepAliveInitialDelay - начальное время ожидания закрытия неиспользуемого соединения
   */
  constructor() {
    this._pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Gfhjkm360',
      database: 'reviewer',
      waitForConnections: true,
      connectionLimit: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      decimalNumbers: true,
    });
  }

  /**
   * Выполняет запрос к базе данных
   *
   * @param query - SQL- запрос
   * @returns - результат запроса
   */
  public async query(query: string, params: any[] = []): Promise<any> {
    const [result] = await this._pool.query(query, params);

    return result;
  }

  /**
   * Закрывает соединение с базой данных
   */
  public close(): void {
    this._pool.end();
  }

  /**
   * Возвращает пул соединений
   *
   * @returns - пул соединений
   */
  get pool(): Pool {
    return this._pool;
  }
}

export default Database;
