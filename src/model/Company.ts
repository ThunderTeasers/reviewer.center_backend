/**
 * Модель компании
 * ================
 *
 * @author Max Erokhin
 */

class Company {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _link: string;
  private readonly _logo: string;
  private readonly _categoryId: number;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  /**
   * @constructor
   *
   * @param id Идентификатор компании
   * @param title Название категории
   * @param description Описание компании
   * @param link Ссылка на компанию
   * @param logo Логотип компании
   * @param categoryId Идентификатор категории
   * @param createdAt Дата создания компании
   * @param updatedAt Дата обновления компании
   */
  constructor(
    id: number,
    title: string,
    description: string,
    link: string,
    logo: string,
    categoryId: number,
    createdAt: string,
    updatedAt: string
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._link = link;
    this._logo = logo;
    this._categoryId = categoryId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  /**
   * @returns {number} Идентификатор компании
   * @readonly
   */
  public get id(): number {
    return this._id;
  }

  /**
   * @returns {string} Название компании
   * @readonly
   */
  public get title(): string {
    return this._title;
  }

  /**
   * @returns {string} Описание компании
   * @readonly
   */
  public get description(): string {
    return this._description;
  }

  /**
   * @returns {string} Ссылка на компанию
   * @readonly
   */
  public get link(): string {
    return this._link;
  }

  /**
   * @returns {string} Логотип компании
   * @readonly
   */
  public get logo(): string {
    return this._logo;
  }

  /**
   * @returns {number} Идентификатор категории
   * @readonly
   */
  public get categoryId(): number {
    return this._categoryId;
  }

  /**
   * @returns {string} Дата создания компании
   * @readonly
   */
  public get createdAt(): string {
    return this._createdAt;
  }

  /**
   * @returns {string} Дата обновления компании
   * @readonly
   */
  public get updatedAt(): string {
    return this._updatedAt;
  }
}

export default Company;
