import { TestBed } from '@angular/core/testing';

import { FilterModalService } from './filter-modal.service';

describe('FilterModalService', () => {
  let service: FilterModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
