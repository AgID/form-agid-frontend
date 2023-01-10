export class Pagination {
  constructor(obj?: Partial<Pagination>) {
    this.currentPage = obj?.currentPage || 1;
    this.elementsForPage = obj?.elementsForPage || 10;
    this.fullTextSearch = obj?.fullTextSearch || '';
  }

  currentPage: number;
  elementsForPage: number;
  fullTextSearch: string;
}
