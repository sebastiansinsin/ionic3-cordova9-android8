import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { User } from '../interface/user';

describe('LoginService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let loginService: LoginService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LoginService
            ]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        loginService = new LoginService(httpClient);
    });

    it('should be created', () => {
        const service: LoginService = TestBed.get(LoginService);
        expect(service).toBeTruthy();
    });

    describe('#postLogin', () => {
        const mockResponse: User = {
            id: "xs9a723343",
            userId: "328409234",
            company: {
                company_id: '32423423',
                company_name: 'mockcompany'
            },
            user: {
                name: 'adajsdaklsda'
            },
            user_module_role: 'mockRole',
            ttl: 2423,
            language: {
                lang: 'mockLang'
            },
            created: '303434',
            subscription: {
                start_date: '209093',
                end_date: '23443'
            },
            package: {
                package_name: 'mocPackaage'
            }
        };
        const mockLoginData = {
            email: 'test@gmail.com',
            pass: '123456'
        };
        it('can test for has user data', () => {
            loginService.postLogin(mockLoginData).subscribe(
                res => {
                    expect(res).toEqual(mockResponse);
                }
            );
            const request = httpTestingController.expectOne(`${loginService.paywallUrl}users/login`);
            expect(request.request.method).toBe('POST');
            request.flush(mockResponse);
            httpTestingController.verify();
        });
        it('can test for 404 error', () => {
            const emsg = 'deliberate 404 error';
            loginService.postLogin(mockLoginData).subscribe(
                data => fail('should have failed with the 404 error'),
                (error: HttpErrorResponse) => {
                    expect(error.status).toEqual(404, 'status');
                    expect(error.error).toEqual(emsg, 'message');
                }
            );

            const req = httpTestingController.expectOne(`${loginService.paywallUrl}users/login`);

            // Respond with mock error
            req.flush(emsg, { status: 404, statusText: 'Not Found' });
        });
        it('can test for network error', () => {
            const emsg = 'simulated network error';

            loginService.postLogin(mockLoginData).subscribe(
                data => fail('should have failed with the network error'),
                (error: HttpErrorResponse) => {
                    expect(error.error.message).toEqual(emsg, 'message');
                }
            );

            const req = httpTestingController.expectOne(`${loginService.paywallUrl}users/login`);

            // Create mock ErrorEvent, raised when something goes wrong at the network level.
            // Connection timeout, DNS error, offline, etc
            const mockError = new ErrorEvent('Network error', {
                message: emsg,
            });

            // Respond with mock error
            req.error(mockError);
        });
    });

});
