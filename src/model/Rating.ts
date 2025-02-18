/**
 * Модель рейтинга
 * ================
 *
 * @author Max Erokhin
 */

class Rating {
  public id: number;
  public rating: number;
  public companyId: number;
  public userId: number;
  public createdAt: string;
  public updatedAt: string;

  /**
   * @constructor
   *
   * @param id Идентификатор
   * @param rating Рейтинг
   * @param companyId Идентификатор компании
   * @param userId Идентификатор пользователя
   * @param createdAt Дата создания
   * @param updatedAt Дата обновления
   */
  constructor(
    id: number = 0,
    rating: number = 1,
    companyId: number = 0,
    userId: number = 0,
    createdAt: string = '',
    updatedAt: string = ''
  ) {
    this.id = id;
    this.rating = rating;
    this.companyId = companyId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Rating;
