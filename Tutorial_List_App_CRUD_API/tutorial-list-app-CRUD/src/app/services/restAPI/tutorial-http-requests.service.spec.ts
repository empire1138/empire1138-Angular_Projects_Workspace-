import { TestBed } from '@angular/core/testing';

import { TutorialHttpRequestsService } from './tutorial-http-requests.service';

describe('TutorialHttpRequestsService', () => {
  let service: TutorialHttpRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialHttpRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
