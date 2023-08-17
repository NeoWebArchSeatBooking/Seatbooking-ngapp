import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert.model';

describe('AlertService', () => {
    let alertService: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AlertService]
        });
        alertService = TestBed.inject(AlertService);
    });

    it('should be created', () => {
        expect(alertService).toBeTruthy();
    });

    it('should send success alert', () => {
        const message = 'Test success message';
        const options = { customOption: 'test' };

        alertService.success(message, options);

        alertService.onAlert().subscribe(alert => {
            expect(alert.message).toBe(message);
            expect(alert.type).toBe(AlertType.Success);
            expect(alert.keepAfterRouteChange).toBe(true);
        });
    });

    it('should send error alert', () => {
        const message = 'Test error message';

        alertService.error(message);

        alertService.onAlert().subscribe(alert => {
            expect(alert.message).toBe(message);
            expect(alert.type).toBe(AlertType.Error);
        });
    });

    // Write similar tests for 'info' and 'warn' methods

    it('should clear alerts', () => {
        alertService.clear();

        alertService.onAlert().subscribe(alert => {
            expect(alert).toBeUndefined();
        });
    });
});
