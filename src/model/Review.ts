/**
 * Модель рейтинга
 * ================
 *
 * @author Max Erokhin
 */

class Review {
  public id: number;
  public rating: number;
  public message: string;
  public advantages: string;
  public disadvantages: string;
  public companyId: number;
  public userId: number;
  public createdAt: string;
  public updatedAt: string;

  /**
   * @constructor
   *
   * @param id Идентификатор
   * @param rating Рейтинг
   * @param message Текст
   * @param advantages Плюсы
   * @param disadvantages Минусы
   * @param companyId Идентификатор компании
   * @param userId Идентификатор пользователя
   * @param createdAt Дата создания
   * @param updatedAt Дата обновления
   */
  constructor(
    id: number = 0,
    rating: number = 1,
    message: string = '',
    advantages: string = '',
    disadvantages: string = '',
    companyId: number = 0,
    userId: number = 0,
    createdAt: string = '',
    updatedAt: string = ''
  ) {
    this.id = id;
    this.rating = rating;
    this.message = message;
    this.advantages = advantages;
    this.disadvantages = disadvantages;
    this.companyId = companyId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Review;
