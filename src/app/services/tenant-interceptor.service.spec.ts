import { TestBed } from '@angular/core/testing';

import { TenantInterceptorService } from './tenant-interceptor.service';

describe('TenantInterceptorService', () => {
  let service: TenantInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
