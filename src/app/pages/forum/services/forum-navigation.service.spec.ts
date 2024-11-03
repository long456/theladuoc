import { TestBed } from '@angular/core/testing';

import { ForumNavigationService } from './forum-navigation.service';

describe('ForumNavigationService', () => {
  let service: ForumNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
