import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
    let loaderService: LoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoaderService]
        });
        loaderService = TestBed.inject(LoaderService);
    });

    it('should be created', () => {
        expect(loaderService).toBeTruthy();
    });

    it('should initially have isLoading as 0', () => {
        expect(loaderService['isLoading']).toBe(0);
    });

    it('should show and hide loader', fakeAsync(() => {
        loaderService.showLoader(true);
        tick();
        expect(loaderService.isLoaderBusy()).toBe(true);

        loaderService.showLoader(false);
        tick(); // Move the clock forward to simulate the timeout
        expect(loaderService.isLoaderBusy()).toBe(false);
    }));

    it('should not go below 0 when hiding loader more times than shown', fakeAsync(() => {
        loaderService.showLoader(true);
        tick();
        expect(loaderService.isLoaderBusy()).toBe(true);

        loaderService.showLoader(false);
        tick();
        expect(loaderService.isLoaderBusy()).toBe(false);

        loaderService.showLoader(false);
        tick();
        expect(loaderService.isLoaderBusy()).toBe(false); // Should stay at 0
    }));

    it('should clear loader', fakeAsync(() => {
        loaderService.showLoader(true);
        tick();
        expect(loaderService.isLoaderBusy()).toBe(true);

        loaderService.clearLoader();
        tick();
        expect(loaderService.isLoaderBusy()).toBe(false);
    }));

    it('should return false when loader is not busy', () => {
        expect(loaderService.isLoaderBusy()).toBe(false);
    });

    it('should return true when loader is busy', fakeAsync(() => {
        loaderService.showLoader(true);
        tick();
        expect(loaderService.isLoaderBusy()).toBe(true);
    }));
});
