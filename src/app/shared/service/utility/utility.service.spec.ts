import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { UtilityService } from './utility.service';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { LoaderService } from '../busy-loader/api/loader.service';

describe('UtilityService', () => {
    let utilityService: UtilityService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
    let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
    let dialogSpy: jasmine.SpyObj<MatDialog>;

    beforeEach(() => {
        const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
        const loaderServiceSpyObj = jasmine.createSpyObj('LoaderService', ['showLoader']);
        const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);

        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            providers: [
                UtilityService,
                { provide: MatSnackBar, useValue: snackBarSpyObj },
                { provide: LoaderService, useValue: loaderServiceSpyObj },
                { provide: MatDialog, useValue: dialogSpyObj }
            ]
        });

        utilityService = TestBed.inject(UtilityService);
        snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
        loaderServiceSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
        dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    });

    it('should be created', () => {
        expect(utilityService).toBeTruthy();
    });

    it('should show loader', () => {
        utilityService.showLoader(true);
        expect(loaderServiceSpy.showLoader).toHaveBeenCalledWith(true);
    });

    it('should show error alert', () => {
        const message = 'Test error message';
        utilityService.showErrorAlert(message);
        expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['alert', 'alert-danger']
        });
    });

   // Similar tests for showSuccessAlert, showInfoAlert, and showWarnAlert

    it('should show confirmation dialog with default options', () => {
        const dialogRefMock = {
            afterClosed: () => of(true) as Observable<boolean>
        } as MatDialogRef<ConfirmationComponent, boolean>;
        dialogSpy.open.and.returnValue(dialogRefMock);

        const dialogRef = utilityService.showConfirmation();

        expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationComponent, {
            data: {
                title: 'Are you sure you want to delete',
                content: ''
            },
            width: '30%'
        });

    });

    it('should show confirmation dialog with provided options', () => {
        const customOptions = {
            data: {
                title: 'Custom Title',
                content: 'Custom Content'
            },
            width: '50%'
        };
        const dialogRefMock = {
            afterClosed: () => of(false) as Observable<boolean>
        } as MatDialogRef<ConfirmationComponent, boolean>;
        dialogSpy.open.and.returnValue(dialogRefMock);

        const dialogRef = utilityService.showConfirmation(customOptions);

        expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationComponent, customOptions);

    });
});
