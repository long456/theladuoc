import { TestBed } from '@angular/core/testing';

import { ELearningConfigService } from './config.service';

describe('ELearningConfigService', () => {
  let service: ELearningConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ELearningConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
