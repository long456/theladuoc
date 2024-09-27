import { TestBed } from '@angular/core/testing';

import { ForumConfigService } from './forum-config.service';

describe('ForumConfigService', () => {
  let service: ForumConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
