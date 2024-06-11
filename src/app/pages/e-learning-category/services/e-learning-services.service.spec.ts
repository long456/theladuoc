import { TestBed } from '@angular/core/testing';

import { ELearningServicesService } from './e-learning-services.service';

describe('ELearningServicesService', () => {
  let service: ELearningServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ELearningServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
