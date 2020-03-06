import { TestBed } from '@angular/core/testing';

import { OnboardingService } from './onboarding.service';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OnboardingService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, IonicStorageModule.forRoot()],
    }));

    it('should be created', () => {
        const service: OnboardingService = TestBed.get(OnboardingService);
        expect(service).toBeTruthy();
    });
});
