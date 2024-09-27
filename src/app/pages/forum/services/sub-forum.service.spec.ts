import { TestBed } from '@angular/core/testing';

import { SubForumService } from './sub-forum.service';

describe('SubForumService', () => {
  let service: SubForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
