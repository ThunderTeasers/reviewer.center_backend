/**
 * Модель категории
 * ================
 *
 * @author Max Erokhin
 */

class Category {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  /**
   * @constructor
   *
   * @param id Идентификатор категории
   * @param title Название категории
   * @param createdAt Дата создания категории
   * @param updatedAt Дата обновления категории
   */
  constructor(id: number, title: string, createdAt: string, updatedAt: string) {
    this._id = id;
    this._title = title;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  /**
   * @returns {number} Идентификатор категории
   * @readonly
   */
  public get id(): number {
    return this._id;
  }

  /**
   * @returns {string} Название категории
   * @readonly
   */
  public get title(): string {
    return this._title;
  }

  /**
   * @returns {string} Дата создания категории
   * @readonly
   */
  public get createdAt(): string {
    return this._createdAt;
  }

  /**
   * @returns {string} Дата обновления категории
   * @readonly
   */

  public get updatedAt(): string {
    return this._updatedAt;
  }
}

export default Category;
