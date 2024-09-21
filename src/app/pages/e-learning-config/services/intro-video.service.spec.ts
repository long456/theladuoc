import { TestBed } from '@angular/core/testing';

import { IntroVideoService } from './intro-video.service';

describe('IntroVideoService', () => {
  let service: IntroVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntroVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
