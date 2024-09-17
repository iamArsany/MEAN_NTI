import { Model, Query } from 'mongoose';
import { PaginationQuery, querystring } from '../interfaces/Features';

class Features<T> {
  private query: Query<T[], T>;
  public DocsNum: number;
  public paginationResult: PaginationQuery = {};

  constructor(private model: Model<T>, private queryString: querystring) {
    this.query = this.model.find();
    this.DocsNum = 0; // Will be set later
  }

  // Fetch total documents number asynchronously for pagination
  async calculateDocsNum(): Promise<this> {
    this.DocsNum = await this.model.countDocuments();
    return this;
  }

  search<K extends keyof T>(searchWord: string, fields: K[]): this {
    if (searchWord) {
      const searchRegex = new RegExp(searchWord, 'i');
      const searchCriteria = fields.map((field) => ({
        [field]: { $regex: searchRegex },
      }));

      this.query = this.query.find({
        $or: searchCriteria,
      });
    }
    return this;
  }

  sort(sortString: string): this {
    if (sortString) {
      try {
        const sortObject: { [key: string]: 1 | -1 } = {};
        if (sortString.startsWith('-')) {
          sortObject[sortString.substring(1)] = -1; // Descending order
        } else {
          sortObject[sortString] = 1; // Ascending order
        }

        this.query = this.query.sort(sortObject);
      } catch (error) {
        console.error('Error in sort method:', error);
      }
    }
    return this;
  }

  limitFields(limitString: string): this {
    if (limitString) {
      const fields=limitString.split(',').join(' ')
      this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // Exclude fields like `__v` by default
    }
    return this;
  }

  async paginate(): Promise<this> {
    const page: number = this.queryString.page || 1;
    const limit: number = this.queryString.limit || 5;
    const skip: number = (page - 1) * limit;

    // Calculate total docs asynchronously
    await this.calculateDocsNum(); // Make sure total number of documents is fetched

    const endIndex: number = page * limit;
    const pagination: PaginationQuery = {};

    pagination.currentPage = Number(page);
    pagination.limit = Number(limit);
    pagination.totalPages = Math.ceil(this.DocsNum / limit);

    if (endIndex < this.DocsNum) {
      pagination.next = Number(page) + 1;
    }
    if (skip > 0) {
      pagination.prev = Number(page) - 1;
    }

    this.query = this.query.skip(skip).limit(limit);
    this.paginationResult = pagination;

    return this;
  }

  async execute(): Promise<T[]> {
    return await this.query.exec();
  }
}

export default Features;
