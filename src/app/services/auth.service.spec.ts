import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Storage, IonicStorageModule } from '@ionic/storage';
// import { StorageIonicMock } from '../mocks/storage';

describe('AuthService', () => {
    // const storageIonicMock = new StorageIonicMock();
    beforeEach(() => TestBed.configureTestingModule({
        imports: [IonicStorageModule.forRoot()],
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
