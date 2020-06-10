import { TestBed } from '@angular/core/testing';

import { HistoryTransactionService } from './history-transaction.service';

describe('HistoryTransactionService', () => {
  let service: HistoryTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
