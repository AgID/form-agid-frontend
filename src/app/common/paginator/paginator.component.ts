import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input()
  public selectedPage: number;

  @Output()
  public selectedPageChange: EventEmitter<number> = new EventEmitter();

  @Input()
  public elementsForPage: number;

  @Input()
  public totalElements: number;

  @Input()
  public ariaLabel: string;

  public _pagingArray: Array<any> = [];
  public lastPageIndex: number;

  ngOnInit() {
    if (
      typeof this.selectedPage !== 'number' ||
      typeof this.totalElements !== 'number' ||
      typeof this.elementsForPage !== 'number'
    ) {
      throw new Error(
        'Il "paginator-component" necessita dei seguenti parametri per funzionare correttamente: selectedPage (number), totalElements (number) e elementsForPage (number)'
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['totalElements']) {
      this.calculatePages();
    }

    if (changes && changes['elementsForPage']) {
      this.calculatePages();
    }
  }

  public changePage(nextPage: number) {
    this.selectedPage = nextPage;
    this.selectedPageChange.emit(nextPage);
  }

  public isPageButtonVisible(index: number) {
    // Mostro la pagina corrente
    if (index + 1 === this.selectedPage) {
      return true;
    }

    // Massimo 1 pagina a destra / sinistra dalla pagina corrente
    if (Math.abs(this.selectedPage - index - 1) < 2) {
      return true;
    }

    return false;
  }

  private calculatePages() {
    this.lastPageIndex = Math.ceil(this.totalElements / this.elementsForPage);

    this._pagingArray = new Array(this.lastPageIndex);
  }
}
